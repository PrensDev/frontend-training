// 2.

let arr = ["JavaScript", "Python", "Ruby", "Java"];

// Return the following array ["Python", "Ruby"]
let res1 = arr.slice(1, 3);
console.log(res1);

// Combine the array ["Haskell", "Clojure"]
let arr2 = ["Haskell", "Clojure"];
let res2 = arr.concat(arr2);
console.log(res2);

// Return the string "JavaScript, Python, Ruby, Java"
let res3 = arr.join(", ");
console.log(res3);
