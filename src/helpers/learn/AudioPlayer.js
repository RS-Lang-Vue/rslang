import config from "@/config/config";

export default class AudioPlayer {
  constructor() {
    this.player = new Audio();
    this._isAudioActive = false;
    this.player.addEventListener("ended", () => {
      this._isAudioActive = false;
    });
  }

  play(url) {
    this.player.src = `${config.audioBaseUrl}${url}`;
    this._isAudioActive = true;
    this.player.play();
  }

  stop() {
    this.player.pause();
    this.player.currentTime = 0;
  }

  get isAudioActive() {
    return this._isAudioActive;
  }

  playAudioSequence(arraySrcAudio) {
    const sounds = arraySrcAudio;
    if (sounds.length > 0 && !this._isAudioActive) {
      // todo interact play audio Sequence
      this.play(sounds[0]);
      sounds.shift();
      this.player.addEventListener("ended", () => {
        this.playAudioSequence(sounds);
      });
    }
  }
}
