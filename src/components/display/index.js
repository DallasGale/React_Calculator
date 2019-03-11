import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
/* 
  Display Component
  @param {number} value
  @returns button element
 */

const Display = ({ value, color }) => (
    <div className='display__wrapper'>
        <span className='display__text'>
            <span style={{color: color}}>
                { value }
            </span>
        </span>
    </div>
);

Display.propTypes = {
    // value: PropTypes.string,
}


export default Display;

