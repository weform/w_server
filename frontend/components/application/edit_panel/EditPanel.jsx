import React from 'react'
import EditField from './EditField'

const EditPanel = props => {
  return (
    <div className="edit-panel">
      <EditField {...props} />
    </div>
  )
}

export default EditPanel
