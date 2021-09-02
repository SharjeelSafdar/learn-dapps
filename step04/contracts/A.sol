// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract A {
  uint[] public myArray;

  constructor() {
    myArray = [1, 2, 3];
    myArray.push(4);
  }

  function getLength() public view returns(uint length) {
    length = myArray.length;
  }

  function sum() public view returns(uint result) {
    for (uint index = 0; index < myArray.length; index++) {
      if (index != 0) {
        result += myArray[index];
      }
    }
  }

  function testArray() public pure returns(bool) {
    uint len = 7;

    // Dynamic Array
    uint[] memory a = new uint[](7);

    // bytes is same as byte[]
    bytes memory b = new bytes(len);

    assert(a.length == 7);
    assert(b.length == len);

    // Access array members
    a[6] = 10;

    // Test array members
    assert(a[6] == 10);

    // Static Array
    uint[3] memory c = [uint(1), 2, 3];
    assert(c.length == 3);

    return true;
  }
}
