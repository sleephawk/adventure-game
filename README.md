# Adventure Game

## HTML

- [x] Create a container that includes elements for text, and a container to hold all elements
- [x] Create game heading and start button (decide on title)
- [x] Create quote for opening
- [x] research how to include music & create relevant element.
- [ ] fixed floating mute button
- [ ] relevant floating & animated gifs/ svgs (research correct format for animations)

## SCSS

- [x] Set up initial display-nones ready for DOM manipulation on start
- [x] Choose and install a google font to keep the right vibe.
- [x] choose background colour & setup palette (likely B&W for most but want colours to change in certain chapters);
- [ ] music mute and sound graphic needed for the main page
- [x] Set up palette
- [x] Set up device mixins
- [x] Position options round the circle in equal measure
- [x] format buttons overall
- [x] combine 'chapter 1' with quote
- [ ] rethink page layout since rotate animation too time consuming for too little payoff
- [ ] create slider volume bar
- [ ] create a for loop once the scenes are created

## Logic

- [x] Query Selectors
- [x] Event handlers
- [ ] Console log dice roll logic to confirm checks are taking place
      as intended

  - [x] Button complete

    1 [x] to be put inside the event listener (when button is clicked)
    2 [x] should change the text of the text-zone and the button-zones
    3 [x] should fade between

- [ ] Upload more robust story file
- [ ] Create logic for win and lose con
- [x] create logic for chance die
- [ ] update dice logic to only have 2 options and to be 6 / 2 

  - [ ] Music module

    1 [ ] Create or source music
    2 [ ] search for folie & create fx
    3 [ ] create volume bar graphic
    4 [ ] Create a module that starts and plays music depending on the current chapter and scene.

## API & Processing CSVs

- From Vite, we have a CSV converter so that we can use a local spreadsheet in src/ data that will provide all the options for the responses object. This avoids hundreds of lines of code.
  The vite.config.ts is what allows me to use this in the project.
- Further setup was needed by adding a types.d.ts file, which declares csv files as an any type and therefore can be imported without confusion from TS.
- I then updated the tsconfig file to 'include' the types file, and this led to it work.
- A large portion of time was spent trying to figure out vite csv converter without being able to find the documentation. I eventually restarted with Papaparse as it is more supported.
