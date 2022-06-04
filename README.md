# block.timestamp attack

block.timestamp is a global variable that returns the timestamp at which the block is mined, we will learn how incorrect use of the block.timestamp could lead to security vulnerabilities in smart contracts.

## What is block.timestamp?

block.timestamp is a global variable (expressed in milliseconds since the start of the Unix epoch) that returns the timestamp at which the block is mined and it can be manipulated by the miner with some restrictions like the next block’s timestamp should be after the previous block’s timestamp and the block's timestamp value is within 100 milliseconds of the UTC time.

## Manipulating block.timestamp

### What will happen?

Users can play the lottery game by sending 1 ether to the contract and if someone is chosen as a winner, they will be sent the complete balance of the contract.

There will be a Game.sol smart contract that contains the logic of our lottery game.

### Build

Let's build an example where you can experience how the attack happens.

- To setup a Hardhat project, Open up a terminal and execute these commands

  ```bash
  npm init --yes
  npm install --save-dev hardhat
  ```

- If you are not on mac, please do this extra step and install these libraries as well :)

  ```bash
  npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
  ```

- In the same directory where you installed Hardhat run:

  ```bash
  npx hardhat
  ```

  - Select `Create a basic sample project`
  - Press enter for the already specified `Hardhat Project root`
  - Press enter for the question on if you want to add a `.gitignore`
  - Press enter for `Do you want to install this sample project's dependencies with npm (@nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers)?`

Now you have a hardhat project ready to go!

Now let’s create `Game.sol` smart contract:

Create a file named `Game.sol` inside your contracts folder and add the following lines of code.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Game{
    uint public lastBlockTimestamp;

    receive() external payable{
        require(msg.value == 1 ether, "Not eligible");
        require(block.timestamp != lastBlockTimestamp);

        lastBlockTimestamp = block.timestamp;
        if(block.timestamp % 10 == 0){
            (bool sent, ) = msg.sender.call{value: address(this).balance}("");
            require(sent, "Failed to send");
        }
    }
}
```

The attack will happen as follows:

- miner waits for users to play this game and submit ethers to this contract
- miner then submits a transaction with block.timestamp for the next block such that it is divisible by 10 and wins the game.

## Prevention:

- Avoid using block.number as a timestamp
- <b>Use the 15-second rule:</b> It is safe to utilize the block.timestamp if the magnitude of your time-dependent event may vary by 15 seconds while maintaining integrity.

Keep BUIDLING, WAGMI 🚀

## References

- [Solidity Docs](https://docs.soliditylang.org/en/v0.8.13/units-and-global-variables.html#block-and-transaction-properties)
- [Consensys](https://consensys.github.io/smart-contract-best-practices/development-recommendations/solidity-specific/timestamp-dependence/)
