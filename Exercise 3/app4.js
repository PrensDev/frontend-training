let nestedData = {
  innerData: {
    order: ["first", "second", "third"],
    snacks: ["chips", "fruit", "crackers"],
    numberData: {
        primeNumbers: [2,3,5,7,11],
        fibonnaci: [1,1,2,3,5,8,13]
    },
    addSnack: function(snack){
        this.snacks.push(snack);
        return this;
    }
  }
}

// let primeNumbers = nestedData.innerData.numberData.primeNumbers;
// for (let i of primeNumbers) {
//   console.log(i);
// }

// let fibonnaciNumbers = nestedData.innerData.numberData.fibonnaci;
// for (let i of fibonnaciNumbers) {
//   i%2 === 0 && console.log(i);
// }

// nestedData.innerData.numberData.fibonnaci.filter(n => n%2 === 0).forEach(n => console.log(n));

// console.log(nestedData.innerData.order[1]);

// nestedData.innerData.addSnack('chocolate');