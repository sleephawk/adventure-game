import scenes from "../../data/parse-csv";
import type { RawScene, Scene } from "../../types";

const createScene = (scene: RawScene) => {
  return {
    sceneId: scene.sceneId,
    prevId: scene.prevId,
    text: scene.text,
    options: [
      {
        text: scene.option1Txt,
        nextId: scene.option1NextId,
      },
      {
        text: scene.option2Txt,
        nextId: scene.option2NextId,
      },
      {
        text: scene.option3Txt,
        nextId: scene.option3NextId,
      },
    ],
    token: scene.token, //need to refactor to paramtererise these creation functions
    altNum: scene.altNum, //need to refactor to paramtererise these creation functions
  };
};

const populateScene = (scenesData: any): Scene[] => {
  //takes the scene data as a parameter
  return scenesData.data.map((sceneData: any) => {
    //returns the scene data array and maps each iteration
    return createScene(sceneData); // this is the callback so the callback takes each object in the array and passes through create
  });
};

export const chapters = populateScene(scenes);
