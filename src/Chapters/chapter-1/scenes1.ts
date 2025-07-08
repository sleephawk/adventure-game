import { scenes } from "../../data/parse-csv";

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

export const chapter1: Scene[] = [
  //Scene 0 - starting point
  {
    id: scenes[0].id,
    fromId: scenes[0].id,
    text: scenes[0].text,
    optionAmt: scenes[0].optionAmt,
    options: [
      {
        text: scenes[0].option1Text,
        nextChapterId: scenes[0].option1NextId,
      },
      {
        text: scenes[0].option2Text,
        nextChapterId: scenes[0].option2NextId,
      },
      {
        text: scenes[0].option3Text,
        nextChapterId: scenes[0].option3NextId,
      },
    ],
  },
  //Scene 1
  {
    id: scenes[1].id,
    fromId: scenes[1].id,
    text: scenes[1].text,
    optionAmt: scenes[1].optionAmt,
    options: [
      {
        text: scenes[1].option1Text,
        nextChapterId: scenes[1].option1NextId,
      },
      {
        text: scenes[1].option2Text,
        nextChapterId: scenes[1].option2NextId,
      },
      {
        text: scenes[1].option3Text,
        nextChapterId: scenes[1].option3NextId,
      },
    ],
  },
  //Scene 2
  {
    id: scenes[2].id,
    fromId: scenes[2].id,
    text: scenes[2].text,
    optionAmt: scenes[2].optionAmt,
    options: [
      {
        text: scenes[2].option1Text,
        nextChapterId: scenes[2].option1NextId,
      },
      {
        text: scenes[2].option2Text,
        nextChapterId: scenes[2].option2NextId,
      },
      {
        text: scenes[2].option3Text,
        nextChapterId: scenes[2].option3NextId,
      },
    ],
  },
  //Scene 3
  {
    id: scenes[3].id,
    fromId: scenes[3].id,
    text: scenes[3].text,
    optionAmt: scenes[3].optionAmt,
    options: [
      {
        text: scenes[3].option1Text,
        nextChapterId: scenes[3].option1NextId,
      },
      {
        text: scenes[3].option2Text,
        nextChapterId: scenes[3].option2NextId,
      },
      {
        text: scenes[3].option3Text,
        nextChapterId: scenes[3].option3NextId,
      },
    ],
  },
];
