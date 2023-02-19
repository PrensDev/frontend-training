/**
 * 1.
 * Create an object that has your firstName, 
 * lastName, and occupation as keys.
 */
let myObj = {
  firstName: 'Jetsun Prince',
  lastName: 'Torres',
  occupation: 'Junior Web Developer'
}

/**
 * 2.
 * Access each value from your object using both 
 * dot notation and bracket notation.
 */
console.log("\nWith dot notation"); 
console.log('First Name:', myObj.firstName);
console.log('Last Name:', myObj.lastName);
console.log('Occupation:', myObj.occupation);

console.log('\nWith bracket notation');
console.log('First Name:', myObj['firstName']);
console.log('Last Name:', myObj['lastName']);
console.log('Occupation:', myObj['occupation']);

/**
 * 3. 
 * Add a key for hobby to your object. Remove the 
 * key and value for occupation.
 */
myObj.hobby = 'Programming';
console.log('With hobby:', myObj);
delete myObj.occupation;
// ? Alternatively
// delete myObje['occupation'];
console.log('Without occupation:', myObj);


/**
 * II.
 * 1. Copy your created object to a new object. 
 */

let newObj = {...myObj}

// ? Alternative
// let newObj = new Object(myObj);

/**
 * 2. Add new property and assign a value
 */
newObj.age = 22;

/**
 * 3. Compare the original object to copied object 
 * 4. What will be the output
 */
console.log('Original object:', myObj);
console.log('New object', newObj);

/**
 * III
 * 1. Create an object Student with properties 
 * name, score, and grade
 * 2. Assign values to name and score and 
 * grade as an empty string
 */
let Student = {
  name: 'Juan Dela Cruz',
  score: 91,
  grade: ''
}

/**
 * 3. Loop through each properties and update grade
 */

for (let key in Student) {
  if (key === 'score') {
    let score = Student.score;
    Student.grade = score > 90 
      ? 'A' 
      : score > 80 
        ? 'B'
        : score > 70
          ? 'C'
          : 'F'
  }
}
console.log('Updated Student obj:', Student);


// ? Alternative
let scoreSheet = {
  90: 'A',
  80: 'B',
  70: 'C',
  0: 'F'
}

for (let key in scoreSheet) 
  if (+key <= Student.score) 
    Student.grade = scoreSheet[key];

console.log('Updated student obj:', Student);