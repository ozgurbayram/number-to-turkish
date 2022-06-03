import {
    numberTable
} from "./tables.js";
// DOM
const input = document.getElementById('input');
const convert = document.getElementById('convert');
const clear = document.getElementById('clear');
const result = document.getElementById('result');
// Focus on input
window.onload = function () {
    input.focus();
};

/* 
    Takes two argument and returns the text representation of the number
    @param {number} value
    @param {number} factor
*/
const numberToText = (value, factor) => {
    let val = value.split('').reverse();
    let res = [];
    let fac = 1;
    for (let i = 0; i < val.length; i++) {
        const element = parseInt(val[i])
        if (element > 0) {
            let r = numberTable[element * fac]
            if (r !== undefined) {
                res.unshift(r);
            }
            if (r === undefined) {
                let hunder = numberTable[element] + numberTable[fac]
                res.unshift(hunder);
            }
        }
        fac = fac * 10;
    }
    if (factor > 1) {
        res.push(numberTable[factor]);
    }
    console.log(res);
    return res.join('');
}

/* 
    Splists given number into array of digits
    @param {number} value
*/
const splitAndCombine = (value) => {
    const res = [];
    let nums = parseInt(value, 10).toLocaleString('en-US').split(',').reverse();
    let factor = 1
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        res.unshift(numberToText(element, factor))
        factor = factor * 1000;
    }
    result.innerHTML = res.join(' ');
}

/* 
    Converts given number into text
*/
convert.addEventListener('click', () => {
    // Check if input starts with 0
    if (input.value.toString().startsWith(0)) {
        input.value = input.value.toString().slice(1);
    }
    splitAndCombine(input.value);
})

// Clear 
clear.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
    clear.setAttribute('disabled', 'disabled');
});

// Clear Button Enabled
const change = (e) => {
    if (input.value.length > 0) {
        clear.removeAttribute('disabled');
        convert.removeAttribute('disabled');
    }
}
input.addEventListener('keyup', change)
