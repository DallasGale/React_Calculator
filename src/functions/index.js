//  Initial state of calculator
let initialState = {
    number: 0
}

export const keypadNumbers = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

export const keypadControls = {
    'clear': 'C',
    'add': '+',
    'subtract': '-',
};

export const clear = () => {
    return initialState.number = 0;
};

export const add = (entered) => {
    return initialState.number += entered;
};

export const addOperator = () => {
    return '+';
};

export const divide = (entered) => {
    return initialState.number /= entered;
};

// export const handleKeypadNumerical = (initState, input, output) => {
//     output = parseInt(initState, 10) + parseInt(input, 10);
//     return output;
// };


export const handleKeypadNumerical = (input, output) => {
    return output + input;
};

export const handleMethodButtonClick = () => {
    return null;
}

export const multiply = (entered) => {
    return initialState.number *= entered;
};

export const setNumber = (entered) => {
    return initialState.number = entered;
};

export const subtract = (entered) => {
    return initialState.number -= entered;
};