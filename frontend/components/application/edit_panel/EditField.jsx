import React from 'react'
import { getEditInterface } from '../shared/util'

const EditField = ({ data, activeFiledIndex, toUpdate }) => {
  let editContent = null

  if (activeFiledIndex === null) {
    editContent = <div className="edit-field__nil">没有选定的字段 请添加或选择一个字段</div>
  } else {
    editContent = getEditInterface(data[activeFiledIndex], activeFiledIndex, toUpdate)
  }

  return (
    <div className="edit-field edit-panel__module">
      <div className="edit-panel__title">编辑字段</div>
      <div className="edit-field__control">
        {editContent}
      </div>
    </div>
  )
}

export default EditField
