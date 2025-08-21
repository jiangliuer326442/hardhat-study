module.exports = async ({ getNamedAccounts, deployments, ethers }) => {

    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const deployResult = await deploy('Greeter', {
        from: deployer,
        args: ["Hello, world!"],
        log: true,
    });

    log("Greeter.deployResult.address:", deployResult.address);
};
module.exports.tags = ['Greeter'];