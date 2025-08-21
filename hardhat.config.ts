import * as dotenv from "dotenv";

import 'hardhat-deploy';
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
// import "@nomicfoundation/hardhat-verify"

import "./tasks";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.8",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/ZNgnhTTA2JO77B7gk6vQU",
      chainId: 11155111,
      accounts: [process.env.SEPOLIA_ACCOUNT!],
    }
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: process.env.SEPOLIA_SCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
