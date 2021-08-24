import Web3 from "web3";

import DAI_ABI from "./abi/dai.json";
import { Dai } from "./types/web3-v1-contracts/dai";

export class SmartContract {
  private static readonly DAI_ADDRESS =
    "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  private static readonly DAI_ABI = JSON.stringify(DAI_ABI);

  private web3: Web3;
  private contractAbi: string;
  private contractAddress: string;
  private dai: Dai;

  constructor(
    contractAddress = SmartContract.DAI_ADDRESS,
    contractAbi = SmartContract.DAI_ABI
  ) {
    this.contractAddress = contractAddress;
    this.contractAbi = contractAbi;
    this.web3 = new Web3(
      "https://mainnet.infura.io/v3/c47da59d93d7471b87b3a883ed8dec89"
    );
    this.dai = new this.web3.eth.Contract(
      JSON.parse(this.contractAbi),
      this.contractAddress
    ) as any as Dai;
  }

  getContractAddress = () => this.contractAddress;

  getContractName = async () => {
    return await this.dai.methods.name().call();
  };

  getContractSymbol = async () => {
    return await this.dai.methods.symbol().call();
  };

  getTotalSupply = async () => {
    return await this.dai.methods.totalSupply().call();
  };

  getAccountBalance = async (accountAddress: string) => {
    return await this.dai.methods.balanceOf(accountAddress).call();
  };
}
