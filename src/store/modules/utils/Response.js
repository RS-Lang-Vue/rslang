export default class {
  constructor(success, resultOrError) {
    this.success = success;
    this.result = success ? resultOrError : undefined;
    this.error = success ? "" : resultOrError;
  }
}
