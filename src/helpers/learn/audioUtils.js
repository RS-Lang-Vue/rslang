// May need to be deleted

import config from "@/config/config";

const playAudioSequence = (arraySrcAudio) => {
  const sounds = arraySrcAudio;
  if (sounds.length > 0) {
    const audio = new Audio();
    audio.src = `${config.audioBaseUrl}${sounds[0]}`;
    audio.currentTime = 0;
    audio.play();
    sounds.shift();
    audio.addEventListener("ended", () => playAudioSequence(sounds));
  }
};

export default playAudioSequence;
