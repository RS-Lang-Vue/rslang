export default class Timer {
  constructor(time = 0) {
    this.time = time;
    this.pause = false;
    this.finished = false;
  }
}
