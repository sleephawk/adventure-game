//the roll dice takes an Option type and uses the text to
//define the path forward in the game

export const rollDiceAndDecidePath: Function = (
  o: Option
): number | undefined => {
  if (!o) {
    return;
  }
  if (o.text.includes("x")) {
    const splitPath = o.text.split("x");
    const rolledDice = Math.ceil(Math.random() * 20);
    if (
      (splitPath.length === 3 && rolledDice > (20 / 3) * 2) ||
      (splitPath.length == 3 && rolledDice > 20 / 2)
    ) {
      return Number(splitPath[0]);
    } else if (
      (splitPath.length === 3 && rolledDice > 20 / 3) ||
      (splitPath.length == 3 && rolledDice < 20 / 2)
    ) {
      return Number(splitPath[1]);
    } else if (splitPath.length === 3 && rolledDice < 20 / 3) {
      return Number(splitPath[2]);
    } else {
      throw new Error(
        "the variable that has been split into an array does not contain 2 or 3 items"
      );
    }
  }
};
