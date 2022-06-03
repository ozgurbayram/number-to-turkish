import { numberTable } from "./tables.js";
// DOM
const input = document.getElementById('input');
const convert = document.getElementById('convert');
const clear = document.getElementById('clear');
const result = document.getElementById('result');
// Focus on input
window.onload = function() {
    input.focus();
};

// Clear Button Enabled
const change = (e)=>{
    if(input.value.length > 0){
        clear.removeAttribute('disabled');
    }
}   
input.addEventListener('keyup',change)

// Converts given number to text 
const numberToText = (value,factor)=>{
    const val = value.split('').reverse();
    let res = [];
    let fac = 1;
    for (let i = 0; i < val.length; i++) {
        const element = parseInt(val[i])
        let r = numberTable[element*fac]
        if(r!==undefined) {
            res.unshift(r);
        }
        if(r===undefined){
            let hunder = (numberTable[element]+numberTable[fac]) 
            res.unshift(hunder);
        }
        fac = fac * 10;
    }
    if(factor>1){
        res.push(numberTable[factor]);
    }
    return res.join('');
}

// parses input and creates array 
const returnArrayOfDigits = (value)=>{
    const res = [];
    let nums = parseInt(value,10).toLocaleString().split(',').reverse();
    let factor = 1
    for (let i = 0; i < nums.length; i++) {
        const element = nums[i];
        res.unshift(numberToText(element,factor))
        factor = factor * 1000;
    }
    result.innerHTML = res.join(' ');
}

// Convert 
convert.addEventListener('click', () => {
    returnArrayOfDigits(input.value);
})

// Clear 
clear.addEventListener('click', () => {
    input.value = '';
    result.innerHTML = '';
    clear.setAttribute('disabled', 'disabled');
});