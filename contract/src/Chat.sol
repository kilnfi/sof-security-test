// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Chat {
    string[] private _messages;

    function messages() public view returns (string[] memory) {
        return _messages;
    }

    function reset() public {
        delete _messages;
    }

    function sendMessage(string calldata message) public {
        _messages.push(message);
    }

    function renderMessages() public view returns (string memory) {
        string memory html = "";

        html = string.concat(html, "<ul>");

        for (uint256 i = 0; i < _messages.length; i++) {
            html = string.concat(html, "<li>");

            string memory message = "";

            for (uint256 j = 0; j < bytes(_messages[i]).length; j++) {
                if (
                    bytes(_messages[i])[j] != "(" &&
                    bytes(_messages[i])[j] != ")"
                ) {
                    message = string.concat(
                        message,
                        string(abi.encodePacked(bytes(_messages[i])[j]))
                    );
                }
            }

            html = string.concat(html, message);
            html = string.concat(html, "</li>");
        }

        html = string.concat(html, "</ul>");

        return html;
    }
}
