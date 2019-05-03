const TennisSet = require("./TennisSet");

function TennisMatch(player1, player2) {
  this.p1 = player1;
  this.p2 = player2;
  this.currentSet = new TennisSet(player1, player2);
}

TennisMatch.prototype.score = function() {
  return this.currentSet.score();
};

TennisMatch.prototype.pointWonBy = function(player) {
  this.currentSet.pointWonBy(player);
};

TennisMatch.prototype.isOver = function() {
  return this.currentSet.isWonBy(this.p1) || this.currentSet.isWonBy(this.p2);
};

module.exports = TennisMatch;
