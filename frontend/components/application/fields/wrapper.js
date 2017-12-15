import React from 'react'

const wrapper = Component => {
  const Wrapper = ({ index, activeFiledIndex, toActiveFiled, toUpdate, ...other }) => {
    const onMouseDown = e => {
      e.preventDefault()
      e.stopPropagation()
      toActiveFiled(index)
    }

    const onDelete = () => {
      if (confirm('确认删除？')) {
        toUpdate({$splice: [[[activeFiledIndex], 1]]})
        toActiveFiled(null)
      }
    }

    const isActive = activeFiledIndex === index

    return (
      <div className={`field-wrapper ${isActive ? 'is-active' : ''}`}>
        <Component {...other} />
        <div className="field-wrapper__mask" onMouseDown={e => onMouseDown(e)} />
        <a className="field-wrapper__delete" onClick={onDelete}>删除</a>
      </div>
    )
  }

  Wrapper.displayName = `FieldWrapper(${Component.name})`
  return Wrapper
}

export default wrapper
