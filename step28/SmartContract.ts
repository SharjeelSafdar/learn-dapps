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
      "https://mainnet.infura.io/v3/c47da59d93d7471b87b3a883ed8dec89"
    );
    this.contract = new this.web3.eth.Contract(
      JSON.parse(this.abi),
      this.contractAddress
    );
  }

  /**
   * Gets the address of the contract.
   */
  getContractAddress = () => this.contractAddress;

  /**
   * Gets the name of the token.
   */
  getContractName = async () => {
    return await this.contract.methods.name().call();
  };

  /**
   * Gets the symbol of the token.
   */
  getContractSymbol = async () => {
    return await this.contract.methods.symbol().call();
  };

  /**
   * Gets the total number of DAIs currently in the market.
   */
  getTotalSupply = async () => {
    const supply = await this.contract.methods.totalSupply().call();
    const numDecimals = await this.contract.methods.decimals().call();
    return supply / 10 ** numDecimals;
  };

  /**
   * Gets all events for a contract.
   * @param fromBlock Starting block number
   * @param toBlock (Optional) Ending block number- default is 'latest'
   */
  getEvents = async (
    fromBlock: number | string,
    toBlock: number | string = "latest"
  ) => {
    return await this.contract.getPastEvents("AllEvents", {
      fromBlock,
      toBlock,
    });
  };
}
