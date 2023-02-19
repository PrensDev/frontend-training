function test() {
  console.log(arguments.callee);
}

test(1,2,3,4)