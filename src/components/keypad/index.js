import React from 'react';
import KeypadButton from './button';
import './styles.css';
import PropTypes from 'prop-types';
/* 
  Keypad Component
  @param {number} id
  @param {string} label
  @param {string} name
  @param {func} onClick
  @returns button element
 */

const Keypad = ({ keypadNumbers, onClick }) => (
    <div className='keypad'>
        {
            keypadNumbers.map((num) => (
                <div key={num} className='keypad__button-wrapper'>
                    <KeypadButton id={num} key={num} label={num} onClick={onClick} />
                </div>
            ))
        }
      </div>
);

export default Keypad;

