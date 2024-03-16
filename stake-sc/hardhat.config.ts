import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: ALCHEMY_API_KEY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
    },
  },
};

export default config;


// StakeTokenModule#ERC20Token - 0xa43219063dE1CAEfd06B4dbb9E4941Cb40f96Ce5
// StakeRewardTokenModule#ERC20Token - 0xB41ebA4E68a21A63102e35Cb6D62E6EA8a1A21Df
// StakeRewardTokenModule#StakingPool - 0x1DDFa38613be576B546b4642768292cdC0991573

// px hardhat ignition deploy ignition/modules/Lock.ts --network sepolia --deployment-id sepolia-deployment
// npx hardhat ignition verify sepolia-deployment

// OR

// npx hardhat ignition deploy ignition/modules/Lock.ts --network sepolia --verify