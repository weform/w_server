import React from 'react'
import wrapper from '../wrapper'

const Display = ({ data }) => {
  const { title, description, value, options } = data

  return (
    <div className="field field--select">
      <h4 className="field__title">{title}</h4>
      <div className="field__description">{description}</div>
      <select className="field__select" readOnly="readonly">
        {
          options.map((item, index) => (
            <option key={index} value={item} checked={value === item}>{item}</option>
          ))
        }
      </select>
    </div>
  )
}

export default wrapper(Display)
