import React, { Component } from 'react';

class Picode extends Component {
  refreshPicture = () => {
    this.refs.picture.src = '/rucaptcha/';
  }

  render() {
    return (
      <a className="picode" href="javascript:;">
        <img ref="picture" alt="图形验证码" onClick={this.refreshPicture} className="rucaptcha-image" src="/rucaptcha/" />
      </a>
    );
  }
}


export default Picode;
