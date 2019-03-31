import React from "react";
import { Animated, Text, TouchableWithoutFeedback, View } from "react-native";

module.exports = function () {
  const screenUsableWidth = this.state.screenUsableWidth;
  const screenUsableHeight = this.state.screenUsableHeight;
  const numberOfTilesAcross = this.state.numberOfTilesAcross;
  const numberOfTilesDown = this.state.numberOfTilesDown;

  const tileWidth = Math.floor(screenUsableWidth / numberOfTilesAcross);
  const tileHeight = Math.floor(screenUsableHeight / numberOfTilesDown);

  const spaceLeft =
    Math.floor((screenUsableWidth - (numberOfTilesAcross * tileWidth)) / 2);
  const spaceTop =
    Math.floor((screenUsableHeight - (numberOfTilesDown * tileHeight)) / 2);

  let tileNumbers = global.generateSolvableLayout();

  const tiles = [];
  const virtualTiles = [];
  let tileCount = 0;

  for (let row = 0; row < numberOfTilesDown; row++) {
    const rowArray = [];
    virtualTiles.push(rowArray);
    for (let col = 0; col < numberOfTilesAcross; col++) {
      const tileNum = tileNumbers[tileCount];
      const refID = `refID_${tileCount}`;
      const left = spaceLeft + (col * tileWidth);
      const top = this.state.controlAreaHeight + spaceTop + (row * tileHeight);
      if (tileCount === (numberOfTilesAcross * numberOfTilesDown) - 1) {
        rowArray.push({ refID: refID, tileNum: 0 });
        tiles.push(
          <View key={tileCount}
            ref={(inRef) => {
              const refs = this.state.refs;
              refs[refID] = inRef;
              this.setState({ refs: refs });
            }} />
        );
      } else {
        rowArray.push({ refID: refID, tileNum: tileNum });
        tiles.push(
          <Animated.View key={tileCount}
            ref={(inRef) => {
              const refs = this.state.refs;
              refs[refID] = inRef;
              this.setState({ refs: refs });
            }} style={[
              {
                position: "absolute",
                backgroundColor: "#d08080",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 10,
                borderTopColor: "#80a080",
                borderLeftColor: "#80a080",
                borderBottomColor: "#c0f0c0",
                borderRightColor: "#c0f0c0",
                borderStyle: "solid",
                borderRadius: 20
              }, {
                left: new Animated.Value(left),
                top: new Animated.Value(top),
                width: tileWidth - 4, height: tileHeight - 4
              }]}
          >
            <TouchableWithoutFeedback
              onPress={() => global.tilePress(refID)}>
                <View
                style={{
                  width: tileWidth,
                  height: tileHeight,
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Text
                style={{
                fontWeight: "bold",
                fontSize: 24
              }}>{tileNum}</Text>
            </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        );
      }
      tileCount = tileCount + 1;
    }
  }
  this.setState({
    tiles : tiles, virtualTiles : virtualTiles,
    tileWidth : tileWidth, tileHeight : tileHeight
});
}