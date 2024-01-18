// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Chat} from "../src/Chat.sol";

contract DeployChatScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        Chat chat = new Chat();
        chat.sendMessage("First message!");
        console2.log(address(chat));
        vm.stopBroadcast();
    }
}
