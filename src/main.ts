import "./style.scss";
import { chapters } from "./ts-modules/Chapters/chapters";
import { endings } from "./ts-modules/Chapters/endings";
import {
  getIDForPreludeScene,
  setUpNextScene,
} from "./ts-modules/move-chapters-and-scenes";
import rollDiceAndDecidePath from "./ts-modules/roll-dice";
import gameState from "./ts-modules/game-state";

// console.log(scenes.data[0].prevId);

//Query Selectors:

export const gameZone =
  (document.getElementById("game-zone") as HTMLDivElement) || null;
export const textZone =
  (document.getElementById("text-zone") as HTMLParagraphElement) || null;

const quoteZone =
  (document.getElementById("quote-zone") as HTMLDivElement) || null;

const btnZone = (document.getElementById("btn-zone") as HTMLDivElement) || null;
export const btn1 =
  (document.getElementById("btn-1") as HTMLButtonElement) || null;
export const btn2 =
  (document.getElementById("btn-2") as HTMLButtonElement) || null;
export const btn3 =
  (document.getElementById("btn-3") as HTMLButtonElement) || null;

const begin = (document.getElementById("begin") as HTMLButtonElement) || null;
const title = (document.getElementById("title") as HTMLHeadingElement) || null;

//Null Check
if (!gameZone || !textZone || !quoteZone || !btnZone) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

//Event Handlers

//begin button (game opening)
begin.addEventListener("click", () => {
  begin.style.opacity = "0";
  title.style.opacity = "0";

  setTimeout(() => {
    quoteZone.style.display = "flex";
    begin.style.display = "none";
    title.innerText = `Chapter 1`;
  }, 1000);
  setTimeout(() => {
    title.style.opacity = "1";

    title.style.fontSize = "3rem";
    quoteZone.style.opacity = "1"; // fade in quote
  }, 1200);
  setTimeout(() => {
    title.style.opacity = "0";
    quoteZone.style.opacity = "0"; // fade out quote
  }, 10000);
  setTimeout(() => {
    title.style.display = "none";
    quoteZone.style.display = "none";
    textZone.style.display = "flex";
    textZone.style.opacity = "1";
    btnZone.style.display = "flex";
    btnZone.style.opacity = "1";
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

      if (option) {
        const nextScene = option.nextSceneId;
        console.log(`Next scene to go to is ${nextScene}`);
        if (nextScene.toString().includes("x")) {
          setTimeout(function rollDice() {
            console.log(rollDiceAndDecidePath(option));
            const randomIndex = rollDiceAndDecidePath(option);
            console.log(randomIndex);
            setUpNextScene(randomIndex);
            textZone.style.opacity = "1"; //may be able to refactor
            btnZone.style.opacity = "1";
          }, 1000); // may be able to refactor this
          return;
        } else if (
          nextScene.toString().includes("&") ||
          nextScene.toString().includes(">>")
        ) {
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
