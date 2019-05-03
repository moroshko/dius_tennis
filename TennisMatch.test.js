const Match = require("./TennisMatch");

let match;

// helper function to quickly win a regular (non tie break) game
function winGame(player) {
  match.pointWonBy(player); // 15
  match.pointWonBy(player); // 30
  match.pointWonBy(player); // 40
  match.pointWonBy(player); // win
}

beforeEach(() => {
  match = new Match("player 1", "player 2");
});

test("new match initialized", () => {
  expect(match.score()).toBe("0-0");
  expect(match.isOver()).toBe(false);
});

test("sanity check", () => {
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  expect(match.score()).toBe("6-0, player 1 won");
  expect(match.isOver()).toBe(true);
});
