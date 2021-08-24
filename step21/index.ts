import { EthereumAccount } from "./EthreumAccount";

const account = new EthereumAccount();

console.log("Wallet Address: ", account.getAddress());

account.getBalance().then(balance => {
  console.log(balance, "Ethers");
});
