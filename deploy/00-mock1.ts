import { network } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";

module.exports = async ({ getNamedAccounts, deployments }) => {

    if (developmentChains.includes(network.name)) {
        const { deploy, log } = deployments;
        const { deployer } = await getNamedAccounts();

        const deployResult = await deploy('MockV3Aggregator', {
            from: deployer,
            args: [8, 200000000000],
            log: true,
        });
        log("MockV3Aggregator.deployResult.address:", deployResult.address);
    }

};
module.exports.tags = ['mock'];