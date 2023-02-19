// function rotate(arr, n) {
//   let arrCopy = [...arr];
//   let arrLength = arr.length;
//   for (let i = 0; i < arrLength; i++)
//     arrCopy[i] = i+n < arrLength ? arr[i+n] : arr[(i+n)%arrLength];
//   return arrCopy;
// }

// const rotate2 = (arr, n) => [...arr].map((_, i) => i+n < arr.length ? arr[i+n] : arr[(i+n)%arr.length]);

// console.log(JSON.stringify(rotate([1,2,3,4,5,6],9)));

function makeXOGrid(row, col) {
  let arr = [];
  let ctr = 1;
  for (let i = 0; i < row; i++) {
    arr.push([]);
    for (let j = 0; j < col; j++) {
      arr[i].push(ctr%2 === 1 ? 'X' : 'O');
      ctr++;
    }
  }
  return arr;
}

function makeXOGrid2(row, col) {
  let ctr = 1;
  return Array(row).fill(0).map(_ => Array(col).fill(0).map(_ => {
    let char = ctr%2 === 1 ? 'X' : 'O';
    ctr++;
    return char;
  }));
}

// console.log(JSON.stringify(makeXOGrid(1,4)));
// console.log(JSON.stringify(makeXOGrid(3,2)));
// console.log(JSON.stringify(makeXOGrid(3,3)));