// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SolidityTypes {
  address public owner;
  uint public last_completed_migration;
  string private greeting;
  Another con = new Another();
  uint private storedData;

  constructor() {
    storedData = 10;
    greeting = "Hello, World!";
    owner = msg.sender;
  }

  function sayHello() external view returns (string memory) {
    if (msg.sender == owner) {
      return "Hello, Daddy";
    } else {
      return greeting;
    }
  }

  function getResult() public view returns (uint) {
    uint a = 3;
    uint b = 10;
    uint result = a + b + storedData + con.data();
    return result;
  }

  function getBlockNumber() public view returns(uint, address) {
    return (block.number, msg.sender);
  }

  function transferFund(address payable receiver, uint amount) external payable {
    // address newAddress = receiver;
    receiver.transfer(amount);
    // newAddress.transfer(amount);
  }

  modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
  }

  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}

contract Another {
  uint public data = 1;
}