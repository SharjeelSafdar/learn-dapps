import Web3 from "web3";
import EthContract from "web3-eth-contract";
import DAI_ABI from "./contractABI.json";

export class SmartContract {
  private static readonly DAI_ABI = JSON.stringify(DAI_ABI);
  private static readonly DAI_ADDRESS =
    "0x6B175474E89094C44Da98b954EedeAC495271d0F";

  private web3: Web3;
  private abi: string;
  private contractAddress: string;
  private contract: EthContract.Contract;

  constructor(
    contractAddress = SmartContract.DAI_ADDRESS,
    abi = SmartContract.DAI_ABI
  ) {
    this.contractAddress = contractAddress;
    this.abi = abi;
    this.web3 = new Web3(
      "https://mainnet.infura.io/v3/c47da59d93d7471b87b3a883ed8dec89"
    );
    this.contract = new this.web3.eth.Contract(
      JSON.parse(this.abi),
      this.contractAddress
    );
  }

  getContractAddress = () => this.contractAddress;

  getContractName = async () => {
    return await this.contract.methods.name().call();
  };

  getContractSymbol = async () => {
    return await this.contract.methods.symbol().call();
  };

  getTotalSupply = async () => {
    return await this.contract.methods.totalSupply().call();
  };

  getAccountBalance = async (accountAddress: string) => {
    return await this.contract.methods.balanceOf(accountAddress).call();
  };
}
