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

export const gameZone = document.getElementById("game-zone") as HTMLDivElement;
export const textZone =
  (document.getElementById("text-zone") as HTMLParagraphElement) || null;

const quoteZone =
  (document.getElementById("quote-zone") as HTMLDivElement) || null;

const btnZone = (document.getElementById("btn-zone") as HTMLDivElement) || null;

const begin = (document.getElementById("begin") as HTMLButtonElement) || null;
const title = (document.getElementById("title") as HTMLHeadingElement) || null;

export const gameButtons = document.querySelectorAll<HTMLElement>(
  ".game-zone__btn-zone--btn"
);

//Null Check
if (!gameZone || !textZone || !quoteZone || !btnZone || !gameButtons) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

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

//begin button (game opening)
begin.addEventListener("click", () => {
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
    if (window.visualViewport && window.visualViewport.width > 1720) {
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
//button handler chapter 1
