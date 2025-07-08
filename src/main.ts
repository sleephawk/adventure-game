import "./style.scss";
import { SceneArr } from "./Chapters/Chapter 1/scenes-1";

console.log(ChapterArr[0]);

//Query Selectors:

export const gameZone =
  (document.getElementById("game-zone") as HTMLDivElement) || null;
export const textZone =
  (document.getElementById("text-zone") as HTMLParagraphElement) || null;

//Null Check
if (!gameZone || !textZone) {
  throw new Error(`Missing HTML div elements - failed to import`);
}

//Game opening logic
