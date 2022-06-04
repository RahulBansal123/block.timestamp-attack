// contracts/Game.sol
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
