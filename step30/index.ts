import Web3 from "web3";

const RPC_URL = "https://mainnet.infura.io/v3/c47da59d93d7471b87b3a883ed8dec89";
const web3 = new Web3(RPC_URL);

(async () => {
  const avgGasPrice = web3.utils.fromWei(await web3.eth.getGasPrice(), "ether");
  console.log("Average Gas Price ==>", avgGasPrice, "ETH");

  const phrase = "DApp is Fun";
  const hash = web3.utils.sha3(phrase);
  console.log(`Hash of "${phrase}" ==>`, hash);

  const hash2 = web3.utils.soliditySha3(phrase);
  console.log(`Hash of "${phrase}" ==>`, hash);

  console.log("Random Hex of size 16 ==>", web3.utils.randomHex(16));
})();
