import { scenes } from "../data/parse-csv";

export type Scene = {
  id: number;
  fromId: number;
  text: string;
  optionAmt: number;
  options: Option[];
};

export type Option = {
  text: string;
  nextSceneId: number;
};

const createScene = (scene: number) => {
  return {
    id: scenes.data[scene].chapterId,
    fromId: scenes.data[scene].prevId,
    text: scenes.data[scene].text,
    optionAmt: scenes.data[scene].optionAmt,
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
];
