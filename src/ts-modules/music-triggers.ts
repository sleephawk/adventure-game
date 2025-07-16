import { gameButtons } from "../main";
import gameState from "./game-state";
import { sleeper } from "../main";

const music = new Audio();
const folie = new Audio();
const fx = new Audio();
export const opening = new Audio();
const btn1 = new Audio("src/Assets/Audio/Effects/btn1.wav");
const btn2 = new Audio("src/Assets/Audio/Effects/btn2.wav");
const btn3 = new Audio("src/Assets/Audio/Effects/btn3.wav");
export const audioSources = [music, fx, folie, btn1, btn2, btn3];

export const standardVolume = 0.2;

const resetVolumeToStandard = async (): Promise<void> => {
  audioSources.forEach((a) => {
    a.volume = standardVolume;
    console.log(`current volume is ${a.volume}`);
  });
};
document.addEventListener("DOMContentLoaded", () => {
  resetVolumeToStandard();
});

const gameTriggers: { [key: number]: [HTMLAudioElement, string, string] } = {
  0: [music, "src/Assets/Audio/Music/opening.wav", "opening"],
  43: [music, "src/Assets/Audio/Music/progress.mp3", "win reincarnated"],
  44: [
    music,
    "src/Assets/Audio/Music/theonewhowalksthevoid.mp3",
    "win staying",
  ],
  52: [folie, "src/Assets/Audio/Effects/waves.wav", "ocean tide"],
  54: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
  60: [music, "src/Assets/Audio/Music/siren.wav", "siren song"],
  64: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
  65: [music, "src/Assets/Audio/Music/siren.wav", "siren song"],
  87: [folie, "src/Assets/Audio/Effects/forest.wav", "walking"],
  95: [folie, "src/Assets/Audio/Effects/forest.wav", "walking"],
  90: [folie, "src/Assets/Audio/Effects/caw.wav", "caw"],
  100: [music, "src/Assets/Audio/Effects/fire.wav", "fire"],
  102: [music, "src/Assets/Audio/Effects/fire.wav", "fire"],
  158: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
  161: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
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
  while (sound.volume > 0.05) {
    sound.volume -= 0.001;
    console.log(sound.volume);
    await sleeper(100);
  }
  sound.pause();
  sound.currentTime = 0;
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const trigger = gameTriggers[gameState.sceneNumber];

      if (trigger) {
        console.log(`I was triggered by ${trigger}`);
        const audioFile = trigger[0];
        const source = trigger[1];
        audioFile.src = source;
        audioFile.play();
        await sleeper(20000);
        fadeOutSound(audioFile);
      }
    });
  });
});
