import gameState from "./game-state";
import * as DOMEl from "../main";
import { chapters } from "./Chapters/chapters";
//Takes the specific scenario in which the path is preluding a new chapter or ending and handles the pathway correctly.

export const getIDForPreludeScene: Function = (
  o: Option
): number | undefined => {
  console.log("This operation is running");
  if (!o) {
    throw new Error(`Can't read option passed as parameter`);
  }
  if (o.nextSceneId.toString().includes("&")) {
    const preludeScene = o.nextSceneId.toString().split("&").unshift();
    return Number(preludeScene);
  } else if (o.nextSceneId.toString().includes(">>")) {
    const preludeScene = o.nextSceneId.toString().split(">>").unshift();
    gameState.chapterNumber++;
    return Number(preludeScene);
  }
};

export const setUpNextScene = (i: number) => {
  DOMEl.textZone.innerText = chapters[i].text;
  DOMEl.btn1.innerText = chapters[Number(i)].options[0].text;
  DOMEl.btn2.innerText = chapters[Number(i)].options[1].text;
  DOMEl.btn3.innerText = chapters[Number(i)].options[2].text;
  gameState.sceneNumber = Number(i);
};
