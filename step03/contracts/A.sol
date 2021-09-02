// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract A {
  uint[] public number;
  address[10] public users;
  uint8 usersCount;

  function addUser(address _user) external {
    require(usersCount < 10, "number of users is limited to 10");
    users[usersCount++] = _user;
  }

  function addNumber(uint8 _number) external {
    number.push(_number);
  }
}
