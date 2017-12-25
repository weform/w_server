import React from 'react'
import PropTypes from 'prop-types'

import UUID from 'uuid-js'

import { observer, inject } from 'mobx-react'
import { Row, Col } from 'react-flexbox-grid'
import Input from 'react-toolbox/lib/input'
import { Button } from 'react-toolbox/lib/button'

import { readImageFile, multipart, makeBoundary, string2ArrayBuffer } from 'utils/tool'

import ColumnTitle from '../shared/ColumnTitle'
import AvatarCrop from '../base_info/AvatarCrop'

import { successHandle } from '../util'

@inject('profiles', 'croper') @observer
class Profiles extends React.Component {
  textChange = function (name, value) { this.props.profiles.user[name] = value }

  upLoadImage = e => {
    readImageFile(e)
      .then(result => {
        this.props.croper.show = true
        this.props.croper.src = result
      })
  }

  cropHandle = base64 => {
    this.props.croper.show = false
    const boundary = makeBoundary()
    const multipartString = multipart(base64, boundary, 'user[avatar]', `avatar-${UUID.create().toString()}`)
    const arrayBuffer = string2ArrayBuffer(multipartString)

    $.ajax({
      url: '/account/profiles',
      method: 'PATCH',
      contentType: `multipart/form-data; boundary=${boundary}`,
      processData: false,
      data: arrayBuffer
    })
      .done(() => {
        this.props.profiles.fetch()
        successHandle('头像更新成功...')
      })
  }

  saveUserInfo = () => {
    const { name } = this.props.profiles.data
    $.ajax({
      url: '/settings/profile',
      method: 'PATCH',
      data: {
        'user[name]': name
      }
    })
      .done(() => {
        this.props.userinfo.fetch()
        successHandle('基本信息已更新...')
      })
  }

  render () {
    const { avatar, name } = this.props.profiles.user
    return (
      <section className="base-info">
        <Row>
          <Col md={12} xs={12}>
            <ColumnTitle title="基本信息" en="info" />
          </Col>
        </Row>
        <Row>
          <Col md={9} xs={12}>
            <div className="avatar-crop-wrapper">
              <div className="text-label">头像设置</div>
              <input ref="imageInput" type="file" onChange={this.upLoadImage} />
              <div className="avatar-wrapper" onClick={() => this.refs.imageInput.click()} >
                <div className="avatar">
                  <img src={avatar} alt={name} />
                </div>
                <div className="tip">更新头像</div>
              </div>
              <AvatarCrop crop={this.cropHandle} />
            </div>
            <Row>
              <Col md={12} xs={12}>
                <Input
                  type="text"
                  label="昵称"
                  name="name"
                  required
                  value={name || ''}
                  onChange={value => this.textChange('name', value)}
                  maxLength={15}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <br />
        <Button label="保 存" raised primary onClick={this.saveUserInfo} />
      </section>
    )
  }
}

Profiles.propTypes = {
  profiles: PropTypes.object,
  croper: PropTypes.object
}

export default Profiles
