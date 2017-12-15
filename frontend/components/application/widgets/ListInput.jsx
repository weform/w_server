import React from 'react'
import { objRelation } from 'utils/tool'

const ListInput = ({ name, options, belongto, toUpdate }) => {
  const onChange = (val, index) => {
    toUpdate(objRelation(belongto, name).comb({[index]: { $set: val }}))
  }

  const onAdd = () => {
    toUpdate(objRelation(belongto, name).comb({ $push: ['test'] }))
  }

  const onDelete = () => {

  }

  return (
    <div className="widget widget--list-input">
      {
        options.map((item, index) => (
          <div className="widget__input-field" key={index}>
            <input
              onChange={e => onChange(e.target.value, index)}
              value={item}
            />
          </div>
        ))
      }
      <i className="icon-add" onClick={() => onAdd()}>+</i>
    </div>
  )
}

export default ListInput
