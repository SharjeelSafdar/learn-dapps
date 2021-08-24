import Web3 from "web3";

export class EthereumAccount {
  private web3: Web3;
  private address: string;
  private remoteNode = "http://127.0.0.1:7545";

  constructor(address: string) {
    this.address = address;
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
}
