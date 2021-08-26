import { EthNetwork } from "./EthNetwork";

(async () => {
  const network = new EthNetwork();

  console.log("Latest Block Number:", await network.getLatestBlockNumber());

  const blockNumber = 13101095;
  const block = await network.getBlock(blockNumber);
  console.log("Block Hash:", block.hash);

  console.log(
    `Number of Txns in Block # ${blockNumber}:`,
    await network.getTransactionCountFromBlock(blockNumber)
  );

  console.log(
    `Transaction Hash:`,
    (await network.getTransactionFromBlock(0, blockNumber)).hash
  );
})();
