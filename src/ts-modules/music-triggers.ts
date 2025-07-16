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

export const standardVolume = 0.5;

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
  10: [music, "src/Assets/Audio/Music/leavingthememory.mp3", "opening"],
  14: [fx, "src/Assets/Audio/Effects/surround-laugh.wav", "laugh"],
  17: [fx, "src/Assets/Audio/Effects/caw.wav", "caw"],
  22: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  18: [fx, "src/Assets/Audio/Effects/caw-flap.wav", "caw-flap"],
  42: [music, "src/Assets/Audio/Music/progress.mp3", "win reincarnated"],
  43: [
    music,
    "src/Assets/Audio/Music/theonewhowalksthevoid.mp3",
    "win reincarnated",
  ],
  44: [
    music,
    "src/Assets/Audio/Music/theonewhowalksthevoid.mp3",
    "win staying",
  ],
  45: [music, "src/Assets/Audio/Music/darkwoods.wav", "win staying"],
  47: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  48: [music, "src/Assets/Audio/Music/allthebranches.wav", "loss"],
  49: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  50: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  51: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  52: [folie, "src/Assets/Audio/Effects/waves.wav", "ocean tide"],
  54: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
  56: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  57: [fx, "src/Assets/Audio/Effects/grunt.wav", "ocean tide"],
  58: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  60: [music, "src/Assets/Audio/Music/siren.wav", "siren song"],
  61: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
  64: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  65: [music, "src/Assets/Audio/Music/siren.wav", "siren song"],
  78: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  82: [folie, "src/Assets/Audio/Effects/underwater.wav", "underwater"],
  83: [folie, "src/Assets/Audio/Effects/waves.wav", "ocean tide"],
  85: [music, "src/Assets/Audio/Music/seawater.mp3", "boat ending"],
  87: [folie, "src/Assets/Audio/Effects/forest.wav", "walking"],
  88: [music, "src/Assets/Audio/Music/darkwoods.wav", "scary music"],
  89: [music, "src/Assets/Audio/Music/darkwoods.wav", "scary music"],
  93: [music, "src/Assets/Audio/Music/darkwoods.wav", "scary music"],
  95: [folie, "src/Assets/Audio/Effects/forest.wav", "walking"],
  96: [music, "src/Assets/Audio/Music/darkwoods.wav", "scary music"],
  90: [fx, "src/Assets/Audio/Effects/caw.wav", "caw"],
  100: [folie, "src/Assets/Audio/Effects/fire.wav", "fire"],
  101: [folie, "src/Assets/Audio/Effects/fire.wav", "fire"],
  102: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
  106: [fx, "src/Assets/Audio/Effects/run.wav", "run"],
  112: [music, "src/Assets/Audio/Music/allthebranches.mp3", "loss"],
  115: [music, "src/Assets/Audio/Effects/scary.wav", "loss"],
};

document.addEventListener("DOMContentLoaded", () => {
  gameButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const randomCalm = Math.floor(Math.random() * 3);
      [btn1, btn2, btn3][randomCalm].play();
    });
  });
});

export const fadeOutSound: Function = async (
  sound: HTMLAudioElement
): Promise<void> => {
  while (sound.volume > 0.01) {
    sound.volume -= 0.009;
    console.log(sound.volume);
    await sleeper(100);
  }
  sound.pause();
  sound.currentTime = 0;
  resetVolumeToStandard();
  console.log(`current volume is ${sound.volume}`);
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const trigger = gameTriggers[gameState.sceneNumber];

      if (trigger) {
        console.log(`I was triggered by ${trigger}`);

        const audioFile = trigger[0];
        const source = trigger[1];
        console.log(`current volume is ${audioFile.volume}`);
        audioFile.src = source;
        audioFile.play();
        audioFile.onended = () => {
          if (audioFile === music) {
            fadeOutSound(audioFile);
          }
        };
      } else {
        console.log("cant find sound");
      }
    });
  });
});
