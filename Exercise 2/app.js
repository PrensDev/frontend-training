// 1. Create an array of your fave food
let favoriteFoods = ['menudo', 'sinigang', 'tinola', 'nilaga', 'curry'];

// 2. Access the second element
console.log('2nd element:', favoriteFoods[1]);

// 3. Change the last element in array
favoriteFoods[favoriteFoods.length-1] = 'sisig';
console.log('After changing last food:', favoriteFoods);

// 4. Remove the first element
let formerFavoriteFood = favoriteFoods.shift();
console.log('After removing the first element:', favoriteFoods);
console.log('Removed element:', formerFavoriteFood);

// 5. Add a favorite food to the back
favoriteFoods.push('lasagna');
console.log('After adding fave food to the back:', favoriteFoods);

// 6. Add a favorite food to the front
favoriteFoods.unshift('pizza');
console.log('After adding fave food to the front:', favoriteFoods);