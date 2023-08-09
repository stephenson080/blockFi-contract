import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import { config } from "dotenv";

config();

const hardhatConfig: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [`${process.env.PRIVATE_KEY1}`],
    },
  },
  gasReporter: {
    currency: "CHF",
    gasPrice: 21,
    enabled: true,
  },
};

export default hardhatConfig;
