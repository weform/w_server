import Alert from 'react-s-alert'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'

export const successHandle = msg => {
  if (isString(msg)) Alert.success(msg)
  if (isArray(msg)) msg.forEach(item => Alert.success(item))
}

export const errorHandle = xhr => {
  const msg = xhr.responseJSON.errors
  if (isString(msg)) Alert.error(msg)
  if (isArray(msg)) msg.forEach(item => Alert.error(item))
}
