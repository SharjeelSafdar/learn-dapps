import Web3 from "web3";

export class EthereumAccount {
  private web3: Web3;
  private address: string;
  private remoteNode =
    "https://mainnet.infura.io/v3/c47da59d93d7471b87b3a883ed8dec89";

  constructor(address = "0xDeE6238780f98c0ca2c2C28453149bEA49a3Abc9") {
    this.address = address;
    this.web3 = new Web3(this.remoteNode);
  }

  getAddress = () => this.address;

  getBalance = async () => {
    return await this.web3.eth
      .getBalance(this.address)
      .then(balance => this.web3.utils.fromWei(balance, "ether"));
  };
}
