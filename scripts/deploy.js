// const hre = require("hardhat");

// async function main() {

//   const Chatapp = await hre.ethers.deployContract("Chatapp");

//   await Chatapp.waitForDeployment();

//   console.log(
//     ` Contract Address: ${Chatapp.address}`
//   );
// }


// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const token = await ethers.deployContract("Chatapp");

  console.log("Token address:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });