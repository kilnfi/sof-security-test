// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console2} from "forge-std/Test.sol";
import {Chat} from "../src/Chat.sol";

contract ChatTest is Test {
    Chat public chat;

    function setUp() public {
        chat = new Chat();
    }

    function test_sendMessage() public {
        chat.sendMessage("toto");
        chat.sendMessage("tata");

        string[] memory messages = chat.messages();

        assertEq(messages.length, 2);
        assertEq(messages[0], "toto");
        assertEq(messages[1], "tata");
    }

    function test_renderMessages() public {
        chat.sendMessage("toto");
        chat.sendMessage("tata");

        string memory html = chat.renderMessages();

        assertEq(html, "<ul><li>toto</li><li>tata</li></ul>");
    }

    function test_tryXss() public {
        chat.sendMessage("<script>toto()</script>");

        string memory html = chat.renderMessages();
        assertEq(html, "<ul><li><script>toto</script></li></ul>");
    }
}
