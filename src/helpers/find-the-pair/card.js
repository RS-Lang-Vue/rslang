import image from "./image";

export default class Card {
  constructor(item, cardImg = false) {
    this.id = item.id;
    this.image = image(item.image);
    this.word = item.word;
    this.audio = item.audio;
    this.wordTranslate = item.wordTranslate;
    this.cardImg = cardImg;
  }
}
