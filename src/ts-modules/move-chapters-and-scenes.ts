import gameState from "./game-state";
import { gameButtons, textZone } from "../main";
import { chapters } from "./Chapters/chapters";
import type { Option } from "../types";
//Takes the specific scenario in which the path is preluding a new chapter or ending and handles the pathway correctly.

export const getIDForPreludeScene: Function = (
  o: Option
): number | undefined => {
  console.log("This operation is running");
  if (!o) {
    throw new Error(`Can't read option passed as parameter`);
  }
  if (o.nextId.toString().includes("&")) {
    const preludeScene = o.nextId.toString().split("&").join("");
    return Number(preludeScene);
  }
};

const btn1 = document.querySelector<HTMLButtonElement>("#btn-1");
const btn2 = document.querySelector<HTMLButtonElement>("#btn-2");
const btn3 = document.querySelector<HTMLButtonElement>("#btn-3");

if (!btn1 || !btn2 || !btn3) {
  throw new Error("Buttons could not be found");
}

export const setUpNextScene = (i: number) => {
  textZone.innerText = chapters[i].text;
  btn1.innerText = chapters[Number(i)].options[0].text;
  btn2.innerText = chapters[Number(i)].options[1].text;
  btn3.innerText = chapters[Number(i)].options[2].text;
  gameButtons.forEach((btn) => {
    btn.style.display = "block";
    if (!btn.innerText) {
      btn.style.display = "none";
    }
  });
  gameState.sceneNumber = Number(i);
};
