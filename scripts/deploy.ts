import { ethers, run } from "hardhat";
require("dotenv").config({ path: ".env" });

async function main() {
  const Shop = await ethers.getContractFactory("Shop");
  const shop = await Shop.deploy(process.env.ETH_USD_CHAINLINK);

  await shop.deployed();

  console.log(`Shop contract is deployed to ${shop.address}`);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await sleep(20000); // wait for 20s to have the contract propagated before verifying

  try {
    await run("verify:verify", {
      address: shop.address,
      constructorArguments: [process.env.ETH_USD_CHAINLINK],
    });
  } catch (err) {
    console.log(err);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
