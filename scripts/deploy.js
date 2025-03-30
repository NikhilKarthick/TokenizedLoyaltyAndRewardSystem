
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const LoyaltyToken = await hre.ethers.getContractFactory("LoyaltyToken");
  const loyaltyToken = await LoyaltyToken.deploy(deployer.address); // Pass deployer as owner

  await loyaltyToken.deployed();

  console.log("LoyaltyToken deployed to:", loyaltyToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

