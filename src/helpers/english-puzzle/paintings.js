import level1 from "@/helpers/english-puzzle/paintings/level1";
import level2 from "@/helpers/english-puzzle/paintings/level2";
import level3 from "@/helpers/english-puzzle/paintings/level3";
import level4 from "@/helpers/english-puzzle/paintings/level4";
import level5 from "@/helpers/english-puzzle/paintings/level5";
import level6 from "@/helpers/english-puzzle/paintings/level6";
import constants from "@/helpers/english-puzzle/constants";

const LEVELS = [level1, level2, level3, level4, level5, level6];

export default class Painting {
  constructor(level, round) {
    this.baseUrl = constants.BASE_PAINTINGS_URL;
    this.levels = LEVELS;
    this.level = level;
    this.round = round;
  }

  getPainting() {
    const levelPainting = { ...this.levels[this.level].find((item) => item.id === this.round) };
    levelPainting.imageSrc = `${this.baseUrl}${levelPainting.imageSrc}`;
    levelPainting.cutSrc = `${this.baseUrl}${levelPainting.cutSrc}`;
    return levelPainting;
  }
}
