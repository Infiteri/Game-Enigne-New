/**
 * Requires user interaction first
 */

export default class AudioAssets {
  constructor() {
    this.audios = [];
  }

  Play(id) {
    this.audios.forEach(a => {
      if (a.id === id) {
        const audio = a.audio;
        audio.play();
      }
    });
  }

  Add(id = "NoIdPassed", src) {
    const audio = new Audio(src);
    this.audios.push({
      id,
      audio,
    });
  }
}
