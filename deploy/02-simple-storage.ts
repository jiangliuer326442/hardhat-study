import { ethers } from "hardhat";

module.exports = async ({ getNamedAccounts, deployments }) => {

    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const deployResult = await deploy('SimpleStorage', {
        from: deployer,
        args: [],
        log: true,
    });

    log("SimpleStorage.deployResult.address:", deployResult.address);
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.attach(deployResult.address);
    await simpleStorage.store(42);
    const storedValue = await simpleStorage.retrieve();
    log("Stored value:", storedValue.toString());

    await simpleStorage.addPerson("Alice", 30);
};
module.exports.tags = ['SimpleStorage'];