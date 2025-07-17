//the roll dice takes an Option type and uses the text to
//define the path forward in the game
import type { Option } from "../types";

const rollDice = (diceSides: number): number => {
  const roll = Math.ceil(Math.random() * diceSides);
  return roll;
};

const decidePath: Function = (
  o: Option,
  percentage: number,
  diceSides: number
): number | undefined => {
  console.log("This operation is running");
  if (!o) {
    throw new Error(`Can't read option passed as parameter`);
  }
  const chance = percentage;
  const [path1, path2] = o.nextId.toString().split(",");
  const sides = diceSides;
  const result = rollDice(sides);
  const comparisonPercentage = Math.ceil((sides / 100) * chance);
  console.log(`result of dice roll is ${result}`);
  console.log(`The percentage for comparison is ${comparisonPercentage}`);
  if (result > comparisonPercentage) {
    console.log(
      `Rolled a ${result} which is in the top ${
        chance > 100 ? comparisonPercentage : 100 - chance
      }%`
    );
    return parseInt(path1);
  } else if (result <= comparisonPercentage) {
    console.log(
      `Rolled a ${result} which is in the bottom ${
        chance > 100 ? 100 - chance : chance
      }%`
    );
    return parseInt(path2);
  } else {
    console.log("something went wrong with the dice here");
  }
};

export default decidePath;

//separate this function into two smaller functions - this will make testing easier
// magic number is a number without context for readability
// options : could parameterise the likeliness
// (rolled number / 6) * 0.3 >>>> easier to read
