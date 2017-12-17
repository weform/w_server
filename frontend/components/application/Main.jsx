import React from 'react'
import update from 'immutability-helper'

import reduxWrapper from 'store/reduxWrapper'

import Modal from 'extensions/modal/Modal'

import Header from './shared/Header'
import WorkPanel from './work_panel/WorkPanel'
import EditPanel from './edit_panel/EditPanel'

class Main extends React.Component {
  state = {
    data: [
      {
        type: 'inline-text',
        data: {
          title: '留下你的大名吧',
          description: '请告诉我们你的大名或绰号都行',
          placeholder: '',
          value: ''
        }
      },
      {
        type: 'radio',
        data: {
          title: '你的最高学历是？',
          description: '告诉我你的最高学历, 我们只是想了解一下',
          value: '',
          options: ['高中', '大学', '硕士', '博士']
        }
      },
      {
        type: 'select',
        data: {
          title: '你来自哪里？',
          description: '',
          value: '北京',
          options: ['北京', '上海', '西安', '成都', '杭州', '天津']
        }
      },
      {
        type: 'matrix-radio',
        data: {
          title: '自我评估',
          description: '',
          value: [
            '1', '1', '0'
          ],
          labels: ['沟通技巧', '时间观念', '技能熟练'],
          options: ['较差一些', '一般了', '还不错', '这是我的强项']
        }
      }
    ],
    activeFiledIndex: null
  }

  constructor (props) {
    super(props)
    this.toActiveFiled = this.toActiveFiled.bind(this)
    console.log(this)
  }

  toActiveFiled = (index) => {
    this.setState({ activeFiledIndex: index })
  }

  toUpdate = pattern => {
    const newData = update(this.state.data, pattern)
    this.setState({ data: newData })
  }

  render () {
    const { actions, modal } = this.props

    return (
      <div>
        <Header actions={actions} />
        <Modal {...modal} closeModal={actions.closeModal} />
      </div>
    )
  }
}

export default reduxWrapper(Main)
