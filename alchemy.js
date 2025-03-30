import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "KbBuyegCDkhxy0Z3yCATv04Hw0ugCkfw",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get all NFTs owned by the provided address or ENS domain
const nfts = alchemy.nft.getNftsForOwner("vitalik.eth");