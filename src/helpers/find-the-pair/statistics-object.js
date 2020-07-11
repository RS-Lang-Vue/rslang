class RoundResults {
  constructor() {
    this._success = [];
    this._out = [];
    this._time = "";
  }

  get success() {
    return this._success;
  }

  set success(value) {
    this._success.push(value);
  }

  get out() {
    return this._out;
  }

  set out(value) {
    this._out.push(value);
  }

  get time() {
    return this._time;
  }

  set time(value) {
    this._time = value;
  }

  getWordsId() {
    return {
      success: this.success.map((item) => item.id),
      out: this.out.map((item) => item.id),
      time: this.time,
    };
  }
}

export default RoundResults;
