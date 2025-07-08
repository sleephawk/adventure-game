import "./style.scss";
import { scenes } from "./data/parse-csv";

console.log(scenes);
//Query Selectors:

export const gameZone =
  (document.getElementById("game-zone") as HTMLDivElement) || null;
export const textZone =
  (document.getElementById("text-zone") as HTMLParagraphElement) || null;

const quoteElements = document.querySelectorAll(".game-zone__quote");

const begin = (document.getElementById("begin") as HTMLButtonElement) || null;
const title = (document.getElementById("title") as HTMLHeadingElement) || null;

//Event Handlers

begin.addEventListener("click", () => {
  begin.style.opacity = "0";
  title.style.opacity = "0";
  setTimeout(() => {
    begin.style.display = "none";
    title.style.display = "none";
  }, 500);
  setTimeout(() => {
    quoteElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = "flex";
        el.style.opacity = "1";
        console.log(el);
      }
    });
  }, 500);
});

const btnHandler: Function = (): void => {};

//Null Check
if (!gameZone || !textZone) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

//Game opening logic
