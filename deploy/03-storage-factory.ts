import { ethers } from "hardhat";

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const deployResult = await deploy('StorageFactory', {
        from: deployer,
        args: [],
        log: true,
    });

    log("StorageFactory.deployResult.address:", deployResult.address);
    const StorageFactory = await ethers.getContractFactory("StorageFactory");
    const storageFactory = await StorageFactory.attach(deployResult.address);
    await storageFactory.createSimpleStorageContract();
    await storageFactory.createSimpleStorageContract();
    await storageFactory.sfStore(1, 79);
    const simpleStorageNumber = await storageFactory.sfGet(1);
    log("SimpleStorage number:", simpleStorageNumber.toString());
};
module.exports.tags = ['StorageFactory'];