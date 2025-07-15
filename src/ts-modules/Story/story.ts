import scenes from "../../data/parse-csv";
import type { RawScene, Scene } from "../../types";

const createScene = (scene: RawScene) => {
  return {
    sceneId: scene.sceneId,
    areaId: scene.areaId,
    prevId: scene.prevId,
    animation: scene.animation,
    text: scene.text,
    options: [
      {
        id: scene.option1Id,
        text: scene.option1Txt,
        nextId: scene.option1NextId,
      },
      {
        id: scene.option2Id,
        text: scene.option2Txt,
        nextId: scene.option2NextId,
      },
      {
        id: scene.option3Id,
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

export const story = populateScene(scenes);

const createAreaArray = (n: number) => {
  return Object.values(story)
    .filter((st) => st.areaId === n)
    .map((st) => st.sceneId);
}; //creates arrays populated with scene ids for each area

export const [area1SceneIds, area2SceneIds, area3SceneIds, area4SceneIds] =
  Array.from({ length: 4 }, (_, i) => createAreaArray(i + 1));

const createSpecialSceneArray = () => {
  return Object.values(story)
    .filter((st) => st.animation == "y")
    .map((st) => st.sceneId);
}; //creates arrays populated with scene ids for animation scenes

export const specialScenesArr = createSpecialSceneArray();
