import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import LoyaltyTokenABI from "./LoyaltyTokenABI.json";

const CONTRACT_ADDRESS = "0xbfc5C48f146490d7c96D848d287fef07767eF45a";

export default function App() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState("0");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isConnected) getBalance();
  }, [isConnected]);

  const getBalance = async () => {
    if (!window.ethereum) return alert("MetaMask not installed");
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LoyaltyTokenABI, provider);
      const bal = await contract.balanceOf(address);
      setBalance(ethers.utils.formatEther(bal));
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleTransaction = async (action) => {
    if (!amount) return alert("Enter amount");
    if (!window.ethereum) return alert("MetaMask not installed");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Ensure wallet is connected
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, LoyaltyTokenABI, signer);

      let txn;
      if (action === "issue") {
        txn = await contract.issueTokens(address, ethers.utils.parseEther(amount));
      } else {
        txn = await contract.redeemTokens(address, ethers.utils.parseEther(amount));
      }

      await txn.wait();
      getBalance();
    } catch (error) {
      console.error(`Error during ${action} transaction:`, error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">Loyalty Rewards</h1>
        <ConnectButton />
        {isConnected && (
          <>
            <p className="text-lg mt-4">Wallet: {address}</p>
            <p className="text-lg">Balance: {balance} LTK</p>
            <input
              type="number"
              className="border rounded p-2 w-full mt-4"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full"
              onClick={() => handleTransaction("issue")}
            >
              Issue Tokens
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2 w-full"
              onClick={() => handleTransaction("redeem")}
            >
              Redeem Tokens
            </button>
          </>
        )}
      </div>
    </div>
  );
}
