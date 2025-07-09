import "./style.scss";
import { chapter1 } from "./Chapters/chapter1";
import { scenes } from "./data/parse-csv";
import { rollDiceAndDecidePath } from "./ts-modules/roll-dice";

// console.log(scenes.data[0].prevId);

//Query Selectors:

export const gameZone =
  (document.getElementById("game-zone") as HTMLDivElement) || null;
export const textZone =
  (document.getElementById("text-zone") as HTMLParagraphElement) || null;

const quoteZone =
  (document.getElementById("quote-zone") as HTMLDivElement) || null;

const btnZone = (document.getElementById("btn-zone") as HTMLDivElement) || null;
const btn1 = (document.getElementById("btn-1") as HTMLButtonElement) || null;
const btn2 = (document.getElementById("btn-2") as HTMLButtonElement) || null;
const btn3 = (document.getElementById("btn-3") as HTMLButtonElement) || null;

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
  }, 11000);
  document
    .querySelectorAll(".game-zone__btn-zone--btn")
    .forEach((btn) => btn.addEventListener("click", (e) => btnHandler(1, e))); //button handler chapter 1
});

//btn (choice/ option) handler
const btnHandler: Function = (chapter: number, e: Event): void => {
  //for TS make sure the event target is a button
  if (!(e.target instanceof HTMLButtonElement)) return;
  const button = e.target;
  textZone.style.opacity = "0";
  btnZone.style.opacity = "0";
  if (chapter === 1) {
    const option = chapter1[0].options.find(
      (opt) => opt.text === button.innerText
    );
    if (option) {
      console.log(option.nextSceneId);
      if (typeof option.nextSceneId === "string") {
        setTimeout(function rollDice() {
          textZone.innerText = chapter1[rollDiceAndDecidePath(option)].text;
          btn2.innerText =
            chapter1[rollDiceAndDecidePath(option)].options[0].text;
          btn1.innerText =
            chapter1[rollDiceAndDecidePath(option)].options[1].text;
          btn3.innerText =
            chapter1[rollDiceAndDecidePath(option)].options[2].text;
          textZone.style.opacity = "1"; //may be able to refactor
          btnZone.style.opacity = "1";
        }, 5000); // may be able to refactor this
        return;
      }

      textZone.innerText = chapter1[option.nextSceneId as number].text;
      btn1.innerText = chapter1[option.nextSceneId as number].options[0].text;
      btn2.innerText = chapter1[option.nextSceneId as number].options[1].text;
      btn3.innerText = chapter1[option.nextSceneId as number].options[2].text;
    }
    setTimeout(() => {
      textZone.style.opacity = "1";
      btnZone.style.opacity = "1";
    }, 200);
  }
};
