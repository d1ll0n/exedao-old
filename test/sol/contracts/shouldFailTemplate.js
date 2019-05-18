module.exports = `
pragma solidity >= 0.5.0;
contract Payload {
    uint[] arr;
    function () external payable {
        arr.push(20);
    }
    

    function kill() external {
        selfdestruct(msg.sender);
    }
}
`