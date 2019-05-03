const TennisSet = require("./TennisSet");

let set;

// helper function to quickly win a regular (non tie break) game
function winGame(player) {
  set.pointWonBy(player); // 15
  set.pointWonBy(player); // 30
  set.pointWonBy(player); // 40
  set.pointWonBy(player); // win
}

beforeEach(() => {
  set = new TennisSet("player 1", "player 2");
});

test("new set initialized", () => {
  expect(set.score()).toBe("0-0");
  expect(set.isWonBy("player 1")).toBe(false);
  expect(set.isWonBy("player 2")).toBe(false);
});

test("game score is added only when there is score", () => {
  expect(set.score()).toBe("0-0");
  set.pointWonBy("player 1");
  expect(set.score()).toBe("0-0, 15-0");
  set.pointWonBy("player 1");
  set.pointWonBy("player 2");
  set.pointWonBy("player 1");
  set.pointWonBy("player 2");
  set.pointWonBy("player 2");
  expect(set.score()).toBe("0-0, Deuce");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  expect(set.score()).toBe("1-0");
});

test("set is won after 6 games with 2 margin", () => {
  winGame("player 1");
  expect(set.score()).toBe("1-0");
  expect(set.isWonBy("player 1")).toBe(false);

  winGame("player 1");
  expect(set.score()).toBe("2-0");
  expect(set.isWonBy("player 1")).toBe(false);

  winGame("player 1");
  expect(set.score()).toBe("3-0");
  expect(set.isWonBy("player 1")).toBe(false);

  winGame("player 1");
  expect(set.score()).toBe("4-0");
  expect(set.isWonBy("player 1")).toBe(false);

  winGame("player 1");
  expect(set.score()).toBe("5-0");
  expect(set.isWonBy("player 1")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-1");
  expect(set.isWonBy("player 2")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-2");
  expect(set.isWonBy("player 2")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-3");
  expect(set.isWonBy("player 2")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-4");
  expect(set.isWonBy("player 2")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-5");
  expect(set.isWonBy("player 2")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-6");
  expect(set.isWonBy("player 2")).toBe(false);

  winGame("player 2");
  expect(set.score()).toBe("5-7, player 2 won");
  expect(set.isWonBy("player 2")).toBe(true);
});

test("tie break scores", () => {
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  winGame("player 1");
  winGame("player 2");
  winGame("player 2");
  winGame("player 2");
  winGame("player 2");
  winGame("player 2");
  winGame("player 2");
  winGame("player 1");
  expect(set.score()).toBe("6-6");
  set.pointWonBy("player 2");
  expect(set.score()).toBe("6-6, (0-1)");
  set.pointWonBy("player 2");
  set.pointWonBy("player 2");
  set.pointWonBy("player 2");
  set.pointWonBy("player 2");
  set.pointWonBy("player 2");
  expect(set.score()).toBe("6-6, (0-6)");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  expect(set.score()).toBe("6-6, (7-6)");
  expect(set.isWonBy("player 1")).toBe(false);
  set.pointWonBy("player 2");
  set.pointWonBy("player 2");
  expect(set.score()).toBe("6-6, (7-8)");
  expect(set.isWonBy("player 2")).toBe(false);
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  set.pointWonBy("player 1");
  expect(set.score()).toBe("7-6, (10-8), player 1 won");
  expect(set.isWonBy("player 1")).toBe(true);
});
