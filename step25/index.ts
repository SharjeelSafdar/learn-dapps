import { EthereumAccount } from "./EthreumAccount";
import dotenv from "dotenv";

// Create a file named ".env" and write the environment variables as mentioned in ".env.example"
dotenv.config({ path: "./.env" });

const account1Address = process.env.ACCOUNT1_PUBLIC_ADDRESS;
const account2Address = process.env.ACCOUNT2_PUBLIC_ADDRESS;
const account1PrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;
const account2PrivateKey = process.env.ACCOUNT2_PRIVATE_KEY;

if (!account1Address || !account2Address) {
  throw new Error(
    "Account addresses must be provided as environment variables."
  );
}

// Wrap in a function so we can use async/await.
(async () => {
  // Instantiate two Ethereum account objects with the given addresses.
  const account1Obj = new EthereumAccount(account1Address, account1PrivateKey);
  const account2Obj = new EthereumAccount(account2Address, account2PrivateKey);

  // Status of the two accounts before the transaction
  console.log(
    "Account 1 Balance Before Transaction:",
    await account1Obj.getBalance()
  );
  console.log(
    "Account 2 Balance Before Transaction:",
    await account2Obj.getBalance()
  );

  console.log("Sending 1 Ether from Accout 1 to Account 2...");
  const txData = await account1Obj.sendLocallySignedTransaction(
    account2Obj.getAddress(),
    1,
    21000,
    10
  );
  console.log(
    "Transaction on EtherScan:",
    `https://ropsten.etherscan.io/tx/${txData?.transactionHash}`
  );

  // Status of the two accounts after the transaction
  console.log(
    "Account 1 Balance After Transaction:",
    await account1Obj.getBalance()
  );
  console.log(
    "Account 2 Balance After Transaction:",
    await account2Obj.getBalance()
  );
})();
