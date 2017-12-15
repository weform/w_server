import React from 'react'

import inlineText from '../fields/inline_text'
import radio from '../fields/radio'
import select from '../fields/select'
import matrixRadio from '../fields/matrix_radio'

import widgets from '../widgets'

export const getEditInterface = (editData, activeFiledIndex, toUpdate) => {
  const { type, data } = editData
  let content = null
  let field = null

  if (type === 'inline-text') {
    field = inlineText
  } else if (type === 'radio') {
    field = radio
  } else if (type === 'select') {
    field = select
  } else if (type === 'matrix-radio') {
    field = matrixRadio
  }

  content = field.structure.parameters.map((item, index) => {
    let widgetContent = null

    if (item.widget === 'input') {
      widgetContent = (
        <widgets.Input
          name={item.name}
          belongto={[ activeFiledIndex, 'data' ]}
          value={data[item.name]}
          toUpdate={toUpdate}
        />
      )
    }

    if (item.widget === 'list-input') {
      widgetContent = (
        <widgets.ListInput
          name={item.name}
          belongto={[ activeFiledIndex, 'data' ]}
          options={data[item.name]}
          toUpdate={toUpdate}
        />
      )
    }

    return (
      <div className="edit-field__control-item" key={index}>
        <div className="edit-field__control-title">{item.label}</div>
        {widgetContent}
      </div>
    )
  })

  return content
}
