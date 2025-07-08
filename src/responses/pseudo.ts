/*

export type response = { text: string; choice1: string; choice2: string };
export const responses: Chapter[] = [
  // Chapter 1
  {
    id: 1,
    text: `The world drifts away as you go back to sleep.
  //   After what seems like seconds, you're sharply awoken by the sound
  //   of sirens outside you're house. They sound so close they could 
  //   be right at the door. Do you:`,
    options: [
      {
        text: `Move to the window to check it out.`,
        nextChapterId: 2,
      },
      {
        text: `Try your best to go back to sleep.`,
        nextChapterId: 3,
      },
    ],
  },

  // Chapter 2
  {
    id: 2,
    text: `The world drifts away as you go back to sleep.
    After what seems like seconds, you're sharply awoken by the sound
    of sirens outside you're house. They sound so close they could 
   be right at the door. Do you:`,
    options: [
      {
        text: `Move to the window to check it out.`,
        nextChapterId: 2,
      },
      {
        text: `Try your best to go back to sleep.`,
        nextChapterId: 3,
      },
    ],
  },

  // Convert CSV to JS/TS
  // FileReader API
  // You have a table with all your chapters, text, options, nextChapterId in columns
  //
];

// const nextChapter = responses.find(r => r.id === nextChapterId);
// display.value = nextChapter?.text;

type Chapter = {
  id: number;
  text: string;
  options: Option[];
};

type Option = {
  text: string;
  nextChapterId: number;
};

 */
