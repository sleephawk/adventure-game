import "./style.scss";
import { chapters } from "./ts-modules/Chapters/chapters";
// import { endings } from "./ts-modules/Chapters/endings";
import {
  getIDForPreludeScene,
  setUpNextScene,
} from "./ts-modules/move-chapters-and-scenes";
import rollDiceAndDecidePath from "./ts-modules/roll-dice";
import gameState from "./ts-modules/game-state";

// console.log(scenes.data[0].prevId);

//Query Selectors:

export const gameZone = document.querySelector<HTMLDivElement>("#game-zone");
export const textZone =
  document.querySelector<HTMLParagraphElement>("#text-zone");
const quoteZone = document.querySelector<HTMLDivElement>("#quote-zone");

const btnZone = document.querySelector<HTMLDivElement>("#btn-zone");

const begin = document.querySelector<HTMLButtonElement>("#begin");
const title = document.querySelector<HTMLHeadElement>("#title");

export const gameButtons = document.querySelectorAll<HTMLElement>(
  ".game-zone__btn-zone--btn"
);

const soundSettings =
  document.querySelector<HTMLImageElement>("#sound-settings");
const homeButton = document.querySelector<HTMLImageElement>("#home-button");

//Null Check
if (
  !gameZone ||
  !textZone ||
  !quoteZone ||
  !btnZone ||
  !gameButtons ||
  !soundSettings ||
  !homeButton ||
  !begin ||
  !title
) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

//------------------------------------------------------Audio controls
const audioContext = new AudioContext();
const audio = new Audio("src/Assets/progress is progress (in progress).mp3"); //fix audio name and location
console.log(audioContext);
const source = audioContext.createMediaElementSource(audio);

source.connect(audioContext.destination);

const standardVolume = 0.2;
document.addEventListener("DOMContentLoaded", () => {
  audio.volume = standardVolume;
});

const toggleMuteSound = () => {
  console.log(`volume is ${audio.volume}`);
  audio.volume === 0 ? (audio.volume = standardVolume) : (audio.volume = 0);
};

const toggleMuteVolumeIcon = () => {
  audio.volume === 0
    ? (soundSettings.src = "src/Assets/Icons/mute-icon.png")
    : (soundSettings.src = "src/Assets/Icons/volume-icon.png");
};

soundSettings.addEventListener("click", () => {
  console.log("mute button has been clicked");
  toggleMuteSound();
  toggleMuteVolumeIcon();
});

//Event Handlers

// const createTimeOut = (
//   htmlElement: HTMLElement,
//   timer: number,
//   ...otherElements: HTMLElement[]
// ) => {
//   setTimeout(() => {
//     htmlElement.style.opacity = "";
//     //
//   }, timer);
// };

//----------------------------------------------------------Game state functions
const toggleVisibility = (...els: HTMLElement[]): void => {
  els.forEach((el) => {
    window.getComputedStyle(el).opacity === "0"
      ? (el.style.opacity = "1")
      : (el.style.opacity = "0");
  });
};

export const toggleDisplay = (...els: HTMLElement[]): void => {
  els.forEach((el) => {
    window.getComputedStyle(el).display === "none"
      ? (el.style.display = "flex")
      : (el.style.display = "none");
  });
};

const resetTrackers: Function = (): void => {
  gameState.sceneNumber = 0;
  gameState.areaTracker = 0;
};

//----------------------------------------Opening button
begin.addEventListener("click", () => {
  if (audioContext.state === "suspended") audioContext.resume();
  audio.play().catch((err) => {
    console.warn("playback failed", err);
  });
  toggleVisibility(begin, title);
  setTimeout(() => {
    toggleDisplay(quoteZone, begin, title);
  }, 1000);
  setTimeout(() => {
    toggleVisibility(quoteZone);
  }, 1200);
  setTimeout(() => {
    toggleVisibility(quoteZone);
  }, 10000);
  setTimeout(() => {
    toggleDisplay(quoteZone, textZone, btnZone);
    toggleVisibility(textZone, btnZone);
    if (window.visualViewport && window.visualViewport.width > 1080) {
      gameZone.style.flexDirection = "row";
      gameZone.style.gap = "50px";
    }
  }, 11000);
});

gameButtons.forEach((btn) => {
  if (!btn.innerText) {
    btn.style.display = "none";
  }
  btn.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const button = e.target;
    toggleVisibility(textZone, btnZone);
    console.log("this button has been clicked");
    setTimeout(() => {
      const option = chapters[gameState.sceneNumber].options.find(
        (opt) => opt.text === button.innerText
      );
      console.log(`The current scene is ${gameState.sceneNumber}`);
      console.log("option:", option);
      /*----------------------------*/
      if (option) {
        const nextScene = option.nextId;
        console.log(`Next scene to go to is ${nextScene}`);
        /*----------------------------*/
        /*----------------------------*/
        if (nextScene.toString().includes(",")) {
          setTimeout(function rollDice() {
            console.log(rollDiceAndDecidePath(option));
            const randomIndex = rollDiceAndDecidePath(option);
            console.log(randomIndex);
            setUpNextScene(randomIndex);
            toggleVisibility(textZone, btnZone);
          }, 1000); // may be able to refactor this
          return;
          /*----------------------------*/
        } else if (nextScene.toString().includes("&")) {
          const preludeSceneID = getIDForPreludeScene(option);
          console.log(getIDForPreludeScene(option));
          setUpNextScene(preludeSceneID);
          textZone.style.transform = "translateX(90px)";
          textZone.classList.add("fade-out");
          setTimeout(() => {
            textZone.style.transform = "unset";
            toggleVisibility(title);
          }, 10000);
          /*----------------------------*/
        } else {
          setUpNextScene(nextScene as number);
          btnZone.style.opacity = "1"; //absolutely ensures opacity is on
        }
      }
      textZone.style.opacity = "1";
    }, 700);
  });
});
