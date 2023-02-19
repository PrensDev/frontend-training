// 1.

let arr = [];

// Add the first name
arr.push('Jetsun Prince');

// Add the last name
arr.push('Torres');

// Add the color
arr.unshift('Blue');

// Checkpoint
console.log(arr);

// Remove the fave color
arr.shift();

// Create another arr
let arr2 = [];

// Add fave number
arr2.push(14);

// Add "JavaScript"
arr2.push('JavaScript');

// Checkpoint 2
console.log(arr2);

// Check if fave number exists in arr2
console.log('If number exists:', arr2.indexOf(14)); // returns the index of the item, which is 0

console.log('If number does not exist:', arr2.indexOf(100)); // returns undefined

// Create new variable
let combinedArr;

// Combine the arrays
combinedArr = arr.concat(arr2);
console.log('Combined:', combinedArr);