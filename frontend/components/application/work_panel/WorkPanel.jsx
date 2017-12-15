import React from 'react'
import Form from './Form'

const WorkPanel = ({ ...props }) => {
  return (
    <div className="work-panel">
      <Form {...props} />
    </div>
  )
}

export default WorkPanel
