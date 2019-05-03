const Match = require("./TennisMatch");

const PLAYER1 = "player 1";
const PLAYER2 = "player 2";
const match = new Match(PLAYER1, PLAYER2);

function randomWinner() {
  return Math.random() < 0.5 ? 1 : 2;
}

const winners = [];

console.log(`     ${match.score()}`);

while (!match.isOver()) {
  const winner = randomWinner();

  winners.push(winner);

  match.pointWonBy(winner === 1 ? PLAYER1 : PLAYER2);

  console.log(`${winner} => ${match.score()}`);
}

//console.log(winners);

/*
const winners = [
  2,
  1,
  1,
  1,
  1,
  1,
  2,
  1,
  2,
  2,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  2,
  2,
  1,
  2,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  1,
  2,
  1,
  1,
  2,
  1,
  2,
  2,
  1,
  2,
  1,
  2,
  1,
  1,
  1,
  2,
  1,
  1,
  2,
  2,
  2,
  2,
  1,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  2,
  1,
  1,
  2,
  2,
  2,
  2,
  1,
  2,
  2,
  2,
  2,
  1,
  2,
  1,
  2,
  2,
  2,
  1,
  1,
  2,
  1,
  2,
  2,
  2,
  1,
  1,
  1,
  2,
  1,
  1,
  1,
  2,
  2,
  1,
  1,
  2,
  2,
  1,
  1,
  1
];

console.log(`init ${match.score()}`);

winners.forEach(winner => {
  match.pointWonBy(`player ${winner}`);
  console.log(`${winner} => ${match.score()}`);
});
*/
