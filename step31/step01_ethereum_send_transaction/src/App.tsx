import { useState, useEffect } from "react";
import "./App.css";
const unit = require("ethjs-unit");

function App() {
  const [install, setInstall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");
  const [receiverAccount, setReceiverAccount] = useState("");
  const [value, setValue] = useState(0);

  useEffect(() => {
    const window_ = window as any;
    if (window_ && window_.ethereum) {
      setInstall(true);
      if (window_.ethereum.selectedAddress) {
        setAccount(window_.ethereum.selectedAddress);
      }
      console.log(window_.ethereum);
    } else {
      setInstall(false);
    }
  }, []);

  const getAccount = async () => {
    setLoading(true);
    try {
      if (typeof window !== undefined) {
        const window_ = window as any;
        console.log("isMetaMask", window_.ethereum.isMetaMask);
        console.log("networkVersion", window_.ethereum.networkVersion);
        console.log("selectedAddress", window_.ethereum.selectedAddress);

        const accounts = await window_.ethereum.request({
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
    const window_ = window as any;
    const convertedValue = unit.toWei(value, "ether").toString(16);

    try {
      if (window) {
        const txParams = {
          to: receiverAccount,
          from: account,
          value: "0x" + convertedValue,
          chainId: window_.ethereum.networkVersion,
        };
        const txHash = await window_.ethereum.request({
          method: "eth_sendTransaction",
          params: [txParams],
        });

        console.log({ txHash });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {account ? (
        <>
          <h3>Connected Account: {account}</h3>
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
      ) : install ? (
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
        <h3>You have to install MetaMask!</h3>
      )}
    </div>
  );
}

export default App;
