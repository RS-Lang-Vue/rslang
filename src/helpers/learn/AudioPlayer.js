import config from "@/config/config";

export default class AudioPlayer {
  constructor() {
    this.player = new Audio();
  }

  play(url) {
    this.player.src = `${config.audioBaseUrl}${url}`;
    this.player.play();
  }
}
