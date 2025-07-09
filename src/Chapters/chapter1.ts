import { scenes } from "../data/parse-csv";

const createScene = (scene: number) => {
  return {
    id: scenes.data[scene].chapterId,
    fromId: scenes.data[scene].prevId,
    text: scenes.data[scene].text,
    options: [
      {
        text: scenes.data[scene].option1Txt,
        nextSceneId: scenes.data[scene].option1NextId,
      },
      {
        text: scenes.data[scene].option2Txt,
        nextSceneId: scenes.data[scene].option2NextId,
      },
      {
        text: scenes.data[scene].option3Txt,
        nextSceneId: scenes.data[scene].option3NextId,
      },
    ],
  };
};

export const chapter1: Scene[] = [
  createScene(0),
  createScene(1),
  createScene(2),
  createScene(3),
  createScene(4),
  createScene(5),
];
