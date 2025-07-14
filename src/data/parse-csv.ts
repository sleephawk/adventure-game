import Papa from "papaparse";
import csvData from "../data/scenes-data.csv?raw";

const scenes = Papa.parse(csvData, {
  header: true, // first row is header
  skipEmptyLines: true,
  dynamicTyping: true, // convert numbers automatically
});

export default scenes;
