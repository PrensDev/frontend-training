function rps_game(p1, p2 = '') {

  // Get the players choice
  let p1_choice = p1.toLowerCase();
  let p2_choice = p2.toLowerCase();

  // Set the mode if '2 player' or 'Computer'
  const mode = p2 ? '2 player' : 'Computer';

  // Configure defeats
  const defeats = {
    'rock': 'scissors',
    'paper': 'rock',
    'scissors': 'paper'
  }

  const invalidParamMsg = 'Please select either "Rock", "Paper", or "Scissor"';

  // Validate parameters
  if (!defeats.hasOwnProperty(p1_choice)) {
    console.error(`P1: ${ invalidParamMsg }`);
    return;
  }
  if(p2 && !defeats.hasOwnProperty(p2_choice)) {
    console.error(`P2: ${ invalidParamMsg }`);
    return;
  }



  // If no player 2, let computer choose
  if (mode === 'Computer') {
    const choices = Object.keys(defeats);
    p2_choice = choices[Math.floor(Math.random() * choices.length)];
  }
  
  // Get the message
  let message;
  if (p1_choice === p2_choice) message = "It's a tie!"
  else if (defeats[p1_choice] === p2_choice) message = mode === 'Computer' ? "You win :D" : 'Player 1 wins!';
  else message = mode === 'Computer' ? "You lose :(" : 'Player 2 wins!';

  // Get the player names for the result
  let p1_name = mode === 'Computer' ? 'Player' : 'Player 1';
  let p2_name = mode === 'Computer' ? 'Computer' : 'Player 2';

  // Get the result
  console.log(`${ p1_name }: ${ p1_choice };\n${ p2_name }: ${ p2_choice };\nMessage: ${ message }\n`);
  return;
}

rps_game('rock');
rps_game('paper');
rps_game('scissors');

rps_game('test');
rps_game('rock', 'error');

rps_game('rock', 'rock');
rps_game('paper', 'scissors');
rps_game('scissors', 'rock');