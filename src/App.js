import React, { Component } from 'react';
import KeypadButton from './components/keypad/button';
import Display from './components/display';
import './App.css';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = [
  {
    'label': '+',
    'math': '+',
  },
  {
    'label': '-',
    'math': '-',
  },
  { 
    'label': '÷',
    'math': '/'
  },
  {
    'label': '×', 
    'math': '*'
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      // state of numbers & characters as they are being typed
      input: [],
      // When an operator (+, -, /, *) has been 
      // entered disable the onClick() until a number has been entered

      operatorJustUsed: false, 
      totalled: false
    }
  }

  /**
   * 
   * @param { string } numeral 
   * '0-9 + .' numeral is added to the 
   * state.input array
   * 
   * @param { string } outputString 
   * convert enteredNumber to string and remove ','
   * 
   * */

  handleNumberInput = numeral => {
    this.setState({
      // add numeral to the input array
      input: [...this.state.input, numeral],
      operatorJustUsed: false
    })

    // When there is a total figure and you want to start 
    // adding new numbers that will overide the total
    if (this.state.totalled) {
      this.setState({
        input: [numeral],
        totalled: false
      })
    }
  }

  /**
   * 
   * @param { string } operator 
   * '+,-,/,*' operator is added to the state.input array
   * 
   * */

  handleOperatorInput = operator => {
    this.setState({
      input: this.state.input + operator,
      operatorJustUsed: true,
      totalled: false
    });
  }

  getTotal = () => {

    // Convert input array to a string, then remove the ',' 
    // to display as a complete numeral.
    // We don't convert the array to a number because there 
    // are mixed types (ie: 2,3 with /, *)

    let filter = this.state.input.toString().replace(/,/g, '');

    // Because the above filter will render a string of numbers 
    // plus operators (eg: '54+2/7'), we use the Function method
    // to return the string as if it was a javascript value (eg: 54+2/7).
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function

    let sum = Function(`return ${filter}`);
    // function sum(string) {
    //   const strip = string.replace(/'/g, '');
    //   console.log('strip: ', strip);
    //   return strip;
    // };

    // console.log('returned sum: ', sum(filter));

    this.setState({
      input: [sum().toString()],
      totalled: true,
      operatorJustUsed: false
    })
    console.log(this.state.input);
  }
  

  clear = () => {
    this.setState({
      input: [],
    })
  }

  handleNullClick = () => { return };

  componentDidUpdate() {
    console.log('this.state.input: ', this.state.input);
  }

  render() {
    const displayedInput = this.state.input.toString().replace(/,/g, '');
    return (
      <div className="App">
        <header className="App-header">
          <div className='app__wrapper'>
            {/* Calculator */}
            <Display value={displayedInput} />
            <div className='keypad'>
              <div className='keypad__numbers'>
                {
                  numbers.map((num) => (
                    <KeypadButton
                      buttonType='numbers'
                      id={num} key={num}
                      label={num}
                      onClick={() => this.handleNumberInput(num)} />
                  ))
                }
                <KeypadButton
                  buttonType='decimal'
                  id='.' key='.'
                  label='.'
                  onClick={() => this.handleNumberInput('.')} />

                <KeypadButton
                  buttonType='sum'
                  id='=' key='='
                  label='='
                  onClick={() => this.getTotal()} />
              </div>
              <div className='keypad__operators'>
                {
                  operators.map((op) => (
                    <KeypadButton
                      buttonType='operators'
                      id={op.label} key={op.label}
                      label={op.label}
                      onClick={() => this.state.operatorJustUsed ? this.handleNullClick() : this.handleOperatorInput(op.math)} />
                  ))
                }
                <KeypadButton
                  buttonType='operators'
                  id='C' key='C'
                  label='C'
                  onClick={() => this.clear()} />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}


export default App;
