/**
 * * Part 1
 */

function difference(n1, n2) {
  return n1 - n2;
}

// ? Alternatively
// const difference = (n1, n2) => n1 - n2;

console.log(difference(2,2));
console.log(difference(0,2));

function product(n1, n2) {
  return n1 * n2;
}

console.log(product(2,2));
console.log(product(0,4));


function printDay(n) {
  return {
    1: 'Sunday',
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday'
  }[n]
}

console.log(printDay(4));
console.log(printDay(41));


function lastElement(arr) {
  if (!Array.isArray(arr)) {
    console.error(`${ arr } is not an array`);
  }
  let lastEl = arr.pop();
  return lastEl;
}

console.log(lastElement([1,2,3,4]));
console.log(lastElement([]));


function numberCompare(n1, n2) {
  if (n1 === n2) return 'Numbers are equal';
  if (n1 > n2) return 'First is greater';
  if (n1 < n2) return 'Second is greater';
}

console.log(numberCompare(1,1));
console.log(numberCompare(2,1));
console.log(numberCompare(1,2));


function singleLetterCount(phrase, c) {
  let charToCompare = c.toLowerCase();
  return phrase
    .toLowerCase()
    .split('')
    .reduce((total, char) => total + (char === charToCompare.toLowerCase() ? 1 : 0), 0)
}

console.log(singleLetterCount('amazing', 'A'));
console.log(singleLetterCount('RIthm School', 'o'));