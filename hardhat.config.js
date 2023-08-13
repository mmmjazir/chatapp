require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();




module.exports = {
  solidity: "0.8.19",
  networks: {
    buildbear: {
      url: "https://rpc.buildbear.io/cool-nute-gunray-214590ae",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      buildbear: "verifyContract",
    },
    customChains: [
      {
        network: "buildbear",
        chainId: 10309,
        urls: {
          apiURL: "https://rpc.buildbear.io/verify/etherscan/cool-nute-gunray-214590ae",
          browserURL: "https://explorer.buildbear.io/cool-nute-gunray-214590ae",
        },
      },
    ],
  }
};






// module.exports = {
//   solidity: "0.8.19",
//   networks: {
//     sepolia: {
//       url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
//       accounts:[`${process.env.PRIVATE_KEY}`]
//     }
//   }
// };