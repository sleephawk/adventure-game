// papaparse.d.ts
declare module "papaparse" {
  const Papa: any;
  export default Papa;
}

type Scene = {
  id: number;
  fromId: number | string;
  text: string;
  options: Option[];
};

type Option = {
  text: string;
  nextSceneId: number | string;
};
