import React from 'react'
import PropTypes from 'prop-types'

import Cropper from 'react-cropper'
import { observer, inject } from 'mobx-react'
import Dialog from 'react-toolbox/lib/dialog'
import { Button } from 'react-toolbox/lib/button'

import { Row, Col } from 'react-flexbox-grid'

@inject('croper') @observer
class AvatarCrop extends React.Component {
  toggleHandle = () => {
    this.props.croper.show = !this.props.croper.show
  }

  saveHandle = () => {
    if (this.props.crop) this.props.crop(this.cropper.getCroppedCanvas().toDataURL())
  }

  render () {
    return (
      <Dialog
        className="crop-modal"
        active={this.props.croper.show}
        onEscKeyDown={this.toggleHandle}
        onOverlayClick={this.toggleHandle}
      >
        <Cropper
          ref={cropper => { this.cropper = cropper }}
          src={this.props.croper.src}
          style={{ maxHeight: 300 }}
          aspectRatio={1}
          viewMode={1}
          guides
          autoCropArea={1}
        />
        <Row center="md">
          <Col className="crop-modal__operate">
            <Button raised onClick={this.toggleHandle}>取消</Button>
            <Button raised primary onClick={this.saveHandle}>确认</Button>
          </Col>
        </Row>
      </Dialog>
    )
  }
}

AvatarCrop.propTypes = {
  croper: PropTypes.object,
  crop: PropTypes.func.isRequired
}

export default AvatarCrop
