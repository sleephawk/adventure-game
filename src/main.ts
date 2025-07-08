import "./style.scss";
import { scenes } from "./data/parse-csv";

console.log(scenes);
//Query Selectors:

export const gameZone =
  (document.getElementById("game-zone") as HTMLDivElement) || null;
export const textZone =
  (document.getElementById("text-zone") as HTMLParagraphElement) || null;

const quoteZone = document.getElementById("quote-zone");

const begin = (document.getElementById("begin") as HTMLButtonElement) || null;
const title = (document.getElementById("title") as HTMLHeadingElement) || null;

//Null Check
if (!gameZone || !textZone || !quoteZone) {
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
    quoteZone.style.opacity = "1";
  }, 1000);
  setTimeout(() => {
    quoteZone.style.opacity = "0";
  }, 10000);
  setTimeout(() => {
    title.textContent = "Chapter 1";
    title.style.display = "block";
    title.style.opacity = "1";
  }, 11000);
  setTimeout(() => {
    title.style.opacity = "0";
  }, 13000);
});

const btnHandler: Function = (): void => {};
