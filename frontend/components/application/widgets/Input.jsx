import React from 'react'
import { objRelation } from 'utils/tool'

const Input = ({ name, value, belongto, toUpdate }) => {
  const onChange = val => {
    toUpdate(objRelation(belongto, name).comb({ $set: val }))
  }

  return (
    <div className="widget widget--input">
      <input onChange={e => onChange(e.target.value)} value={value} />
    </div>
  )
}

export default Input
