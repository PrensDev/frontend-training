/**
 * * Part 2
 */

function multipleLetterCount(str, isCaseSensitive = false) {
  let thisStr = isCaseSensitive ? str : str.toLowerCase();
  let counter = {};
  let arrStr = thisStr.split('');
  for (let char of arrStr) {
    counter.hasOwnProperty(char) 
      ? counter[char] += counter[char] + 1
      : counter[char] = 1
  }
  return counter;
}

console.log(multipleLetterCount("hello"));
console.log(multipleLetterCount("person"));



function arrayManipulation(arr, action, position, item) {
  let arrCopy = [...arr];
  let actions = {
    add: {
      beginning: () => {
        arrCopy.unshift(item)
        return arrCopy;
      },
      end: () => {
        arrCopy.push(item)
        return arrCopy;
      }
    },
    remove: {
      beginning: () => arrCopy.shift(),
      end: () => arrCopy.pop()
    }
  }
  return actions[action][position]();
}

console.log(arrayManipulation([1,2,3], "remove", "end"));
console.log(arrayManipulation([1,2,3], "remove", "beginning"));
console.log(arrayManipulation([1,2,3], "add", "beginning", 20));
console.log(arrayManipulation([1,2,3], "add", "end", 30));


function isPalindrome(str) {
  let strArr = str.toLowerCase().split('').filter(char => char !== ' ');
  let reversedArr = [...strArr].reverse();
  return strArr.every((char, index) => char === reversedArr[index]);
}

// ? Alternately
// function isPalindrome(str) {
//   let strArr = str.toLowerCase().replace(/ /g, '').split('');
//   let reversedArr = [...strArr].reverse();
//   return strArr.every((char, index) => char === reversedArr[index]);
// }

console.log(isPalindrome('a man a plan a canal Panama'));
console.log(isPalindrome('testing'));
console.log(isPalindrome('tacocat'));
console.log(isPalindrome('hannah'));
console.log(isPalindrome('robert'));