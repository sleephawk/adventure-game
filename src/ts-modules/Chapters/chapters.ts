import scenes from "../../data/parse-csv";

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

export const chapters: Scene[] = [];
for (let i = 0; i < 23; i++) {
  chapters.push(createScene(i));
} // There's probably a way to run this so it's one function with a loop
//rather than one loop with a function
