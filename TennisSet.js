const Game = require("./TennisGame");

function TennisSet(player1, player2) {
  this.p1 = player1;
  this.p2 = player2;

  this.gamesScore = {
    [player1]: 0,
    [player2]: 0
  };
  this.currentGame = new Game(player1, player2, { isTieBreak: false });
}

TennisSet.prototype.score = function() {
  const setScore = `${this.gamesScore[this.p1]}-${this.gamesScore[this.p2]}`;
  const gameScore =
    !this.currentGame.hasScore() ||
    (this.currentGame.isOver() && !this.currentGame.isTieBreak)
      ? ""
      : `, ${this.currentGame.score()}`;
  const setResult = this.isWonBy(this.p1)
    ? `, ${this.p1} won`
    : this.isWonBy(this.p2)
    ? `, ${this.p2} won`
    : "";

  return `${setScore}${gameScore}${setResult}`;
};

TennisSet.prototype._opponentOf = function(player) {
  return player === this.p1 ? this.p2 : this.p1;
};

TennisSet.prototype.isWonBy = function(player) {
  const playerScore = this.gamesScore[player];
  const opponentScore = this.gamesScore[this._opponentOf(player)];

  return (
    (playerScore >= 6 && playerScore - opponentScore >= 2) ||
    (playerScore === 7 && opponentScore === 6)
  );
};

TennisSet.prototype.pointWonBy = function(player) {
  if (this.isWonBy(this.p1) || this.isWonBy(this.p2)) {
    return;
  }

  this.currentGame.pointWonBy(player);

  if (this.currentGame.isWonBy(player)) {
    this.gamesScore[player]++;

    if (!this.isWonBy(player)) {
      this.currentGame = new Game(this.p1, this.p2, {
        isTieBreak:
          this.gamesScore[player] === 6 &&
          this.gamesScore[this._opponentOf(player)] === 6
      });
    }
  }
};

module.exports = TennisSet;
