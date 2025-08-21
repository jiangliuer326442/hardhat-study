//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.8;

import "./ExtraStorage.sol";

contract StorageFactory {
    ExtraStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public {
        ExtraStorage simpleStorage = new ExtraStorage();
        simpleStorageArray.push(simpleStorage);
    }

    function sfStore(
        uint256 _simpleStorageIndex,
        uint256 _simpleStorageNumber
    ) public {
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
}
