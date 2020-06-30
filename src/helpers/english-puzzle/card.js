export default class Card {
  constructor(value, index, length, result = false) {
    this.word = value;
    this.id = index;
    this.init = true;
    this.width = "auto";
    this.bgPosX = "0px";
    this.bgPosY = "0px";
    this.isResults = result;
    this.isCheck = false;
    this.isError = false;
    this.isFirstСard = !!(index === 0);
    this.isLastСard = !!(index === length - 1);
  }
}
