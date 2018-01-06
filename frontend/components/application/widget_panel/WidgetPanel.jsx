import React from 'react'
import AddField from './AddField'

const WidgetPanel = props => {
  return (
    <div className="widget-panel">
      <AddField {...props} />
    </div>
  )
}

export default WidgetPanel
