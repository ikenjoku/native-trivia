const lodash = require("lodash");
const testWin = false;


module.exports = function() {
  const numberOfTilesAcross = this.state.numberOfTilesAcross;
  const numberOfTilesDown = this.state.numberOfTilesDown;

  let tileNumbers = [];
  for (let i = 1; i < numberOfTilesAcross * numberOfTilesDown; i++) {
    tileNumbers.push(i);
  }

  let isSolvable = false;
  while (!isSolvable) {
    tileNumbers = lodash.shuffle(tileNumbers);
    if (testWin) {
      tileNumbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 0 ];
      isSolvable = true;
      continue;
}
const numberOfTiles = numberOfTilesAcross * numberOfTilesDown;
    let inversionCount = 0;
    for (let i = 0; i < numberOfTiles - 1; i++) {
      for (let j = 1; j < numberOfTiles; j++) {
        if (tileNumbers[j] && tileNumbers[i] &&
tileNumbers[i] > tileNumbers[j] ){
          inversionCount = inversionCount +1;
        }
} }
    isSolvable = (inversionCount % 2 === 0);
  }
  return tileNumbers;
};
