import React from 'react';
import PropTypes from 'prop-types';

const Steps = props => {
  const content = props.value.map((item, index) => {
    let status = '';
    if (index < props.activeIndex) status = 'prev';
    if (index === props.activeIndex) status = 'active';

    return (
      <div className={`step ${status}`} key={item.step}>
        <div className="step-num">{item.step}</div>
        <div className="step-label">{item.label}</div>
      </div>
    );
  });
  return (
    <div className="steps">
      {content}
    </div>
  );
};

Steps.propTypes = {
  value: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired
};

export default Steps;
