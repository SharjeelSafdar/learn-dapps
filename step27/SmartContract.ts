import Web3 from "web3";
import { Transaction, TxData } from "ethereumjs-tx";
import { OwnerContract } from "./types/web3-v1-contracts/ownerContract";
import CONTRACT_ABI from "./abi/ownerContract.json";

const contractAddress = "0x1FAf0c966ffD0B2b176CA9fF94236e51ea35EB02";

export class SmartContract {
  private web3: Web3;
  private abi: string;
  private contractAddress: string;
  private contract: OwnerContract;

  constructor() {
    this.contractAddress = contractAddress;
    this.abi = JSON.stringify(CONTRACT_ABI);
    this.web3 = new Web3(
      "https://ropsten.infura.io/v3/aee7d40b94544f8e8cb7f1e41e9c6fa5"
    );
    this.contract = new this.web3.eth.Contract(
      JSON.parse(this.abi),
      this.contractAddress
    ) as any as OwnerContract;
  }

  getContractAddress = () => this.contractAddress;

  getContractOwner = async () => {
    return await this.contract.methods.getOwner().call();
  };

  changeContractOwner = async (
    newOwnerAddress: string,
    previousOwnerPrivateKey: string,
    gasLimit: number,
    gasPriceGwei: number
  ) => {
    const previousOwnerAddress = await this.getContractOwner();
    // Build the transaction
    const txCount = await this.web3.eth.getTransactionCount(
      previousOwnerAddress
    );
    const txData: TxData = {
      nonce: this.web3.utils.toHex(txCount),
      to: this.contractAddress,
      data: this.contract.methods.changeOwner(newOwnerAddress).encodeABI(),
      gasLimit: this.web3.utils.toHex(gasLimit),
      gasPrice: this.web3.utils.toHex(
        this.web3.utils.toWei(gasPriceGwei.toString(), "gwei")
      ),
    };

    // Sign the transaction
    const tx = new Transaction(txData, { chain: "ropsten" });
    tx.sign(Buffer.from(previousOwnerPrivateKey, "hex"));
    const serializedTx = tx.serialize();
    const rawTx = "0x" + serializedTx.toString("hex");

    // Broadcast the transaction
    return await this.web3.eth.sendSignedTransaction(rawTx);
  };
}
