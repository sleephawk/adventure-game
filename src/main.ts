import "./style.scss";

export const gameZone = document.getElementById("game-zone") as HTMLDivElement || null;
export const textZone = document.getElementById("text-zone") as HTMLParagraphElement || null;

if(!gameZone || !textZone) {
  throw new Error(`Missing HTML div elements - failed to import`);
}


document.addEventListener("DOMContentLoaded", () => {
  const opening: string = `It's a sunday morning, not unfamiliar. The breeze
    taps the prints of your toes with a refreshing chill, welcome after
    a night of squirming in the climate crisis heat in your fanless room.
    Birds are chittering, the sun is spreading, but you feel a days worth 
    of weight still resting under your eyelids. do you:`;
    textZone.textContent = 
  // domBuilder.setUpChoices("go back to bed", "get up and stretch");
});
