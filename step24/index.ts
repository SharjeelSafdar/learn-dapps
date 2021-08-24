import { EthereumAccount } from "./EthreumAccount";

const account1Address = "0x297756881E20A7B6E6060B3A85B7E6964Ce8b0C2";
const account2Address = "0x32f205fB69b913aD001DAdB0f3d68038BdB5Be26";

// Wrap in a function so we can use async/await.
(async () => {
  // Instantiate two Ethereum account objects with the given addresses.
  const account1 = new EthereumAccount(account1Address);
  const account2 = new EthereumAccount(account2Address);

  // Status of the two accounts before the transaction
  console.log(
    "Account 1 Balance Before Transaction:",
    await account1.getBalance()
  );
  console.log(
    "Account 2 Balance Before Transaction:",
    await account2.getBalance()
  );

  console.log("Sending 3 Ethers from Accout 1 to Account 2...");
  await account1.sendEthers(3, account2.getAddress());

  // Status of the two accounts after the transaction
  console.log(
    "Account 1 Balance After Transaction:",
    await account1.getBalance()
  );
  console.log(
    "Account 2 Balance After Transaction:",
    await account2.getBalance()
  );
})();
