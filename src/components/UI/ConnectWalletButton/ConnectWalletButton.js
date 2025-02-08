import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ConnectWalletButton.scss";
import { gameModes, userTypes } from "../../../utils/constant";

import {
  connectMetamask,
  connectWallet,
  getCurrentWalletConnected,
} from "../../../utils/interact.js";
import {
  chainId,
  llgContractAddress,
  llgRewardContractAddress,
} from "../../../utils/address";

let arrInfo = {};

export const ConnectWalletButton = () => {
  const [wallet, setWallet] = useState();
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  const [stage, setStage] = useState("connect");

  let amount;
  let walletAddr;

  useEffect(() => {
    addWalletListener();
  });

  /************************************************************************************* */
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          // this.setState({
          //   wallet: accounts[0],
          //   status: "Wallet connected",
          // });
          setWallet(accounts[0]);
          setStatus("Wallet connected");
        } else {
          // this.setState({
          //   wallet: "",
          //   status: "🦊 Connect to Metamask.",
          // });
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

            <div className="u-button" onClick={() => handleConnect()}>
              {loading ? "Loading..." : "Connect"}
            </div>
            <div>
              {wallet}
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWalletButton;
