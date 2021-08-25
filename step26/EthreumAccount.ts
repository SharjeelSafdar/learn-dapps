import Web3 from "web3";
import { Transaction, TxData } from "ethereumjs-tx";

export class EthereumAccount {
  private web3: Web3;
  private address: string;
  private privateKey?: ReturnType<typeof Buffer.from>;
  private remoteNode =
    "https://ropsten.infura.io/v3/aee7d40b94544f8e8cb7f1e41e9c6fa5";

  constructor(address: string, privateKey?: string) {
    this.address = address;
    this.privateKey = privateKey ? Buffer.from(privateKey, "hex") : undefined;
    this.web3 = new Web3(this.remoteNode);
  }

  getAddress = () => this.address;

  getBalance = async () => {
    return await this.web3.eth
      .getBalance(this.address)
      .then(wei => this.web3.utils.fromWei(wei, "ether"));
  };

  sendEthers = async (ethersAmount: number, receiverAddress: string) => {
    return await this.web3.eth.sendTransaction({
      from: this.address,
      to: receiverAddress,
      value: this.web3.utils.toWei(ethersAmount.toString(), "ether"),
      gas: 21000,
      gasPrice: this.web3.utils.toWei(this.web3.utils.toBN(10), "gwei"),
    });
  };

  sendLocallySignedTransaction = async (
    receiverAddress: string,
    ethersAmount: number,
    gasLimit: number,
    gasPriceGwei: number
  ) => {
    if (!this.privateKey) {
      console.error("Private Key not provided!");
      return;
    }

    // Build the transaction
    const txCount = await this.web3.eth.getTransactionCount(this.address);
    const txData: TxData = {
      nonce: this.web3.utils.toHex(txCount),
      to: receiverAddress,
      value: this.web3.utils.toHex(
        this.web3.utils.toWei(ethersAmount.toString(), "ether")
      ),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(
        this.web3.utils.toWei(gasPriceGwei.toString(), "gwei")
      ),
    };

    // Sign the transaction
    const tx = new Transaction(txData, { chain: "ropsten" });
    tx.sign(this.privateKey);
    const serializedTx = tx.serialize();
    const rawTx = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    return await this.web3.eth.sendSignedTransaction(rawTx);
  };

  deploySmartContract = async (
    smartContractByteCode: string,
    gasLimit: number,
    gasPriceGwei: number
  ) => {
    if (!this.privateKey) {
      console.error("Private Key not provided!");
      return;
    }

    // Build the transaction
    const txCount = await this.web3.eth.getTransactionCount(this.address);
    const txData: TxData = {
      nonce: this.web3.utils.toHex(txCount),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(
        this.web3.utils.toWei(gasPriceGwei.toString(), "gwei")
      ),
      data: smartContractByteCode,
    };

    // Sign the transaction
    const tx = new Transaction(txData, { chain: "ropsten" });
    tx.sign(this.privateKey);
    const serializedTx = tx.serialize();
    const rawTx = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    return await this.web3.eth.sendSignedTransaction(rawTx);
  };
}
