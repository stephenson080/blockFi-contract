import { ethers } from "hardhat";

async function main() {
  const signers = await ethers.getSigners();
  const BlocFi = await ethers.getContractFactory("BlocFi");
  const blockFi = await BlocFi.deploy();

  await blockFi.deployed();

  console.log(
    `Contract deployed to ${blockFi.address} by ${signers[0].address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
