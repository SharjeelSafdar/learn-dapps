import { SmartContract } from "./SmartContract";

const contract = new SmartContract();
const daiHolders = [
  "0x6b175474e89094c44da98b954eedeac495271d0f",
  "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503",
];

contract.getContractName().then(console.log);
contract.getContractSymbol().then(console.log);
console.log("Contract Address:", contract.getContractAddress());
contract.getTotalSupply().then(ts => console.log("Total Supply:", ts));
contract
  .getAccountBalance(daiHolders[1])
  .then(ab => console.log("Account Balance:", ab));
