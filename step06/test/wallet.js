const Wallet = artifacts.require("Wallet.sol");

// const accounts = [
//   "0x6c6998396738dc03651b7bb0835a31dca3028adc",
//   "0x851aef87c30d722ae5b26d406bde3114e011c787",
//   "0x83880f7764b45da5af174db264afe0594bddb9c7",
//   "0x30f5e410ce7bd3653cc96667a3488fb23fb6fe23",
//   "0xdd11b469abf184d169270207ff6e61b906748449",
//   "0xd23ba5fc667076e881b65faec66ff1aa074850dd",
//   "0xaad5f33bec0ff45f9a1e16a3d9a75813c28b527c",
//   "0xfc5abe319b89e5e13e7083d2faea1d2d69294726",
//   "0x47231bfc8e0c99cd2c0694b1cce017021f151d68",
//   "0x8cf77db3ae0437a5391ea6f32a6b2002f712b7aa",
// ];

contract("Wallet", () => {
  it("Shoud execute", async () => {
    const wallet = await Wallet.new();
    const accounts = await web3.eth.getAccounts();

    // Add approvers
    await wallet.addApprover(accounts[0]);
    await wallet.addApprover(accounts[1]);
    await wallet.addApprover(accounts[2]);
    await wallet.addApprover(accounts[3]);
    await wallet.addApprover(accounts[4]);
    console.log("Approvers ==>", await wallet.getApprovers());

    // Add a new transaction
    console.log("Adding New Transaction ==>");
    await wallet.addTransaction(accounts[5], 50, { from: accounts[0] });
    console.log(await wallet.transactions(0));

    // Second approval
    console.log("Second Approval ==>");
    await wallet.approveTransaction(0, { from: accounts[1] });
    console.log(await wallet.transactions(0));

    // Third approval
    console.log("Third Approval ==>");
    await wallet.approveTransaction(0, { from: accounts[2], value: 100 });
    console.log(await wallet.transactions(0));
  });
});
