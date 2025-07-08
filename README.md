# Adventure Game

## HTML

- [x] Create a container that includes elements for text, and a container to hold all elements
      (choice buttons will be created by DOM);
- [ ] Create game heading and start button (decide on title)
- [x] Create quote for opening
- [ ] research how to include music & create relevant element.
- [ ] fixed floating mute button
- [ ] relevant floating & animated gifs/ svgs (research correct format for animations)

## SCSS

- [ ] Set up initial display-nones ready for DOM manipulation on start
- [ ] Choose and install a google font to keep the right vibe.
- [ ] choose background colour & setup palette (likely B&W for most but want colours to change in certain chapters);
- [ ] music mute and sound graphic needed for the main page
- [ ] Set up palette
- [ ] Set up device mixins

## Logic

- [ ] Query Selectors
  - [ ]

## API & Processing CSVs

- From Vite, we have a CSV converter so that we can use a local spreadsheet in src/ data that will provide all the options for the responses object. This avoids hundreds of lines of code.
  The vite.config.ts is what allows me to use this in the project.
- Further setup was needed by adding a types.d.ts file, which declares csv files as an any type and therefore can be imported without confusion from TS.
- I then updates the tsconfig file to 'include' the types file, and this led to it work.

- A process I had to learn for this was JSON.parse which takes a string and converts it into JS/ TS data. This is used to create the object from CSV.
