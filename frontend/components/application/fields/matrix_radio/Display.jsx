import React from 'react'
import wrapper from '../wrapper'

const Display = ({ data }) => {
  const { title, options, labels } = data

  return (
    <div className="field field--matrix-radio">
      <h4 className="field__title">{title}</h4>
      <table className="field__table">
        <thead>
          <tr>
            <th />
            {
              options.map((item, index) => (
                <th key={index}>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            labels.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                {
                  options.map((item, index) => (
                    <td key={index}>
                      <input type="radio" />
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default wrapper(Display)
