export default class StatisticsItem {
  constructor(level, round, results) {
    this.date = Date.now();
    this.level = level;
    this.round = round;
    this.results = results;
  }
}
