let test = await fetch('./data.json')
  .then((response) => response.json())
  .then((json) => json);

  console.log(test);