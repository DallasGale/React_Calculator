import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

/* 
  KeypadButton Component
  @param {number} id
  @param {string} label
  @param {string} name
  @param {func} onClick
  @returns button element
 */

const KeypadButton = ({buttonType, id, label, name, onClick }) => (
    <div key={id} className={`keypad__button-wrapper  keypad__button-wrapper--${buttonType}`}>
        <input 
            type='button'
            className={`keypad__button keypad__button--${buttonType}`}
            onClick={ onClick }
            key={ id }
            id={ id }
            name={ name }
            value={ label } />
    </div>
);


KeypadButton.propTypes = {
    // id: PropTypes.string,
    // label: PropTypes.number,
    // name: PropTypes.string,
    // onClick: PropTypes.func
}

export default KeypadButton;

