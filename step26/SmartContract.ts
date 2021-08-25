import Web3 from "web3";
import EthContract from "web3-eth-contract";

export class SmartContract {
  private web3: Web3;
  private abi: string;
  private contractAddress: string;
  private contract: EthContract.Contract;

  constructor(contractAddress: string, abi: string) {
    this.contractAddress = contractAddress;
    this.abi = abi;
    this.web3 = new Web3(
      "https://ropsten.infura.io/v3/aee7d40b94544f8e8cb7f1e41e9c6fa5"
    );
    this.contract = new this.web3.eth.Contract(
      JSON.parse(this.abi),
      this.contractAddress
    );
  }

  getContractAddress = () => this.contractAddress;

  getContractOwner = async () => {
    return await this.contract.methods.getOwner().call();
  };
}
