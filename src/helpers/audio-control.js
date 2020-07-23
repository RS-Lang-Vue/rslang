import config from "@/config/config";

export default class AudioControl {
  constructor() {
    this.player = new Audio();
    this._isAudioActive = false;
    this.tracks = [];
    this.init();
  }

  init() {
    this.setHandlerLoaded();
    this.setHandlerPause();
    this.setHandlerEnd();
  }

  setHandlerLoaded() {
    const loadded = () => {
      this.player.play();
      this.isAudioActive = true;
    };
    this.player.addEventListener("loadeddata", loadded);
  }

  setHandlerPause() {
    const end = () => {
      this.isAudioActive = false;
    };
    this.player.addEventListener("pause", end);
  }

  setHandlerEnd() {
    const end = () => {
      if (this.tracks.length === 0) {
        this.isAudioActive = false;
      } else {
        this.player.src = this.tracks.shift();
      }
    };
    this.player.addEventListener("ended", end);
  }

  play(url) {
    let correctUrl = "";
    if (/^files/i.test(url)) {
      correctUrl = `${config.dataBaseUrl}${url}`;
    } else {
      correctUrl = `data:audio/mpeg;base64,${url}`;
    }
    if (this.tracks.length === 0 || correctUrl !== this.tracks[this.tracks.length - 1]) {
      this.tracks.push(correctUrl);
    }

    if (!this.isPlaying()) {
      this.player.src = this.tracks.shift();
    }
  }

  forcePlay(url) {
    this.stop();
    this.play(url);
  }

  stop() {
    if (this.isPlaying()) {
      this.player.pause();
      this.player.currentTime = 0;
    }
    this.tracks = [];
  }

  isPlaying() {
    return (
      this.player.currentTime > 0 &&
      !this.player.paused &&
      !this.player.ended &&
      this.player.readyState > 2
    );
  }

  get isAudioActive() {
    return this._isAudioActive;
  }

  set isAudioActive(value) {
    this._isAudioActive = value;
  }
}
