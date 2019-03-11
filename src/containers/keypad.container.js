import React, { Component } from 'react';
import KeypadButton from '../components/keypad/button';
import PropTypes from 'prop-types';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '/', '*', '=', 'C'];

class KeypadContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className='keypad__numbers'>
                {
                    numbers.map((num) => (
                    <KeypadButton 
                        buttonType='numbers'
                        id={num} key={num} 
                        label={num} 
                        onClick={ () => this.handleKeypadNumericalInput(num)} />
                    ))
                }
                </div>
                <div className='keypad__operators'>
                    {
                        operators.map((op) => (
                        <KeypadButton 
                            buttonType='operators'
                            id={op} key={op} 
                            label={op} 
                            onClick={ onClickOperators(op) } />
                        ))
                    }
                </div>
            </React.Fragment>
        );
    }
}

KeypadContainer.propTypes = {

};

export default KeypadContainer;