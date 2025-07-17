import "./style.scss";
import decidePath from "./ts-modules/roll-dice";
import gameState from "./ts-modules/game-state";
import { audioSources, standardVolume } from "./ts-modules/music-triggers";
import {
  area1SceneIds,
  area2SceneIds,
  area3SceneIds,
  area4SceneIds,
  specialScenesArr,
  story,
  urlArray,
} from "./ts-modules/story";
import type { Option } from "./types";

//Query Selectors:

export const gameZone = document.querySelector<HTMLDivElement>("#game-zone");
const displayZone =
  document.querySelector<HTMLParagraphElement>("#display-zone");
const displayText = document.querySelector<HTMLParagraphElement>("#dsp-text");

const btnZone = document.querySelector<HTMLDivElement>("#btn-zone");

const nav = document.querySelector("nav");
const begin = document.querySelector<HTMLButtonElement>("#begin");
const title = document.querySelector<HTMLHeadElement>("#title");
const muteButton = document.querySelector<HTMLImageElement>("#mute-button");

export const gameButtons = document.querySelectorAll<HTMLElement>(
  ".game-zone__btn-zone--btn"
);

const homeButton = document.querySelector<HTMLImageElement>("#home-button");

//Null Check
if (
  !gameZone ||
  !displayZone ||
  !btnZone ||
  !gameButtons ||
  !homeButton ||
  !begin ||
  !title ||
  !nav ||
  !displayText ||
  !muteButton
) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

export const sleeper = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

//----------------------------------------------------------Game state functions
const changeOpacityValue = (n: number, ...els: HTMLElement[]): void => {
  els.forEach((el) => {
    el.style.opacity = `${n}`;
  });
};

const changeSceneColours = (colour?: string): void => {
  const sky = " #fcfbc9";
  const sea = " #00edfe";
  const forest = " #85de9fff";
  const red = "red";
  const newColour = colour
    ? colour
    : [sky, sea, forest, red][gameState.areaTracker - 1];
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

const toggleMuteSound = () => {
  audioSources.forEach((a) => {
    a.volume === 0 ? (a.volume = standardVolume) : (a.volume = 0);
  });
};

const toggleMuteVolumeIcon = () => {
  audioSources.forEach((a) => {
    a.volume === 0
      ? (muteButton.src = "./Assets/Icons/mute-icon.png")
      : (muteButton.src = "./Assets/Icons/volume-icon.png");
  });
};

muteButton.addEventListener("click", () => {
  console.log("mute button has been clicked");
  toggleMuteSound();
  toggleMuteVolumeIcon();
});

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
  gameButtons.forEach((btn) => {
    btn.dataset.optionID = "1";
  });
};

const resetDOMAfterEnding = () => {
  changeDisplayValue("flex", title, begin);
  changeDisplayValue("none", displayZone, btnZone);
  changeOpacityValue(1, title, begin);
  console.log("the game ended here");
  displayZone.classList.remove("fade-out");
  setUpNextScene(0);
  changeSceneColours("#586b79ff");
};

homeButton.addEventListener("click", () => {
  if (
    story[gameState.sceneNumber].options[0].nextId === "<l>" ||
    story[gameState.sceneNumber].options[0].nextId.includes("<w") ||
    story[gameState.sceneNumber].options[0].nextId.includes("&")
  ) {
    return;
  }
  resetTrackers();
  resetDOMAfterEnding();
  gameState.attemptTracker++;
});

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

const playEnding = async (): Promise<void> => {
  displayZone.classList.add("fade-out");
  const endingId = story[gameState.sceneNumber].options[0].nextId;
  console.log(endingId);
  if (endingId === "<l>") {
    const lossMessage = document.createElement("p");
    lossMessage.classList.add("message");
    gameState.attemptTracker++;
    lossMessage.textContent = `Do not fret. Where one path ends, another always begins. You will find your way.`;
    await sleeper(13000);
    gameZone.appendChild(lossMessage);
    await sleeper(3000);
    gameZone.removeChild(lossMessage);
  } else if (endingId.includes("<w")) {
    const winMessage = document.createElement("p");
    if (endingId === "<w1>" && !gameState.w1) gameState.w1++;
    else if (endingId === "<w2>" && !gameState.w2) gameState.w2++;
    else if (endingId === "<w3>" && !gameState.w3) gameState.w3++;
    else if (endingId === "<w4>" && !gameState.w4) gameState.w4++;
    else return;
    winMessage.classList.add("message");
    gameState.winTracker++;
    winMessage.textContent = `You found your way and passed on!
     You have won ${gameState.winTracker} times and have completed  
     ${gameState.w1 + gameState.w2 + gameState.w3 + gameState.w4}/4 
     possible winning endings.`;
    await sleeper(13000);
    gameZone.appendChild(winMessage);
    await sleeper(3000);
    gameZone.removeChild(winMessage);
  }
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
      const result = await decidePath(option, 33, 6);
      await setUpNextScene(result);
      changeOpacityValue(1, displayZone, btnZone);
      return;
      /*----------------------------*/
    } else if (nextScene.toString().includes("&")) {
      const preludeSceneID: number = await getIDForPreludeScene(option);
      await setUpNextScene(preludeSceneID);
      console.log(
        `prelude scene ID is ${preludeSceneID} and scene set up is ${gameState.sceneNumber}`
      );
      await playEnding();
      resetTrackers();
      resetDOMAfterEnding();
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
  changeOpacityValue(0, begin, title);
  changeDisplayValue("none", begin, title);
  setTimeout(() => {
    changeDisplayValue("flex", displayZone, btnZone);
    changeOpacityValue(1, displayZone, btnZone);
  }, 100);
});

gameButtons.forEach((btn) => {
  if (!btn.innerText) {
    btn.style.display = "none";
  }
  btn.addEventListener("click", (e) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const button = e.target;
    console.log(`The button clicked has an id of ${btn.dataset.optionId}`);
    processSceneUI(button);
  });
});
