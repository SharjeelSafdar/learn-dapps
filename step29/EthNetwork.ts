import Web3 from "web3";

export class EthNetwork {
  private static readonly RPC_URL =
    "https://mainnet.infura.io/v3/c47da59d93d7471b87b3a883ed8dec89";
  private web3: Web3;

  /**
   * Creates an instance of EthNetwork object.
   */
  constructor() {
    this.web3 = new Web3(EthNetwork.RPC_URL);
  }

  /**
   * getLatestBlockNumber
   * @returns latest block number on the Ethereum Mainnet
   */
  public getLatestBlockNumber = async () => {
    return await this.web3.eth.getBlockNumber();
  };

  /**
   * getBlock
   * @returns a block of given number or Hash from the Ethereum Mainnet
   * @param block Number or hash of the block
   */
  public getBlock = async (block: number | string) => {
    return await this.web3.eth.getBlock(block);
  };

  /**
   * getBlock
   * @returns the number of transactions in a block of given number or Hash from the Ethereum Mainnet
   * @param block (Optional) Hash or number of the block- default is "latest"
   */
  public getTransactionCountFromBlock = async (
    block: string | number = "latest"
  ) => {
    return await this.web3.eth.getBlockTransactionCount(block);
  };

  /**
   * getBlock
   * @returns the number of transactions in a block of given number or Hash from the Ethereum Mainnet
   * @param trxIndex Index of the transaction in the block
   * @param block (Optional) Hash or number of the block- default is "latest"
   */
  public getTransactionFromBlock = async (
    trxIndex: number,
    block: string | number = "latest"
  ) => {
    return await this.web3.eth.getTransactionFromBlock(block, trxIndex);
  };
}
