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

const gameTriggers: { [key: number]: [HTMLAudioElement, string, string] } = {
  43: [music, "src/Assets/Audio/Music/progress.mp3", "win reincarnated"],
  44: [
    music,
    "src/Assets/Audio/Music/theonewhowalksthevoid.mp3",
    "win staying",
  ], // need to fix bounce
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
document.addEventListener("DOMContentLoaded", () => {
  gameButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const trigger = gameTriggers[gameState.sceneNumber];
      if (trigger) {
        trigger[0].src = trigger[1];
        trigger[0].play();
        await sleeper(20000);
        while (trigger[0].volume > 0.01) {
          trigger[0].volume -= 0.01;
          console.log(trigger[0].volume);
          await sleeper(100);
        }
        trigger[0].pause();

        trigger[0].currentTime = 0;
      }
    });
  });
});

const standardVolume = 0.2;
document.addEventListener("DOMContentLoaded", () => {
  audioSources.forEach((a) => {
    a.volume = standardVolume;
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
