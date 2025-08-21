import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { FundMe, MockV3Aggregator } from "../typechain";

describe("FundMe", function () {

    let fundMe: FundMe, mockV3Aggregator: MockV3Aggregator;
    let myDeployer;

    beforeEach(async function () {
        let { deployer } = await getNamedAccounts();
        myDeployer = deployer;
        console.log("deployer:", myDeployer);
        const deployment = await deployments.fixture(["mock", "FundMe"]);
        fundMe = await ethers.getContractAt("FundMe", deployment.FundMe.address);
        mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", deployment.MockV3Aggregator.address);
    })

    describe("constructor", function () {
        it("sets the aggregator addresses correctly", async function () {
            const response = await fundMe.priceFeed();
            assert.equal(response, mockV3Aggregator.address);
        });
    });

    describe("fund", function () {
        it("fails if you don't send enough ETH", async function () {
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!");
        });

        it("updated the amount funded data structure", async function () {
            const sendValue = ethers.utils.parseEther("0.1");
            await fundMe.fund({ value: sendValue });
            const response = await fundMe.addressToAmountFunded(myDeployer.address);
            assert.equal(response.toString(), sendValue.toString());
        });
    });

});