/**
 * * 1. map
 * Write a function called map which accepts two parameters: 
 * an array and a callback. The map function should return a 
 * new array with the result of each value being passed to 
 * the callback function.
 */

function map(arr, fn) {
  let arrCopy = [];
  for (let i = 0; i < arr.length; i++) {
    arrCopy[i] = fn(arr[i]);
  }
  return arrCopy;
}

// const map = (arr, fn) => [...arr].map(fn);

// console.log(map([1,2,3,4], function(val){
//   return val * 2;
// })); // [2,4,6,8]



/**
 * * 2. reject
 * Write a function called reject which accepts two parameters 
 * an array and a callback. The function should return a new 
 * array with all of the values that do not return true to the 
 * callback. 
 */

function reject(arr, fn) {
  let _arr = [];
  for (let i = 0; i < arr.length; i++) 
    !fn(arr[i]) && _arr.push(arr[i]);
  return _arr;
}

// const reject = (arr, fn) => [...arr].filter(n => !fn(n));


// console.log(reject([1,2,3,4], function(val) {
//   return val > 2;
// }));

// console.log(reject([1,2,3,4,5], function(val){
//   return val % 2 === 0;
// }));



/**
 * * 3. countdown
 * Write a function called countdown that accepts a number as a 
 * parameter and every 1000 milliseconds decrements the value 
 * and console.logs it. Once the value is 0 it should log "DONE!" 
 * and stop.
 */

function countdown(n) {
  let countdownInterval = setInterval(() => {
    console.log(n);
    n--;
    if (n < 0) { 
      console.log('DONE!');
      clearInterval(countdownInterval);
    }
  }, 1000);
}

// countdown(4);



/**
 * * 4. randomGame
 * Write a function called randomGame that selects a random number 
 * between 0 and 1 every 1000 milliseconds and each time that a 
 * random number is picked, add 1 to a counter. If the number is 
 * greater than .75, stop the timer and return the number of tries 
 * it took before we found a number greater than .75.
 */

function randomGame() {
  let ctr = 0;
  let interval = setInterval(function() {
    const generateNumber = Math.random();
    console.log('rand:', generateNumber);
    ctr++;

    if(generateNumber > 0.75) {
      clearInterval(interval);
      console.log(ctr);
    }
  }, 1000);
}

// randomGame();

const asyncRandomGame = async () => {
  let ctr = 0;
  await new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      const generateNumber = Math.random();
      console.log('rand:', generateNumber);
      ctr++;

      if(generateNumber > 0.75) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
  return ctr;
}

// (async() => {
//   let gameResult = await asyncRandomGame();
//   console.log(gameResult);
// })();



/**
 * * 5. isEven
 * Write a function called isEven which takes in a number and returns 
 * true if the number is even and returns false if it is not
 */

const isEven = n => n%2 === 0;



/**
 * * 6. isOdd
 * Write a function called isOdd which takes in a number and returns true
 * if the number is odd and returns false if it is not
 */

const isOdd = n => n%2 === 1;



/**
 * * 7. isPrime
 * Write a function called isPrime which takes in a number and returns
 * true if the number is a prime number (is greater than 1 and can only 
 * be divided in whole by itself and 1), otherwise returns false
 */

const isPrime = n => {

  // If value is 2, return true
  if(n === 2) return true; 

  // If value is less than 2 or divisible by 2
  if(n < 2 || n % 2 === 0) return false;

  // if value is greater than 2, loop to its values and check its modulo
  // if value has modulo 0, it indicates that the value has divisible value/s
  for(let i = 3; i * i <= n; i += 2) 
    if(n % i === 0) return false;

  // return true if no divisible values for values greater than 2
  return true;
}



/**
 * * 8. numberFact
 * Write a function called numberFact which takes in a number and a 
 * callback and returns the result of the callback with the number 
 * passed to it
 */

const numberFact = (n, fn) => fn(n);

// console.log(numberFact(19,isEven));
// console.log(numberFact(19,isOdd));
// console.log(numberFact(19,isPrime));



/**
 * * 9. Find
 * Write a function called find. It should take in an array and a 
 * callback and return the first value found in the array that matches 
 * the condition.
 */

const find = (arr, fn) => {
  let value;
  for (let i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      value = arr[i];
      break;
    }
  }
  return value;
}

const find2 = (arr, fn) => arr.find(fn);

// console.log(find([8,11,4,27], function(val){return val >= 10}));
// console.log(find([8,11,4,27], function(val){return val === 5}));



/**
 * * 10. findIndex
 * Write a function called findIndex. It should take in an array and 
 * a callback and return the index of first value found in the array 
 * that matches the condition.
 * ? returns 1 (index of the first value greater than or equal to 10)
 */

// function findIndex(arr, fn) {
//   for (let i = 0; i < arr.length; i++) {
//     if (fn(arr[i])) {
//       return i;
//     }
//   }
// }

const findIndex = (arr, fn) => {
  let index = arr.findIndex(fn);
  return index === -1 ? undefined : index;
}

// console.log(findIndex([8,11,4,27], function(val){return val >= 10}));
// console.log(findIndex([8,11,4,27], function(val){return val === 7}));



/**
 * * 11. specialMultiply
 * Write a function called specialMultiply which accepts two parameters. 
 * If the function is passed both parameters, it should return the product 
 * of the two. If the function is only passed one parameter - it should 
 * return a function which can later be passed another parameter to return 
 * the product. You will have to use closure and arguments to solve this.
 */

function specialMultiply() {
  const product = (multiplier) => arguments[0] * multiplier;

  let argsLength = arguments.length;

  if(argsLength === 1) return product;
  if(argsLength === 2) return arguments[0] * arguments[1]; 
  return;
}

function specialMultiply(...args) {
  console.log('arguments:', args);
}

specialMultiply(3,4,5);
// console.log(specialMultiply(3)(4));
// console.log(specialMultiply(3));