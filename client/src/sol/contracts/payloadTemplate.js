module.exports = `
pragma solidity >= 0.5.0;
contract Payload {
    event TestEvent(uint abc);
    function () external payable {
        PUT_CODE_HERE
    }
    

    function kill() external {
        selfdestruct(msg.sender);
    }
}
`