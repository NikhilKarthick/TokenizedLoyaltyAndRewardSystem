import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig, createConfig } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";
import { http, createPublicClient } from "viem";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import App from "./App";
import "./index.css";

// 🔹 Define Chains (Make Sure These Are Used)
const chains = [mainnet, polygon, sepolia];

// 🔹 Create a Single Public Client (Viem)
const publicClient = createPublicClient({
  chain: mainnet, // Default chain (change if needed)
  transport: http(),
});

// 🔹 Create Wagmi Config
const config = createConfig({
  autoConnect: true,
  publicClient, // Use the defined Viem client
});

// 🔹 Render the App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}> 
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
