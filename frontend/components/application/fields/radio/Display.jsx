import React from 'react'
import wrapper from '../wrapper'

const Display = ({ data }) => {
  const { title, description, value, options } = data

  return (
    <div className="field field--radio">
      <h4 className="field__title">{title}</h4>
      <div className="field__description">{description}</div>
      <div className="field__radio-wrap">
        {
          options.map((item, index) => (
            <div className="field__radio-item" key={index}>
              <input name="radio" type="radio" value={item} defaultChecked={value === item} />
              <label className="field__radio-label" name="radio">{item}</label>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default wrapper(Display)
