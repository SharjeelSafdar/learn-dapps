import dotenv from "dotenv";
import { SmartContract } from "./SmartContract";

// Create a file named ".env" and write the environment variables as mentioned in ".env.example"
dotenv.config({ path: "./.env" });

// Credentials of the previous owner
const account1Address = process.env.ACCOUNT1_PUBLIC_ADDRESS;
const account1PrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;
// Credentials of the new owner
const account2Address = process.env.ACCOUNT2_PUBLIC_ADDRESS;
const account2PrivateKey = process.env.ACCOUNT2_PRIVATE_KEY;

if (
  !account1Address ||
  !account1PrivateKey ||
  !account2Address ||
  !account2PrivateKey
) {
  throw new Error(
    "Account addresses and private key must be provided as environment variables."
  );
}

(async () => {
  // Instantiate smart contract object.
  const contract = new SmartContract();

  console.log("Previous Owner:", await contract.getContractOwner());

  console.log("Changing Owner...");
  const txData = await contract.changeContractOwner(
    account2Address,
    account1PrivateKey,
    1_000_000,
    10
  );
  console.log(
    "EtherScan Link:",
    `https://ropsten.etherscan.io/tx/${txData?.transactionHash}`
  );

  console.log("New Owner:", await contract.getContractOwner());
})();
