module.exports = function (inWhichDimension, inValue) {
  switch (inWhichDimension) {
    case "across":
      if (inValue !== this.state.numberOfTilesAcross) {
        this.setState({
            numberOfTilesAcross: inValue
          },
          global.buildMatrix
        );
      }
      break;
    case "down":
      if (inValue !== this.state.numberOfTilesDown) {
        this.setState({
            numberOfTilesDown: inValue
          },
          global.buildMatrix
        );
      }
      break;
  }
}