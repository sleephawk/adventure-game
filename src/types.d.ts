export type RawScene = {
  sceneId: string;
  areaId: string;
  prevId: string;
  text: string;
  option1Txt: string;
  option1NextId: string;
  option2Txt: string;
  option2NextId: string;
  option3Txt: string;
  option3NextId: string;
};

export type Scene = {
  sceneId: number;
  areaId: number;
  prevId: number | string;
  text: string;
  options: Option[];
};

export type Option = {
  text: string;
  nextId: number | string;
};

export type Ending = {
  id: number;
  text: string;
};
