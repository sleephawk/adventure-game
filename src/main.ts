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

//Null Check
if (!gameZone || !textZone || !quoteZone || !btnZone) {
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

const toggleDisplay = (...els: HTMLElement[]): void => {
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
    gameZone.style.flexDirection = "row";
    gameZone.style.gap = "50px";
  }, 11000);
});

document.querySelectorAll(".game-zone__btn-zone--btn").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    //for TS make sure the event target is a button
    if (!(e.target instanceof HTMLButtonElement)) return;

    const button = e.target;
    console.log(button);
    textZone.style.opacity = "0";
    btnZone.style.opacity = "0";

    setTimeout(() => {
      const option = chapters[gameState.sceneNumber].options.find(
        (opt) => opt.text === button.innerText
      ); // finds the option array that matches the text in the current button
      //within the chapters object (needs new name)
      console.log(chapters[0].options);
      if (option) {
        const nextScene = option.nextId;
        console.log(`Next scene to go to is ${nextScene}`);
        if (nextScene.toString().includes(",")) {
          setTimeout(function rollDice() {
            console.log(rollDiceAndDecidePath(option));
            const randomIndex = rollDiceAndDecidePath(option);
            console.log(randomIndex);
            setUpNextScene(randomIndex);
            textZone.style.opacity = "1"; //may be able to refactor
            btnZone.style.opacity = "1";
          }, 1000); // may be able to refactor this
          return;
        } else if (nextScene.toString().includes("&")) {
          const preludeSceneID = getIDForPreludeScene(option);
          console.log(getIDForPreludeScene(option));
          setUpNextScene(preludeSceneID);
          textZone.style.transform = "translateX(90px)";
          textZone.classList.add("fade-out");
          setTimeout(() => {
            textZone.style.transform = "unset";
            title.style.opacity = "1";
          }, 10000);
        } else {
          setUpNextScene(nextScene as number);
          btnZone.style.opacity = "1";
        }
      }
      textZone.style.opacity = "1";
    }, 700);
  })
); //button handler chapter 1
