import { deployments, ethers } from "hardhat";
import { expect, assert } from "chai";

import { SimpleStorage } from "../typechain";

describe("SimpleStorage", function () {

    let simpleStorage: SimpleStorage;
    beforeEach(async function () {
        const deployment = await deployments.fixture(["SimpleStorage"]);
        simpleStorage = await ethers.getContractAt("SimpleStorage", deployment.SimpleStorage.address);
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should work correctly with the people struct and array", async function () {
        const expectedPersonName = "Patrick"
        const expectedFavoriteNumber = 16
        const transactionResponse = await simpleStorage.addPerson(
            expectedPersonName,
            expectedFavoriteNumber
        )
        await transactionResponse.wait(1)
        const { favoriteNumber, name } = await simpleStorage.people(0)

        assert.equal(name, expectedPersonName)
        assert.equal(favoriteNumber, expectedFavoriteNumber)
    })
})