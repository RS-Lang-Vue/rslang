export default class Card {
  constructor(value, index, result = false) {
    this.word = value;
    this.id = index;
    this.isResults = result;
    this.init = true;
    this.width = "auto";
    this.isCheck = false;
    this.isError = false;
  }
}
