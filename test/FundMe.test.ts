import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { FundMe, MockV3Aggregator } from "../typechain";

describe("FundMe", function () {

    let fundMe: FundMe, mockV3Aggregator: MockV3Aggregator;
    let deployer: string;

    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
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
            const response = await fundMe.addressToAmountFunded(deployer);
            assert.equal(response.toString(), sendValue.toString());
        });
        it("adds funder to array of getFunder", async function () {
            const sendValue = ethers.utils.parseEther("0.1");
            await fundMe.fund({ value: sendValue });
            const funder = await fundMe.funders(0);
            assert.equal(funder, deployer);
        });
    });

    describe("withdraw", async function () {
        beforeEach(async function () {
            const sendValue = ethers.utils.parseEther("0.1");
            await fundMe.fund({ value: sendValue });
        });

        it("withdraw ETH from a single funder", async function () {
            const startingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const startingDeployerBalance = await fundMe.provider.getBalance(deployer);
            const transactionResponse = await fundMe.withdraw();
            const transactionRecepipt = await transactionResponse.wait(1);
            const { gasUsed, effectiveGasPrice } = transactionRecepipt;
            const gasCost = gasUsed.mul(effectiveGasPrice);
            const endingFundMeBalance = await fundMe.provider.getBalance(fundMe.address);
            const endingDeployerBalance = await fundMe.provider.getBalance(deployer);
            assert.equal(endingFundMeBalance.toString(), "0");
            assert.equal(startingFundMeBalance.add(startingDeployerBalance).toString(), endingDeployerBalance.add(gasCost).toString());
        });
    });

});