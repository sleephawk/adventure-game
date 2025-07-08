import chapterData from "../data/chapters-test.csv";

const ChapterArr = chapterData;

type Chapter = {
  id: number;
  text: string;
  options: Option[];
};

type Option = {
  text: string;
  nextChapterId: number;
};
