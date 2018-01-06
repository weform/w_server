import React from 'react'

import inlineText from '../fields/inline_text'
import radio from '../fields/radio'
import select from '../fields/select'
import matrixRadio from '../fields/matrix_radio'

const AddField = ({ toUpdate }) => {
  const addField = type => {
    let structure
    if (type === 'inline-text') {
      structure = inlineText.structure
    }

    if (type === 'radio') {
      structure = radio.structure
    }

    if (type === 'select') {
      structure = select.structure
    }

    if (type === 'matrix-radio') {
      structure = matrixRadio.structure
    }

    toUpdate({
      $push: [{
        type,
        data: structure.defaultData
      }]
    })
  }

  return (
    <div className="add-field edit-panel__module">
      <div className="edit-panel__title">添加字段</div>
      <div className="add-field__buttons">
        <a href="javascript:;" onClick={() => addField('inline-text')}>单行文本</a>
        <a href="javascript:;" onClick={() => addField('matrix-radio')}>矩阵单选</a>
        <a href="javascript:;" onClick={() => addField('radio')}>单项选择</a>
        <a href="javascript:;" onClick={() => addField('select')}>下拉框</a>
      </div>
    </div>
  )
}

export default AddField
