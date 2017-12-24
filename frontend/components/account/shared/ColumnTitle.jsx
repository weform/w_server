import React from 'react'
import PropTypes from 'prop-types'

const ColumnTitle = props => {
  return (
    <div className="column-title">
      <div>
        <h3>{props.title}</h3>
        <span>{props.en}</span>
      </div>
      {
        props.tip ? (
          <div className="column-title__tip">
            {props.tip}
          </div>
        ) : null
      }
    </div>
  )
}

ColumnTitle.defaultProps = {
  title: '',
  en: ''
}

ColumnTitle.propTypes = {
  title: PropTypes.string,
  en: PropTypes.string,
  tip: PropTypes.string.isRequired
}

export default ColumnTitle
