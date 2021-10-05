import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import Web3 from "web3";
import { injector } from "./components/wallet";
import { Account } from "./components/account";
import "./App.css";

const App = () => {
  const {
    activate,
    active,
    deactivate,
    error,
    library: web3,
    account,
  } = useWeb3React<Web3>();
  const isEthereumInstalled = !(error instanceof NoEthereumProviderError);
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const connect = async () => {
    await activate(injector);
    setErrorMsg("");
  };
  const disconnect = () => {
    deactivate();
    setErrorMsg("");
  };
  const sendEthers = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      if (!receiver || !amount) {
        throw new Error("Receiver and amount are required!");
      }
      if (!account || !web3) {
        throw new Error("Connect to MetaMask wallet!");
      }
      await web3.eth.sendTransaction({
        from: account,
        to: receiver,
        value: web3.utils.toWei(amount.toString(), "ether"),
      });
      setReceiver("");
      setAmount(0);
    } catch (error) {
      console.log({ error });
      if (typeof error === "object") {
        const _err = error as any;
        setErrorMsg(_err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <button onClick={connect} disabled={active}>
            Connect to MetaMask
          </button>
          <button onClick={disconnect} disabled={!active}>
            Disconnect
          </button>
        </div>
        {!isEthereumInstalled && <p id="error">MetaMask not installed!</p>}
        <Account />
        <input
          name="receiver"
          value={receiver}
          onChange={e => setReceiver(e.target.value)}
          placeholder="Receiver's Public Address"
        />
        <input
          name="amount"
          value={amount}
          onChange={e => setAmount(+e.target.value)}
          placeholder="Amount of ETH to send..."
          type="number"
        />
        <button onClick={sendEthers} disabled={loading}>
          Send
        </button>
        {errorMsg && <p id="error">{errorMsg}</p>}
      </header>
    </div>
  );
};

export default App;
