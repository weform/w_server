import React from 'react'

import inlineText from '../fields/inline_text'
import radio from '../fields/radio'
import select from '../fields/select'
import matrixRadio from '../fields/matrix_radio'

const Form = ({ data, toActiveFiled, activeFiledIndex, toUpdate }) => {
  const formList = data.map((item, index) => {
    let Display = null

    if (item.type === 'inline-text') {
      Display = inlineText.Display
    }

    if (item.type === 'radio') {
      Display = radio.Display
    }

    if (item.type === 'select') {
      Display = select.Display
    }

    if (item.type === 'matrix-radio') {
      Display = matrixRadio.Display
    }

    if (Display === null) return null

    return (
      <Display
        data={item.data}
        key={index}
        index={index}
        activeFiledIndex={activeFiledIndex}
        toActiveFiled={toActiveFiled}
        toUpdate={toUpdate}
      />
    )
  })

  return (
    <div className="form">
      <div className="form__header">欢迎你加入金数据</div>
      <div className="form__title">个人登记表单</div>
      {formList}
      <button className="form__submit" type="submit" >提交</button>
    </div>
  )
}

export default Form
