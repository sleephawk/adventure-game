import "./style.scss";
import { chapter1 } from "./Chapters/chapter1";
import { scenes } from "./data/parse-csv";

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
    begin.style.display = "none";
    title.style.display = "none";
  }, 1000);
  setTimeout(() => {
    quoteZone.style.opacity = "1"; // fade in quote
  }, 1000);
  setTimeout(() => {
    quoteZone.style.opacity = "0"; // fade out quote
  }, 10000);
  // setTimeout(() => {
  //   title.textContent = "Chapter 1"; // cut in Chapter 1
  //   title.style.display = "block";
  //   title.style.opacity = "1";
  // }, 11000);
  // setTimeout(() => {
  //   title.style.opacity = "0"; // fade out Chapter 1
  // }, 13000);
  setTimeout(() => {
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
      textZone.innerText = chapter1[option.nextSceneId].text;
      btn1.innerText = chapter1[option.nextSceneId].options[0].text;
      btn2.innerText = chapter1[option.nextSceneId].options[1].text;
      btn3.innerText = chapter1[option.nextSceneId].options[2].text;
    }
  }
  setTimeout(() => {
    textZone.style.opacity = "1";
    btnZone.style.opacity = "1";
  }, 200);

  //the button should know where to look based on the chapter number
  //if it's 1, the button should look through chapter1
};

//currently only adds event listener one

// console.log(chapter1[2]);
