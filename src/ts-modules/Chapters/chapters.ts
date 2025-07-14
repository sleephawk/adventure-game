import scenes from "../../data/parse-csv";
import type { RawScene, Scene } from "../../types";
import gameState from "../game-state";

const createScene = (scene: RawScene) => {
  return {
    sceneId: scene.sceneId,
    areaId: scene.areaId,
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
  };
};

const populateScene = (scenesData: any): Scene[] => {
  return scenesData.data.map((sceneData: any) => {
    return createScene(sceneData);
  });
};

export const chapters = populateScene(scenes);

const createAreaArray = (n: number) => {
  return Object.values(chapters)
    .filter((ch) => ch.areaId === n)
    .map((ch) => ch.sceneId);
};

export const [area1SceneIds, area2SceneIds, area3SceneIds, area4SceneIds] =
  Array.from({ length: 4 }, (_, i) => createAreaArray(i + 1));
