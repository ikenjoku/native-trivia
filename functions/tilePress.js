import {
  Animated
} from "react-native";

module.exports = function (inRefID) {
  if (this.state.controlMenuVisible) {
    return;
  }
  const tile = this.state.refs[inRefID];
  const virtualTiles = this.state.virtualTiles;
  let virtualTile = null;
  let tileLoc = null;
  const numberOfTilesAcross = this.state.numberOfTilesAcross;
  const numberOfTilesDown = this.state.numberOfTilesDown;

  for (let row = 0; row < numberOfTilesDown; row++) {
    const rowArray = virtualTiles[row];
    for (let col = 0; col < numberOfTilesAcross; col++) {
      const vt = rowArray[col];
      if (vt.refID === inRefID) {
        virtualTile = vt;
        tileLoc = {
          row: row,
          col: col
        };
        break;
      }
    }
  }

  let virtualTileLeft = null;
  let virtualTileRight = null;
  let virtualTileAbove = null;
  let virtualTileBelow = null;

  try {
    virtualTileLeft = virtualTiles[tileLoc.row][tileLoc.col - 1];
  } catch (e) {}
  try {
    virtualTileRight = virtualTiles[tileLoc.row][tileLoc.col + 1];
  } catch (e) {}
  try {
    virtualTileAbove = virtualTiles[tileLoc.row - 1][tileLoc.col];
  } catch (e) {}
  try {
    virtualTileBelow = virtualTiles[tileLoc.row + 1][tileLoc.col];
  } catch (e) {}

  const tileWidth = this.state.tileWidth;
  const tileHeight = this.state.tileHeight;
  let moveTile = false;


  let toLeftValue = tile.props.style[1].left.__getValue();
  let toTopValue = tile.props.style[1].top.__getValue();

  if (virtualTileLeft && parseInt(virtualTileLeft.tileNum) === 0) {
    toLeftValue = toLeftValue - tileWidth;
    moveTile = true;
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileLeft;
    virtualTiles[tileLoc.row][tileLoc.col - 1] = virtualTile;
  }

  if (virtualTileRight && parseInt(virtualTileRight.tileNum) === 0) {
    toLeftValue = toLeftValue + tileWidth;
    moveTile = true;
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileRight;
    virtualTiles[tileLoc.row][tileLoc.col + 1] = virtualTile;
  }

  if (virtualTileAbove && parseInt(virtualTileAbove.tileNum) === 0) {
    toTopValue = toTopValue - tileHeight;
    moveTile = true;
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileAbove;
    virtualTiles[tileLoc.row - 1][tileLoc.col] = virtualTile;
  }
  if (virtualTileBelow && parseInt(virtualTileBelow.tileNum) === 0) {
    toTopValue = toTopValue + tileHeight;
    moveTile = true;
    virtualTiles[tileLoc.row][tileLoc.col] = virtualTileBelow;
    virtualTiles[tileLoc.row + 1][tileLoc.col] = virtualTile;
  }

  let moveCount = this.state.moveCount;
  if (moveTile) {
    moveCount = moveCount + 1;
    const moveDuration = 250;
    Animated.parallel([
      Animated.timing(
        tile.props.style[1].left, {
          toValue: toLeftValue,
          duration: moveDuration
        }
      ),
      Animated.timing(
        tile.props.style[1].top, {
          toValue: toTopValue,
          duration: moveDuration
        }
      )
    ]).start(global.determineOutcome);
  }

  this.setState({
    virtualTiles: virtualTiles,
    moveCount: moveCount
  });
}