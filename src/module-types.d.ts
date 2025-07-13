// papaparse.d.ts
declare module "papaparse" {
  const Papa: any;
  export default Papa;
}

type RawScene = {
  sceneId: string;
  prevId: string;
  text: string;
  option1Txt: string;
  option1NextId: string;
  option2Txt: string;
  option2NextId: string;
  option3Txt: string;
  option3NextId: string;
  token: string;
  altNum: string;
};

type Scene = {
  sceneId: number;
  prevId: number | string;
  text: string;
  options: Option[];
};

type Option = {
  text: string;
  nextId: number | string;
};

type Ending = {
  id: number;
  text: string;
};
