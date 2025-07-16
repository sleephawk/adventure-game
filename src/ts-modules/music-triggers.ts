import { gameButtons } from "../main";
import gameState from "./game-state";
import { sleeper } from "../main";

const music = new Audio();
const folie = new Audio();
const btn1 = new Audio("src/Assets/Audio/Effects/btn1.wav");
const btn2 = new Audio("src/Assets/Audio/Effects/btn2.wav");
const btn3 = new Audio("src/Assets/Audio/Effects/btn3.wav");
export const audioSources = [music, folie, btn1, btn2, btn3];
const muteButton = document.querySelector<HTMLImageElement>("#mute-button");

if (!muteButton) {
  throw new Error("Could not obtain mute button element");
}
const standardVolume = 0.2;

const resetVolumeToStandard = async (): Promise<void> => {
  audioSources.forEach((a) => {
    a.volume = standardVolume;
  });
};
document.addEventListener("DOMContentLoaded", () => {
  resetVolumeToStandard();
});

const gameTriggers: { [key: number]: [HTMLAudioElement, string, string] } = {
  1: [music, "src/Assets/Audio/Music/progress.mp3", "win reincarnated"],
  2: [music, "src/Assets/Audio/Music/theonewhowalksthevoid.mp3", "win staying"],
  43: [music, "src/Assets/Audio/Music/progress.mp3", "win reincarnated"],
  44: [
    music,
    "src/Assets/Audio/Music/theonewhowalksthevoid.mp3",
    "win staying",
  ],
  52: [folie, "src/Assets/Audio/Effects/waves.wav", "ocean tide"],
};

document.addEventListener("DOMContentLoaded", () => {
  gameButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const randomCalm = Math.floor(Math.random() * 3);
      [btn1, btn2, btn3][randomCalm].play();
    });
  });
});

const fadeOutSound: Function = async (
  sound: HTMLAudioElement
): Promise<void> => {
  while (sound.volume > 0.01) {
    sound.volume -= 0.008;
    console.log(sound.volume);
    await sleeper(100);
  }
  sound.pause();
  sound.currentTime = 0;
};

const findCurrentlyPlaying = (): HTMLAudioElement | null => {
  if (!music.paused) return music;
  else if (!folie.paused) return folie;
  else return null;
};

document.addEventListener("DOMContentLoaded", () => {
  gameButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const trigger = gameTriggers[gameState.sceneNumber];
      if (findCurrentlyPlaying()) {
        const sound = findCurrentlyPlaying();
        await fadeOutSound(sound);
      }
      if (trigger) {
        await resetVolumeToStandard();
        const audioFile = trigger[0];
        const source = trigger[1];
        audioFile.src = source;
        audioFile.play();
      }
    });
  });
});

const toggleMuteSound = () => {
  audioSources.forEach((a) => {
    a.volume === 0 ? (a.volume = standardVolume) : (a.volume = 0);
  });
};

const toggleMuteVolumeIcon = () => {
  audioSources.forEach((a) => {
    a.volume === 0
      ? (muteButton.src = "src/Assets/Icons/mute-icon.png")
      : (muteButton.src = "src/Assets/Icons/volume-icon.png");
  });
};

muteButton.addEventListener("click", () => {
  console.log("mute button has been clicked");
  toggleMuteSound();
  toggleMuteVolumeIcon();
});
