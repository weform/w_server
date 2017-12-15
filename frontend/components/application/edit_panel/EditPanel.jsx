import React from 'react'
import EditField from './EditField'
import AddField from './AddField'

const EditPanel = props => {
  return (
    <div className="edit-panel">
      <AddField {...props} />
      <EditField {...props} />
    </div>
  )
}

export default EditPanel
