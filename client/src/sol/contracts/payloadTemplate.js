export default `
pragma solidity >= 0.5.0;
contract Payload {
    event Test1(uint a);
    function () external payable {
        PUT_CODE_HERE
    }

    function kill() external {
        selfdestruct(msg.sender);
    }
}
`