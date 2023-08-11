import { ethers } from "ethers";
import { Address, MUMBAI_RPC } from "../utils/constants.mjs";
import { ABI } from "../utils/ABI.mjs";
import { config } from "dotenv";

config();

async function main() {
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY1,
    new ethers.providers.JsonRpcProvider(MUMBAI_RPC)
  );
  const contract = new ethers.Contract(
    Address,
    ABI,
    new ethers.providers.JsonRpcProvider(MUMBAI_RPC)
  );
  const trx = await contract
    .connect(wallet)
    .manageInstitutionAccount("address", true);
  await trx.wait(1);
  console.log("Success.......");
  console.log(`Verified to ${trx.hash} by ${wallet.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
