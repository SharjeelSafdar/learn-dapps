import { SmartContract } from "./SmartContract";
import DAI_ABI from "./abi/dai.json";

const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const numberFormator = new Intl.NumberFormat("us-EN", {
  style: "currency",
  currency: "DAI",
  maximumFractionDigits: 18,
});

(async () => {
  // Instantiate smart contract object.
  const contract = new SmartContract(DAI_ADDRESS, JSON.stringify(DAI_ABI));

  // Now, interact with the contract object.
  console.log("Token Name:", await contract.getContractName());
  console.log("Token Symbol:", await contract.getContractSymbol());
  const totalSupply = await contract.getTotalSupply();
  console.log("Total Supply:", numberFormator.format(totalSupply));
  const events = await contract.getEvents(13100252);
  console.log("Events Count:", events.length);
  console.log("Latest Event:", events.pop());
})();
