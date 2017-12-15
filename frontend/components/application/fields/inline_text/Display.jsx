import React from 'react'
import wrapper from '../wrapper'

const Display = ({ data }) => {
  const { title, description, value, placeholder } = data

  return (
    <div className="field field--inline-text">
      <h4 className="field__title">{title}</h4>
      <div className="field__description">{description}</div>
      <input className="field__text-input" placeholder={placeholder} value={value} />
    </div>
  )
}

export default wrapper(Display)
