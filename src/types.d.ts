export type RawScene = {
  sceneId: string;
  areaId: string;
  prevId: string;
  text: string;
  option1Id: string;
  option1Txt: string;
  option1NextId: string;
  option2Id: string;
  option2Txt: string;
  option2NextId: string;
  option3Id: string;
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
  id: number | string;
  text: string;
  nextId: string;
};

export type Ending = {
  id: number;
  text: string;
};
