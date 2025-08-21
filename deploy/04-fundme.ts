import { ethers, network } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";

import { verify } from "../utils/index";
import { networkConfig } from "../helper-hardhat-config";

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();

    let ethUsdPriceFeed;
    if (developmentChains.includes(network.name)) {
        const MockV3Aggregator = await get("MockV3Aggregator");
        ethUsdPriceFeed = MockV3Aggregator.address;
    } else {
        ethUsdPriceFeed = networkConfig[network.config.chainId!]["ethUsdPriceFeed"]
    }


    const deployResult = await deploy('FundMe', {
        from: deployer,
        args: [ethUsdPriceFeed],
        log: true,
    });

    // if (!developmentChains.includes(network.name)) {
    //     await verify(deployResult.address, [ethUsdPriceFeed]);
    // }

    // log("FundMe.deployResult.address:", deployResult.address);
    // const contractAddress = deployResult.address;
    // const [feeCollector] = await ethers.getSigners();
    // const amount = ethers.utils.parseEther("0.045");
    // const tx = await feeCollector.sendTransaction({
    //     to: contractAddress,
    //     value: amount,
    //     gasLimit: 111000
    // });
    // await tx.wait();
};
module.exports.tags = ['FundMe'];