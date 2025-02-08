import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConnectWalletButton.scss";

import { connectMetamask } from "../../../utils/interact.js";
import { chainId } from "../../../utils/address";

export const ConnectWalletButton = () => {
  const [wallet, setWallet] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const [stage, setStage] = useState("connect");

  let walletAddr;

  useEffect(() => {
    connectWalletPressed();
    addWalletListener();
  });

  /************************************************************************************* */
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Wallet connected");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask.");
        }
      });
      window.ethereum.on("chainChanged", (chain) => {
        this.connectWalletPressed();
        if (chain !== chainId) {
        }
      });
    } else {
      let stat = (
        <p>
          {" "}
          🦊{" "}
          {/* <a target="_blank" href={`https://metamask.io/download.html`}> */}
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.(https://metamask.io/download.html)
          {/* </a> */}
        </p>
      );

      setStatus(stat);
    }
  };

  const connectWalletPressed = async () => {
    let walletResponse = await connectMetamask();
    // this.setState({
    //   status: walletResponse.status,
    //   wallet: walletResponse.address
    // })
    setWallet(walletResponse.address);
    setStatus(walletResponse.status);
    walletAddr = walletResponse.address;

    // alert(walletResponse.address)
    return walletResponse.address != null;
  };

  /************************************************************************************* */

  const handleConnect = async () => {
    if (loading) return;
    setLoading(true);
    await connectWalletPressed();
    setLoading(false);
  };

  return (
    <div className="ConnectWalletButton">
      <div className="u-container">
        {/* <div className="u-ribbon">Connect Wallet</div> */}
        <div className="u-content">
          <div className="u-content-container">
            {/* <div className="u-text">{arrInfo[stage].text}</div> */}
            {!wallet && (
              <div className="u-button" onClick={() => handleConnect()}>
                {loading ? "Loading..." : "Connect"}
              </div>
            )}
            {wallet && <div>You wallet address: {wallet}</div>}
            {status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletButton;
