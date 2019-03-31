const lodash = require("lodash");

module.exports = function () {
  const virtualTiles = lodash.flattenDeep(this.state.virtualTiles);
  const numberOfTiles =
    this.state.numberOfTilesAcross * this.state.numberOfTilesDown;
  const winningArray =
    Array.from({
      length: numberOfTiles - 1
    }, (v, k) => k + 1);
  let playerWon = true;
  for (let i = 0; i < virtualTiles.length; i++) {
    if (virtualTiles[i].tileNum !== 0 &&
      virtualTiles[i].tileNum !== winningArray[i]
    ) {
      playerWon = false;
      break;
    }
  }
  if (playerWon) {
    this.setState({
      wonVisible: true,
      controlMenuButtonDisabled: true
    });
  }
}