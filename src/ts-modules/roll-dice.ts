//the roll dice takes an Option type and uses the text to
//define the path forward in the game

const rollDiceAndDecidePath: Function = (o: Option): number | undefined => {
  console.log("This operation is running");
  if (!o) {
    throw new Error(`Can't read option passed as parameter`);
  }
  const [path1, path2] = o.nextId.toString().split(",");
  const rolledDice = Math.ceil(Math.random() * 6);
  if (rolledDice > Math.floor((rolledDice / 100) * 33)) {
    //is it higher than 66%?
    console.log(`Rolled a ${rolledDice} which is in the top 66%`);
    return parseInt(path1);
  } else {
    console.log(`Rolled a ${rolledDice} which is in the bottom 33%`);
    return parseInt(path2);
  }
};

export default rollDiceAndDecidePath;

//separate this function into two smaller functions - this will make testing easier
// magic number is a number without context for readability
// options : could parameterise the likeliness
// (rolled number / 6) * 0.3 >>>> easier to read
