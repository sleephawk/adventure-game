import "./style.scss";
// import { endings } from "./ts-modules/Chapters/endings";
import rollDiceAndDecidePath from "./ts-modules/roll-dice";
import gameState from "./ts-modules/game-state";
import {
  area1SceneIds,
  area2SceneIds,
  area3SceneIds,
  area4SceneIds,
  specialScenesArr,
  story,
  urlArray,
} from "./ts-modules/Story/story";
import type { Option } from "./types";

//Query Selectors:

export const gameZone = document.querySelector<HTMLDivElement>("#game-zone");
const displayZone =
  document.querySelector<HTMLParagraphElement>("#display-zone");
const displayText = document.querySelector<HTMLParagraphElement>("#dsp-text");
const quoteZone = document.querySelector<HTMLDivElement>("#quote-zone");

const btnZone = document.querySelector<HTMLDivElement>("#btn-zone");

const nav = document.querySelector("nav");
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
  !displayZone ||
  !quoteZone ||
  !btnZone ||
  !gameButtons ||
  !soundSettings ||
  !homeButton ||
  !begin ||
  !title ||
  !nav ||
  !displayText
) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

const sleeper = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
//------------------------------------------------------Audio controls
const audioContext = new AudioContext();
const audio = new Audio("src/Assets/Audio/Effects/waves.wav");
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
//----------------------------------------------------------Game state functions
const changeOpacityValue = (n: number, ...els: HTMLElement[]): void => {
  els.forEach((el) => {
    el.style.opacity = `${n}`;
  });
};

const changeSceneColours = (): void => {
  const sky = " #fcfbc9";
  const sea = " #00edfe";
  const forest = " #85de9fff";
  const red = "red";
  const newColour = [sky, sea, forest, red][gameState.areaTracker - 1];
  displayZone.style.boxShadow = "0px 0px 30px " + newColour;
  gameButtons.forEach((b) => {
    b.style.boxShadow = "0px 0px 30px " + newColour;
  });
};

const changeArea = async () => {
  console.log(gameState.sceneNumber);
  if (area1SceneIds.includes(gameState.sceneNumber)) {
    gameState.areaTracker = 1;
  } else if (area2SceneIds.includes(gameState.sceneNumber)) {
    gameState.areaTracker = 2;
    console.log("Im in area2");
  } else if (area3SceneIds.includes(gameState.sceneNumber)) {
    gameState.areaTracker = 3;
    console.log("Im in area3");
  } else if (area4SceneIds.includes(gameState.sceneNumber)) {
    gameState.areaTracker = 4;
  }
};

export const changeDisplayValue = (
  value: string,
  ...els: HTMLElement[]
): void => {
  els.forEach((el) => {
    el.style.display = value;
  });
};

const displayAnimation = async (url: string, position: string) => {
  displayZone.innerText = "";
  displayZone.style.backgroundImage = `url(${url})`;
  displayZone.style.backgroundSize = "cover";
  displayZone.style.backgroundRepeat = "no-repeat";
  displayZone.style.backgroundPosition = position;
  await sleeper(2000);
  displayZone.style.backgroundImage = "none";
};

const resetTrackers: Function = (): void => {
  gameState.sceneNumber = 0;
  gameState.areaTracker = 0;
};

const setUpNextScene = async (n: number) => {
  gameState.sceneNumber = Number(n);
  const newScene = gameState.sceneNumber;
  if (specialScenesArr.includes(newScene)) {
    displayZone.innerText = "";
    const urlIdx = specialScenesArr.indexOf(newScene);
    await displayAnimation(urlArray[urlIdx], "center");
  }
  displayZone.innerText = story[n].text;
  gameButtons.forEach((btn, i) => {
    const currentScene = story[Number(n)].options[i];
    btn.innerText = currentScene.text;
    btn.dataset.optionId = `${currentScene.id}`;
    console.log(currentScene.id);
    console.log(`The button at index ${i} id is ${btn.dataset.optionId}`);
    btn.style.display = "block";
    if (!btn.innerText) {
      btn.style.display = "none";
    }
  });

  changeArea();
  console.log(`We're in scene ${newScene}`);
  console.log(`We're in area ${gameState.areaTracker}`);
};

const getIDForPreludeScene: Function = async (o: Option): Promise<number> => {
  if (o.nextId === undefined) {
    throw new Error("option cannot read NextId for some reason.");
  }
  const preludeScene = o.nextId.split("&").join("");
  return Number(preludeScene);
};

const processSceneUI = async (button: HTMLButtonElement) => {
  console.log(
    `This is where I'm looking for the option id that matched the button id,`,
    story[gameState.sceneNumber].options
  );
  console.log(
    `This is the first option value`,
    story[gameState.sceneNumber].options[0].id
  );
  const id = button.dataset.optionId;
  let option = story[gameState.sceneNumber].options.find((opt) => opt.id == id);
  if (!option) {
    throw new Error("Couldnt find option");
  } else if (option.nextId === null) {
    option.nextId = "1";
    gameState.sceneNumber = 1;
  }
  console.log(`The current scene is ${gameState.sceneNumber}`);

  /*----------------------------*/
  if (option) {
    const nextScene = option.nextId;
    console.log(`Next scene to go to is ${nextScene}`);
    /*----------------------------*/
    if (nextScene.toString().includes(",")) {
      const result = await rollDiceAndDecidePath(option);
      await setUpNextScene(result);
      changeOpacityValue(1, displayZone, btnZone);
      return;
      /*----------------------------*/
    } else if (nextScene.toString().includes("&")) {
      const preludeSceneID: number = await getIDForPreludeScene(option);
      await setUpNextScene(preludeSceneID);
      displayZone.classList.add("fade-out");
      /*----------------------------*/
    } else {
      await setUpNextScene(Number(nextScene));
      changeSceneColours();
      changeOpacityValue(1, btnZone); //absolutely ensures opacity is on
    }
  }
  changeOpacityValue(1, displayZone);
};

//----------------------------------------Opening button
begin.addEventListener("click", () => {
  if (audioContext.state === "suspended") audioContext.resume();
  audio.play().catch((err) => {
    console.warn("playback failed", err);
  });
  changeOpacityValue(0, begin, title);
  changeDisplayValue("none", quoteZone, begin, title); //to delete
  // setTimeout(() => {
  //   toggleDisplay(quoteZone, begin, title);
  // }, 1000);
  // setTimeout(() => {
  //   toggleVisibility(quoteZone);
  // }, 1200);
  // setTimeout(() => {
  //   toggleVisibility(quoteZone);
  // }, 10000);
  setTimeout(() => {
    changeDisplayValue("none", quoteZone);
    changeDisplayValue("flex", displayZone, btnZone);
    changeOpacityValue(1, displayZone, btnZone);
  }, 10 /*11000*/);
});

gameButtons.forEach((btn) => {
  if (!btn.innerText) {
    btn.style.display = "none";
  }
  btn.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const button = e.target;
    console.log(`Button with id ${btn.dataset.optionId}`);
    console.log(button);
    processSceneUI(button);
  });
});
