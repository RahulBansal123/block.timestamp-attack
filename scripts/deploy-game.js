const { ethers } = require('hardhat');

async function main() {
  const Game = await ethers.getContractFactory('Game');
  const game = await Game.deploy();

  await game.deployed();
  console.log('Game contract deployed at:', game.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
