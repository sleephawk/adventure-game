// import gameState from "./game-state";
import { gameButtons } from "../main";

// // const scoredScenes = {
// //   ocean: 2,
// // };

const music = new Audio("src/Assets/Audio/Effects/waves.wav");
const folie = new Audio("src/Assets/Audio/Effects/waves.wav");
const btn1 = new Audio("src/Assets/Audio/Effects/btn1.wav");
const btn2 = new Audio("src/Assets/Audio/Effects/btn2.wav");
const btn3 = new Audio("src/Assets/Audio/Effects/btn3.wav");
export const audioSources = [music, folie, btn1, btn2, btn3];

document.addEventListener("DOMContentLoaded", () => {
  gameButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const randomCalm = Math.floor(Math.random() * 3);
      [btn1, btn2, btn3][randomCalm].play();
    });
  });
});
