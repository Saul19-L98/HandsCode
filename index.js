/**
 * Hands Code.
 * Introduction
    You find a strange mirror that always shows a hand that is moving.The hand appears
    to be alive,and afteralot of questions of"yes"and"no"answer,you know that the 
    hand is trying to teach you a program that is written in HPL (Hand Programming Language).
    This language works with a memory of an indefinite size of bytes, with all 
    values initialized to 0. This language haves 7 instructions:
 * 
 * 👉: moves the memory pointer to the next cell.
 * 👈: moves the memory pointer to the previous cell.
 * 👆: increment the memory cell at the current position.
 * 👇: decreases the memory cell at the current position.
 * 🤜: if the memory cell at the current position is 0, jump just after correspondign 🤛.
 * 🤛: if the memory cell at the current position is not 0, jump just after the corresponding 🤜.
 * 👊: Display the current character represented by the ASCII code defined by the current position.
 * 
 * Notes:
        -As memory cells are bytes,from0to 255 value,if you decrease0you'll get 255,
        if you increment 255 you'll geta. 
        -Loops of 🤜 and 🤛 can be nested
 * 
 */

const MIN_CELL = 0;
const MAX_CELL = 255;

const clamp = value => {
    if(value > MAX_CELL) return MIN_CELL;
    if(value < MIN_CELL) return MAX_CELL;
    return value; 
};

const getNextFistIndex = (index, instructions) => {
    let fists = 1;
    for( let i = index + 1; i < instructions.length; i++){
        if(instructions[i] === '🤜') fists++;
        if(instructions[i] === '🤛') fists--;
        if(fists === 0) return i;
    }
};

const getPrevFistIndex = (index, instructions) => {
    let fists = 1;
    for( let i = index - 1; i >= 0; i--){
        if(instructions[i] === '🤛') fists++;
        if(instructions[i] === '🤜') fists--;
        if(fists === 0) return i;
    }
};

function translate (string){
    const memory = [0];
    let pointer = 0;
    let index = 0;
    let output = '';
    
    const arrayOfInstruction = Array.from(string);

    const actions = {
        '👉': () => {
            pointer++;
            memory[pointer] ??= 0;
        },
        '👈': () => {
            pointer--;
            memory[pointer] ??= 0;
        },
        '👆': () => {
            memory[pointer] = clamp(memory[pointer] + 1);
        },
        '👇': () => {
            memory[pointer] = clamp(memory[pointer] - 1);
        },
        '🤜': () => {
            if(memory[pointer] === 0){
                // index = arrayOfInstruction.indexOf('🤛',index);
                index = getNextFistIndex(index, arrayOfInstruction);
            }
        },
        '🤛': () => {
            if(memory[pointer] !== 0){
                // index = arrayOfInstruction.lastIndexOf('🤜',index);
                index = getPrevFistIndex(index, arrayOfInstruction);
            }
        },
        '👊': () => {
            // console.log(memory[pointer]);
            output += String.fromCharCode(memory[pointer]);
        }
    }

    while(index < arrayOfInstruction.length){
        const action = arrayOfInstruction[index];
        //NOTE:Take from object "actions" the "action" and execute the method.
        actions[action]();
        console.log({action,index,pointer,output});
        index++
    }
    return output;
}

module.exports = translate