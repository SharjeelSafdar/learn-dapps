import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [install, setInstall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState("");

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

  return (
    <div className="App">
      {account ? (
        <h3>Connected Account: {account}</h3>
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
