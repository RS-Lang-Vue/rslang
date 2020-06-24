import config from "@/config/config";

export default class AudioControl {
  constructor() {
    this.player = new Audio();
    this._isAudioActive = false;
    this.init();
  }

  init() {
    this.setHandlerLoaded();
    this.setHandlersEndAndPause();
  }

  setHandlerLoaded() {
    const loadded = () => {
      this.player.play();
      this.isAudioActive = true;
    };
    this.player.addEventListener("loadeddata", loadded);
  }

  setHandlersEndAndPause() {
    const end = () => {
      this.isAudioActive = false;
    };
    this.player.addEventListener("ended", end);
    this.player.addEventListener("pause", end);
  }

  play(url) {
    this.player.src = `${config.audioBaseUrl}${url}`;
  }

  stop() {
    const isPlaying =
      this.player.currentTime > 0 &&
      !this.player.paused &&
      !this.player.ended &&
      this.player.readyState > 2;
    if (isPlaying) {
      this.player.pause();
      this.player.currentTime = 0;
    }
  }

  get isAudioActive() {
    return this._isAudioActive;
  }

  set isAudioActive(value) {
    this._isAudioActive = value;
  }
}
