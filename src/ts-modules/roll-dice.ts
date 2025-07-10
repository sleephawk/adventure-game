//the roll dice takes an Option type and uses the text to
//define the path forward in the game

const rollDiceAndDecidePath: Function = (o: Option): number | undefined => {
  console.log("This operation is running");
  if (!o) {
    throw new Error(`Can't read option passed as parameter`);
  }
  const [path1, path2] = o.nextSceneId.toString().split("x");
  const rolledDice = Math.ceil(Math.random() * 6);
  return rolledDice > 2 ? parseInt(path1) : parseInt(path2);
};

export default rollDiceAndDecidePath;
