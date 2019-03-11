/* eslint-disable no-unused-expressions */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import { add, addOperator, clear, divide, handleKeypadNumerical, multiply, setNumber, subtract } from './functions';
import KeypadButton from './components/keypad/button/';
import Display from './components/display';
import App from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});


//////////////////////////////
// What needs to be tested: //
//////////////////////////////

// # + multiple times while adding to the total (done)
// # * multiple times while adding to the total (done)
// # - multiple times while adding to the total (done)
// # / multiple times while adding to the total (done)
// # Combine + and - (done)
// # Combing + and * (done)
// # Combine + and / (done)
// # Combine - and * (done)
// # Combine - and / (done)
// # Combine / and * (done)
// # Combine + and - and / and * (done)
// # Keypad onClick (done)
// # Keypad button click event
// # Reset/Clear  (done)
// # Round up to 2 decimal places
// # Render keypad control button labels (+, /, -, *, =, C)

//////////////////////////////

describe('Calculator methods', () => {
    test('clear calculator back to 0', () => {
        expect(clear()).toEqual(0);
        expect(clear()).not.toEqual(22)
    }),
        test('set initial number to anything (15)', () => {
            expect(setNumber(15)).toEqual(15);
        })

    test('Addition: 0 + 22', () => {
        expect(clear()).toEqual(0);
        expect(add(22)).toEqual(22);
    }),

        test('Addition: + multiple times while adding to the total', () => {
            expect(clear()).toEqual(0);
            expect(add(22)).toEqual(22);
            expect(add(3)).toEqual(25);
            expect(add(567)).toEqual(592);
        }),

        test('Division: Divide 10 / 2', () => {
            expect(setNumber(10)).toEqual(10);
            expect(divide(2)).toEqual(5);
        }),

        test('Division: / multiple times while adding to the total', () => {
            expect(setNumber(20)).toEqual(20);
            expect(divide(2)).toEqual(10);
            expect(divide(5)).toEqual(2);
        }),

        test('Multiplication: 10 * 4', () => {
            expect(setNumber(10)).toEqual(10);
            expect(multiply(4)).toEqual(40);
        }),

        test('Multiplication: * multiple times while adding to the total', () => {
            expect(setNumber(10)).toEqual(10);
            expect(multiply(4)).toEqual(40);
            expect(multiply(3)).toEqual(120);
        }),

        test('Subtraction: 54 - 110', () => {
            expect(setNumber(110)).toEqual(110);
            expect(subtract(54)).toEqual(56);
        }),

        test('Subtraction: - multiple times while adding to the total', () => {
            expect(setNumber(110)).toEqual(110);
            expect(subtract(54)).toEqual(56);
            expect(subtract(22)).toEqual(34);
        })
})

describe('Method combinations', () => {
    test('Combine addition & subtraction', () => {
        expect(setNumber(20)).toEqual(20);
        expect(add(45)).toEqual(65);
        expect(subtract(13)).toEqual(52);
    }),

        test('Combine addition & multiplication', () => {
            expect(setNumber(20)).toEqual(20);
            expect(add(45)).toEqual(65);
            expect(multiply(2)).toEqual(130);
        }),

        test('Combine addition & division', () => {
            expect(setNumber(20)).toEqual(20);
            expect(add(45)).toEqual(65);
            expect(divide(2)).toEqual(32.5);
        }),

        test('Combine subtraction & multiplication', () => {
            expect(setNumber(20)).toEqual(20);
            expect(subtract(45)).toEqual(-25);
            expect(multiply(2)).toEqual(-50);
        }),

        test('Combine subtraction & divide', () => {
            expect(setNumber(20)).toEqual(20);
            expect(subtract(45)).toEqual(-25);
            expect(divide(2)).toEqual(-12.5);
        }),

        test('Combine division & multiplication', () => {
            expect(setNumber(20)).toEqual(20);
            expect(divide(10)).toEqual(2);
            expect(multiply(10)).toEqual(20);
        }),

        test('Combine addition, subtraction, division & multiplication', () => {
            expect(clear()).toEqual(0);
            expect(add(1000)).toEqual(1000);
            expect(subtract(900)).toEqual(100);
            expect(divide(2)).toEqual(50);
            expect(multiply(8)).toEqual(400);
        })
})


describe('Keypad button', () => {

    it('should be defined', () => {
        expect(KeypadButton).toBeDefined();
    });

    it('should render correctly', () => {
        const tree = render(
            <KeypadButton
                id={0}
                key={0}
                label='C'
                name='clear'
                onClick={handleKeypadNumerical()} />
        );
        expect(tree).toMatchSnapshot();
    });
})

describe('Calculator display', () => {

    it('should render correctly', () => {
        let state = '0';
        const tree = render(
            <Display value={parseInt(state, 10)} />
        );
        expect(tree).toMatchSnapshot();
    });

    it('should display 0 at start', () => {
        let state = '0';
        const component = shallow(<Display value={parseInt(state, 10)} />)
        expect(component.text()).toEqual(state);
    });


    ///////////////////
    // initial state //
    ///////////////////
    const app = shallow(<App />);
    app.setState({
        displayNumber: '',
        displayNumberCopy: '',
        calculation: ''
    });
    let concatonatedState = app.state().displayNumber;
    let calculation = 0; // this is the variable that will return total (eg. 32+54+3-6/32);
    
    const DisplayComponent = shallow(
        <Display value={
            app.state.displayNumber
        } />
    )
    expect(DisplayComponent.text()).toEqual('');


    it('should concat a string of numbers', () => {
        expect(handleKeypadNumerical('8', concatonatedState)).toEqual('8');
        concatonatedState += '8';
        app.setState({ displayNumber: concatonatedState });
        expect(app.state().displayNumber).toEqual('8');

        expect(handleKeypadNumerical('4', concatonatedState)).toEqual('84');
        concatonatedState += '4'
        app.setState({ displayNumber: concatonatedState });
        expect(app.state().displayNumber).toEqual('84');

        expect(handleKeypadNumerical('9', concatonatedState)).toEqual('849');
        concatonatedState += '9'
        app.setState({ displayNumber: concatonatedState });
        expect(app.state().displayNumber).toEqual('849');
    });

    it('save concatonated state to a new variable', () => {
        calculation = + app.state().displayNumber;
        expect(calculation).toEqual(849);
    });

    it('assign an operator to the concatonated string', () => {
        expect(addOperator()).toEqual('+'); 
        app.setState({ displayNumber: app.state().displayNumber + '+' });
        expect(app.state().displayNumber).toEqual('849+');
    });

    it('should not be able to add concecutive operators', () => {
        // convert to string to array
        let arrayed = app.state().displayNumber.split('');
        expect(arrayed).toEqual(['8', '4', '9', '+']);
        let numberAfterOperator = false

        if ( arrayed.lastOfIndex('+') || arrayed.lastOfIndex('-') || arrayed.lastOfIndex('*') || arrayed.lastOfIndex('/') || arrayed.lastOfIndex('=')) {
            numberAfterOperator = true;
        }

        

        app.setState({ displayNumber: app.state().displayNumber + '*' });
        expect(app.state().displayNumber).toEqual('849+*');


    });

    it('clear concatonated state', () => {
        app.setState({ displayNumber: '' });
        expect(app.state().displayNumber).toEqual('');
        concatonatedState = '';
    });

    it('\'add\' new state to saved state', () => {

    });

    it('return total', () => {

    });


    it('clear original state; concat new state; \'add\' new state to saved state; return total', () => {

        ///////////////////
        // initial state //
        ///////////////////
        // const app = shallow(<App />);
        // app.setState({
        //     displayNumber: '',
        //     displayNumberCopy: '',
        //     calculation: ''
        // });

        ////////////////////////
        // concatonated state //
        ////////////////////////
        // let concatonatedState = app.state().displayNumber;
        // let calculation = 0; // this is the variable that will return total (eg. 32+54+3-6/32);

        /////////////////////////////////////
        // view component that shows state //
        /////////////////////////////////////
        // const DisplayComponent = shallow(
        //     <Display value={
        //         app.state.displayNumber
        //     } />
        // )
        // expect(DisplayComponent.text()).toEqual('');


        /////////////////////
        // UPDATE STATE... //
        /////////////////////
        // expect(handleKeypadNumerical('8', concatonatedState)).toEqual('8');
        // concatonatedState += '8';
        // app.setState({ displayNumber: concatonatedState });
        // expect(app.state().displayNumber).toEqual('8');

        // expect(handleKeypadNumerical('4', concatonatedState)).toEqual('84');
        // concatonatedState += '4'
        // app.setState({ displayNumber: concatonatedState });
        // expect(app.state().displayNumber).toEqual('84');

        // expect(handleKeypadNumerical('9', concatonatedState)).toEqual('849');
        // concatonatedState += '9'
        // app.setState({ displayNumber: concatonatedState });
        // expect(app.state().displayNumber).toEqual('849');


        /////////////////////////////////////////
        // SAVE STATE INTO 'CALCULATION' variable //
        /////////////////////////////////////////
        // app.setState({calculation: app.state().displayNumber});
        // calculation = + app.state().displayNumber;
        // expect(calculation).toEqual(849);


        ////////////////////////////////////////////////////
        // ASSIGN THE '+' OPERATOR TO 'CALCULATION' STATE //
        ////////////////////////////////////////////////////

        // expect(addOperator()).toEqual('+'); // this returns '+' to state.calculation
        // app.setState({ calculation: app.state().calculation + '+' });

        // expect(app.state().calculation).toEqual('+');
        // app.setState({calculation: app.state().calculation + '4'});
        // expect(app.state().calculation).toEqual('849+4');
        // let evalNumber = eval(app.state().calculation);
        // expect(evalNumber).toEqual(853);

        ///////////////////////////////////////////////
        // CLEAR CONCATONATED STATE //
        ///////////////////////////////////////////////
        // app.setState({ displayNumber: '' });
        // expect(app.state().displayNumber).toEqual('');
        // concatonatedState = '';


        //////////////////////
        // 'ADD' NEW NUMBER //
        //////////////////////
        // expect(handleKeypadNumerical('3', concatonatedState)).toEqual('3');
        // concatonatedState += '3';
        // app.setState({ displayNumber: concatonatedState });
        // expect(app.state().displayNumber).toEqual('3');

        // expect(handleKeypadNumerical('6', concatonatedState)).toEqual('36');
        // concatonatedState += '6'
        // app.setState({ displayNumber: concatonatedState });
        // expect(app.state().displayNumber).toEqual('36');


        /////////////////////////////////////////
        // SAVE STATE INTO 'CALCULATION' STATE //
        /////////////////////////////////////////
        // app.setState({calculation: app.state().calculation + app.state().displayNumber});
        // expect(app.state().calculation).toEqual('849+36');

        //////////////////////////////////
        // 'ADD' NEW STATE TO SAVED STATE //
        //////////////////////////////////
        // expect(handleKeypadNumerical('5', concatonatedState)).toEqual('5');
        // concatonatedState += '5';
        // app.setState({displayNumber: concatonatedState});
        // expect(app.state().displayNumber).toEqual('5');

        //////////////////////////////////
        // CONVERT 'STRING' TO 'NUMBER' //
        //////////////////////////////////
        // let rightNumber = parseInt(app.state().displayNumber, 10);
        // expect(rightNumber).toEqual(5)


        //////////////////
        // RETURN TOTAL //
        //////////////////
        // app.setState({calculation: leftNumber + rightNumber});
        // expect(app.state().calculation).toEqual(854);
    })
})