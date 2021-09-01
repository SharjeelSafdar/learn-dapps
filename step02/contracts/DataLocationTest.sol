// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract DataLocationTest {
  uint[] stateVar = [1, 4, 5];

  function foo() public {
    // case 1 : from storage to memory
    uint[] memory y = stateVar;

    // case 2 : from memory to storage
    y[0] = 5;
    y[1] = 10;
    y[2] = 15;

    stateVar = y;

    // case 3 : from storage to storage
    uint[] storage z = stateVar;

    z[0] = 100;
    z[1] = 200;
    z[2] = 300;
  }
}
