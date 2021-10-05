// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Crud {
  struct User {
    uint id;
    string name;
  }

  User[] public users;
  uint public usersCount;

  function add(string memory newUserName) public {
    User memory newUser = User({
      id: usersCount++,
      name: newUserName
    });

    users.push(newUser);
  }

  modifier idExists(uint id) {
    require(id < users.length, "ID does not exist.");
    _;
  }

  function read(uint id) public view idExists(id) returns(string memory) {
    return users[id].name;
  }

  function update(uint id, string memory newName) public idExists(id) {
    users[id].name = newName;
  }

  function destroy(uint id) public idExists(id) {
    delete users[id];
  }

  function sayHi() public pure returns(string memory) {
    return "Hi";
  }

  function sayHello() external pure returns(string memory) {
    return "Hello";
  }
}
