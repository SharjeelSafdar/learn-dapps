import { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import MetaMaskOnboarding from "@metamask/onboarding";

const web3 = new Web3(Web3.givenProvider);

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [receiverAccount, setReceiverAccount] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async () => {
      if (window && MetaMaskOnboarding.isMetaMaskInstalled()) {
        if (Web3.givenProvider) {
          const accounts = await web3.eth.getAccounts();
          if (accounts.length) {
            setAccount(accounts[0]);
            const balance = await web3.eth.getBalance(accounts[0]);
            const convertedBalance = web3.utils.fromWei(balance, "ether");
            setBalance(+convertedBalance);
          }
        }
      }
    })();
  }, []);

  const installMetaMask = async () => {
    try {
      const onboarding = window && new MetaMaskOnboarding();
      window && onboarding && onboarding.startOnboarding();
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const getAccount = async () => {
    setLoading(true);
    try {
      if (window) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAccount(account);
      }
    } catch (error) {
      console.log("Error ==>", error);
    } finally {
      setLoading(false);
    }
  };

  const sendEther = async (receiverAccount: string, value: number) => {
    setLoading(true);
    if (account && receiverAccount && value) {
      try {
        const dataToSend = {
          from: account,
          to: receiverAccount,
          value: web3.utils.toWei(value.toString(), "ether"),
        };
        await web3.eth.sendTransaction(dataToSend);
        setReceiverAccount("");
        setValue(0);
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      {account ? (
        <>
          <h3>Connected Account: {account}</h3>
          <h3>Balance: {balance}</h3>
          <input
            type="text"
            name="receiverAccount"
            onChange={e => setReceiverAccount(e.target.value)}
            className="inputs"
            placeholder="Receiver Public Address"
            maxLength={42}
          />
          <input
            type="number"
            name="value"
            onChange={e => setValue(+e.target.value)}
            className="inputs"
            placeholder="Amount of Ethers to Send"
            min={1}
            max={2}
          />
          {loading ? (
            <button className="loading" disabled={true}>
              Loading...
            </button>
          ) : (
            <button
              className="sendEthereumButton"
              onClick={() =>
                receiverAccount && value && sendEther(receiverAccount, value)
              }
            >
              Send Ether
            </button>
          )}
        </>
      ) : window && MetaMaskOnboarding.isMetaMaskInstalled() ? (
        loading ? (
          <button className="loading" disabled={true}>
            Loading ...
          </button>
        ) : (
          <button className="enableEthereumButton" onClick={getAccount}>
            Enable Ethereum
          </button>
        )
      ) : (
        <button className="enableEthereumButton" onClick={installMetaMask}>
          Install MetaMask
        </button>
      )}
    </div>
  );
}

export default App;
