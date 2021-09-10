import { FC, useEffect, useState, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

export const Account: FC = () => {
  const { active, account, library: web3 } = useWeb3React<Web3>();
  const [balance, setBalance] = useState(0);
  const getBalance = useCallback(async () => {
    if (active && web3 && account) {
      let b = await web3.eth.getBalance(account);
      b = web3.utils.fromWei(b, "ether");
      b = parseFloat(b).toPrecision(5);
      setBalance(+b);
    }
  }, [active, web3, account]);

  useEffect(() => {
    getBalance();
    web3 &&
      web3.eth.subscribe("newBlockHeaders", async (err, blockHeader) => {
        if (err) {
          console.log("Error in getting balance!");
        } else {
          await getBalance();
          console.log(`Block #${blockHeader.number}`);
        }
      });
  }, [web3, getBalance]);

  return (
    <>
      <p>{active ? `Connected with ${account}` : "Not Connected"}</p>
      {active && <p>Account Balance: {balance} ETH</p>}
    </>
  );
};
