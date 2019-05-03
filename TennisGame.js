// POINTS is used for displaying purposes only.
// All the calculations are done using this.currentScore values,
// which are 0, 1, 2, 3, 4, 5, ...
const POINTS = [0, 15, 30, 40];

function TennisGame(player1, player2, { isTieBreak }) {
  this.p1 = player1;
  this.p2 = player2;
  this.isTieBreak = isTieBreak;
  this.currentScore = {
    [player1]: 0,
    [player2]: 0
  };
}

TennisGame.prototype.score = function() {
  const score1 = this.currentScore[this.p1];
  const score2 = this.currentScore[this.p2];

  if (this.isTieBreak) {
    return `(${score1}-${score2})`;
  }

  if (score1 >= 3 && score2 >= 3) {
    if (score1 === score2) {
      return "Deuce";
    }

    return score1 > score2 ? `Advantage ${this.p1}` : `Advantage ${this.p2}`;
  }

  return `${POINTS[score1]}-${POINTS[score2]}`;
};

TennisGame.prototype.hasScore = function() {
  return this.currentScore[this.p1] > 0 || this.currentScore[this.p2] > 0;
};

TennisGame.prototype.isWonBy = function(player) {
  const opponent = player === this.p1 ? this.p2 : this.p1;
  const playerScore = this.currentScore[player];
  const opponentScore = this.currentScore[opponent];

  if (this.isTieBreak) {
    return playerScore >= 7 && playerScore - opponentScore >= 2;
  }

  return playerScore >= 4 && playerScore - opponentScore >= 2;
};

TennisGame.prototype.isOver = function(player) {
  return this.isWonBy(this.p1) || this.isWonBy(this.p2);
};

TennisGame.prototype.pointWonBy = function(player) {
  if (this.isWonBy(this.p1) || this.isWonBy(this.p2)) {
    return;
  }

  this.currentScore[player]++;
};

module.exports = TennisGame;
