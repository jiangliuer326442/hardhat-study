import { expect } from "chai";
import { deployments, ethers } from "hardhat";
import { Greeter } from "../typechain";

describe("Greeter", function () {

  let greeter: Greeter;
  beforeEach(async function () {
    const deployment = await deployments.fixture(["Greeter"]);
    greeter = await ethers.getContractAt("Greeter", deployment.Greeter.address);
  })

  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
