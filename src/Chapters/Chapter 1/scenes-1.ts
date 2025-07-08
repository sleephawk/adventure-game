import sceneDataTest from "../data/scene-test.csv";

export const SceneArr = sceneDataTest;

type Scene = {
  id: number;
  fromId: number;
  text: string;
  optionAmt: number;
  options: Option[];
};

type Option = {
  text: string;
  nextChapterId: number;
};

export const scenes: Scene[] = [
  //Scene 0 - starting point
  {
    id: SceneArr[0].id,
    fromId: SceneArr[0].id,
    text: SceneArr[0].text,
    optionAmt: SceneArr[0].optionAmt,
    options: [
      {
        text: SceneArr[0].option1Text,
        nextChapterId: SceneArr[0].option1NextId,
      },
      {
        text: SceneArr[0].option2Text,
        nextChapterId: SceneArr[0].option2NextId,
      },
      {
        text: SceneArr[0].option3Text,
        nextChapterId: SceneArr[0].option3NextId,
      },
    ],
  },
  //Scene 1
  {
    id: SceneArr[1].id,
    fromId: SceneArr[1].id,
    text: SceneArr[1].text,
    optionAmt: SceneArr[1].optionAmt,
    options: [
      {
        text: SceneArr[1].option1Text,
        nextChapterId: SceneArr[1].option1NextId,
      },
      {
        text: SceneArr[1].option2Text,
        nextChapterId: SceneArr[1].option2NextId,
      },
      {
        text: SceneArr[1].option3Text,
        nextChapterId: SceneArr[1].option3NextId,
      },
    ],
  },
  //Scene 2
  {
    id: SceneArr[2].id,
    fromId: SceneArr[2].id,
    text: SceneArr[2].text,
    optionAmt: SceneArr[2].optionAmt,
    options: [
      {
        text: SceneArr[2].option1Text,
        nextChapterId: SceneArr[2].option1NextId,
      },
      {
        text: SceneArr[2].option2Text,
        nextChapterId: SceneArr[2].option2NextId,
      },
      {
        text: SceneArr[2].option3Text,
        nextChapterId: SceneArr[2].option3NextId,
      },
    ],
  },
  //Scene 3
  {
    id: SceneArr[3].id,
    fromId: SceneArr[3].id,
    text: SceneArr[3].text,
    optionAmt: SceneArr[3].optionAmt,
    options: [
      {
        text: SceneArr[3].option1Text,
        nextChapterId: SceneArr[3].option1NextId,
      },
      {
        text: SceneArr[3].option2Text,
        nextChapterId: SceneArr[3].option2NextId,
      },
      {
        text: SceneArr[3].option3Text,
        nextChapterId: SceneArr[3].option3NextId,
      },
    ],
  },
];
