import { buttonEventHandler } from "./main";

export const createButton = (text: string): HTMLButtonElement => {
  const btn: HTMLButtonElement = document.createElement("button");
  btn.textContent = text;
  btn.addEventListener("click", buttonEventHandler);
  return btn;
};
