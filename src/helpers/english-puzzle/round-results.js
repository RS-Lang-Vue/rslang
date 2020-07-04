class RoundResults {
  constructor() {
    this._success = [];
    this._skip = [];
  }

  get success() {
    return this._success;
  }

  set success(value) {
    this._success.push(value);
  }

  get skip() {
    return this._skip;
  }

  set skip(value) {
    this._skip.push(value);
  }

  getWordsId() {
    return {
      success: this.success.map((item) => item.id),
      skip: this.skip.map((item) => item.id),
    };
  }
}

export default RoundResults;
