let people = ["Greg", "Mary", "John", "James"];

/**
 * Using a loop, iterate through this array 
 * and console.log all of the people
 */
for (let person of people) {
  console.log(person);
}
// ? Alternative:
// person.forEach(people => console.log(people));

/**
 * Write the command to remove 
 * "Greg" from the array
 */
people.shift();
console.log('After removing "Greg":', people);

/**
 * Write the command to remove 
 * "James" from the array.
 */
people.pop();
console.log('After removing "James":', people);

/**
 * Write the command to add "Matt" 
 * to the front of the array.
 */
people.unshift("Matt");
console.log('After adding "Matt":', people);

/**
 * Write the command to add your name 
 * to the end of the array.
 */
people.push("Jetsun");
console.log('After adding "Jetsun":', people);

/**
 * Using a loop, iterate through this 
 * array and after console.log-ing "Mary", exit from the loop.
 */
let i = 0;
while(i < people.length) {
  let person = people[i];
  console.log(person);
  i++;
  if (person === 'Mary') break;
}
// ? Alternative: 
// people.every(person => {
//   console.log(person);
//   if (person === 'Mary') return;
// });

/**
 * Write the command to make a copy of the array using slice. 
 * The copy should NOT include "Mary" or "Matt".
 */
console.log('Current people:', people);
let arrCopy = people.slice(2,4);
console.log('Copied:', arrCopy);

/**
 * Write the command that gives the indexOf 
 * where "Mary" is located.
 */
let indexOfMary = people.indexOf("Mary");
console.log('Index of Mary:', indexOfMary);

/**
 * Write the command that gives the indexOf 
 * where "Foo" is located (this should return -1).
 */
let indexOfFoo = people.indexOf("Foo");
console.log('Index of Foo:', indexOfFoo);

/**
 * Redefine the people variable with the value you 
 * started with. Using the splice command, remove 
 * "John" from the array and add "Elizabeth" and 
 * "Artie". Your array should look like this when 
 * you are done [“Matt”, "Mary", "Elizabeth", "Artie", 
 * "James"].
 */
console.log('Current people:', people);
people.splice(2,1,"Elizabeth", "Artie");
console.log('New people:', people);

/**
 * Create a new variable called withBob and set it equal 
 * to the people array concatenated with the string of "Bob".
 */
let withBob = people.concat("Bob");
console.log('withBob:', withBob);