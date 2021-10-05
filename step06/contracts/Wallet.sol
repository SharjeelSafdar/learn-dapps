// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma abicoder v2;

contract Wallet {
  struct Transaction {
    uint id;
    address from;
    address payable to;
    uint amount;
    address[3] approvers;
    uint8 numApprovals;
    bool isSent;
  }

  address[] public approvers;
  uint8 public quorum = 3;
  Transaction[] public transactions;
  uint public completedTransactions;

  function getBalanceOf(address account) public view returns(uint) {
    return account.balance;
  }

  function getApprovers() public view returns(address[] memory) {
    return approvers;
  }

  // function getTransactions() public view returns(Transaction[] memory) {
  //   return transactions;
  // }

  function addApprover(address newApprover) public {
  // function addApprover() public {
    approvers.push(newApprover);
  }

  modifier isAnApprover() {
    bool isApprover = false;
    for (uint8 index = 0; index < approvers.length; index++) {
      if (approvers[index] == msg.sender) {
        isApprover = true;
        break;
      }
    }
    require(isApprover, "Sender must be an approver of this wallet.");
    _;
  }

  modifier hasNotApproved(uint transactionId) {
    bool hasApproved = false;
    for (uint8 index = 0; index < quorum; index++) {
      if (transactions[transactionId].approvers[index] == msg.sender) {
        hasApproved = true;
        break;
      }
    }
    require(hasApproved == false, "Sender has already approved this transaction.");
    _;
  }

  modifier hasNotBeenSent(uint transactionId) {
    require(transactions[transactionId].isSent == false, "Transaction has already been approved and sent.");
    _;
  }

  function addTransaction(address payable receiver, uint amount) public isAnApprover {
    // mapping(address => bool) memory templateApproversList;
    // for (uint8 index = 0; index < approvers.length; index++) {
    //   templateApproversList[approvers[index]] = false;
    // }
    // templateApproversList[msg.sender] = true;

    transactions.push(Transaction({
      id: transactions.length,
      from: msg.sender,
      to: receiver,
      amount: amount,
      approvers: [msg.sender, msg.sender, msg.sender],
      numApprovals: 1,
      isSent: false
    }));
  }

  function approveTransaction(uint transactionId) public payable
    isAnApprover hasNotBeenSent(transactionId) hasNotApproved(transactionId) {
    uint8 index = transactions[transactionId].numApprovals;
    transactions[transactionId].approvers[index] = msg.sender;
    transactions[transactionId].numApprovals++;

    if (transactions[transactionId].numApprovals >= quorum) {
      uint amount = transactions[transactionId].amount;
      address payable to = transactions[transactionId].to;
      to.transfer(amount);
      transactions[transactionId].isSent = true;
      completedTransactions++;
    }
  }

  receive() external payable {}
}
