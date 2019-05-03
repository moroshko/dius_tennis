const Game = require("./TennisGame");

let game;

describe("Non tie break game", () => {
  beforeEach(() => {
    game = new Game("player 1", "player 2", { isTieBreak: false });
  });

  test("new game initialized", () => {
    expect(game.score()).toBe("0-0");
    expect(game.isWonBy("player 1")).toBe(false);
    expect(game.isWonBy("player 2")).toBe(false);
    expect(game.isOver()).toBe(false);
  });

  test("first point is 15", () => {
    game.pointWonBy("player 1");
    expect(game.score()).toBe("15-0");
  });

  test("second point is 30", () => {
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    expect(game.score()).toBe("0-30");
  });

  test("third point is 40", () => {
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    expect(game.score()).toBe("40-15");
  });

  test("deuce", () => {
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    expect(game.score()).toBe("Deuce");
  });

  test("advantage player 1", () => {
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    expect(game.score()).toBe("Advantage player 1");
  });

  test("advantage player 2", () => {
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    expect(game.score()).toBe("Advantage player 2");
  });

  test("player 1 wins a game via deuce", () => {
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 2");
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    expect(game.isWonBy("player 1")).toBe(true);
    expect(game.isOver()).toBe(true);
  });

  test("player 2 wins a game without deuce", () => {
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    expect(game.isWonBy("player 2")).toBe(true);
    expect(game.isOver()).toBe(true);
  });
});

describe("Tie break game", () => {
  beforeEach(() => {
    game = new Game("player 1", "player 2", { isTieBreak: true });
  });

  test("new game initialized", () => {
    expect(game.score()).toBe("(0-0)");
    expect(game.isWonBy("player 1")).toBe(false);
    expect(game.isWonBy("player 2")).toBe(false);
    expect(game.isOver()).toBe(false);
  });

  test("points are 0, 1, 2, 3, ...", () => {
    game.pointWonBy("player 1");
    expect(game.score()).toBe("(1-0)");
    game.pointWonBy("player 1");
    expect(game.score()).toBe("(2-0)");
    game.pointWonBy("player 2");
    expect(game.score()).toBe("(2-1)");
  });

  test("win is after 7 points with 2 margin", () => {
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    game.pointWonBy("player 1");
    expect(game.score()).toBe("(6-0)");
    expect(game.isWonBy("player 1")).toBe(false);
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    game.pointWonBy("player 2");
    expect(game.score()).toBe("(6-6)");
    expect(game.isOver()).toBe(false);
    game.pointWonBy("player 1");
    expect(game.isWonBy("player 1")).toBe(false);
    game.pointWonBy("player 1");
    expect(game.isWonBy("player 1")).toBe(true);
    expect(game.isOver()).toBe(true);
  });
});
