import UUID from 'uuid-js'

/**
 *
 * @param {Array} belongto
 * @param {String} filed
 * @return {Objec}
 *
 *   Based on the relation of the object and fragment to:
 *   @method parse  parse out a fragment
 *   @method comb   combine to a whole object
 *
 */
export const objRelation = (belongto, filed) => {
  return {
    parse: data => {
      const obj = belongto.reduce((p, c) => p[c], data)

      if (typeof obj === 'undefined') return undefined
      return obj[filed]
    },
    comb: fragment => {
      const obj = {}
      const result = belongto.reduce((p, c) => { p[c] = {}; return p[c] }, obj)
      result[filed] = fragment

      return obj
    }
  }
}

/**
  *
  */
export const addUidForUrl = url => {
  const symbol = /\?/.test(url) ? '&' : '?'
  return `${url}${symbol}_=${UUID.create()}`
}

// image file to base64
export const readImageFile = event => {
  event.preventDefault()
  let files
  if (event.dataTransfer) {
    files = event.dataTransfer.files
  } else if (event.target) {
    files = event.target.files
  }

  return new Promise((resolve, reject) => {
    if (files.length <= 0) {
      reject(new Error('文件为空'))
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => {
        resolve(reader.result)
      }
    }
  })
}

export const multipart = (base64, boundary = 'customFileboundary', name, filename = 'blob') => {
  let contentType = 'image/png'
  let suffix = 'png'
  const pureBase64ImageData = base64.replace(
    /^data:(image\/.+);base64,/,
    (match, $1) => {
      contentType = $1
      suffix = $1.split('/')[1]
      return ''
    }
  )
  const binaryString = atob(pureBase64ImageData)
  return [
    `--${boundary}`,
    `Content-Disposition: form-data; name="${name}"; filename="${filename}.${suffix}"`,
    `Content-Type: ${contentType}`,
    '',
    binaryString,
    `--${boundary}--`,
    ''
  ].join('\r\n')
}

export const makeBoundary = () => {
  return `----CustomBoundary${(+new Date() * (1e16 * Math.random())).toString(36)}`
}

export const string2ArrayBuffer = string => {
  const bytes = Array.prototype.map.call(string, c => {
    return c.charCodeAt(0)
  })
  return new Uint8Array(bytes).buffer
}

// base64 to file
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])

  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

// redirect
export const redirect = url => {
  window.location.href = url
}

// init wechat login
export const initWxLogin = id => {
  return new WxLogin({
    id: id || 'wx-login-qrcode',
    appid: 'wx8c9a93acb12e2b2d',
    scope: 'snsapi_login',
    redirect_uri: `${location.origin}/auth/wechat/callback`,
    state: '',
    style: '',
    href: ''
  })
}
