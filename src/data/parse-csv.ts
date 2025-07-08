import Papa from "papaparse";
import csvData from "../data/scene-test.csv?raw";

export const scenes = Papa.parse(csvData, {
  header: true, // first row is header
  skipEmptyLines: true,
  dynamicTyping: true, // convert numbers automatically
  // You can add more options here as needed
});
