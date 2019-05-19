pragma solidity >= 0.5.0;
pragma experimental ABIEncoderV2;

contract M3gaWallet {
  struct PendingCall {
    mapping(address => bool) voters;
    uint yesVotes;
  }
  mapping(bytes32 => PendingCall) public payloads;
  mapping(address => bool) public isOwner;
  address[] public owners;
  uint public threshold;
  event PayloadExecuted(bytes payload);

  constructor(address[] memory _owners, uint _threshold) public {
    for (uint i = 0; i < _owners.length; i++) {
        address owner = _owners[i];
        isOwner[owner] = true;
        owners.push(owner);
    }
    threshold = _threshold;
  }

  function getPayloadStatus (bytes calldata payload) external view returns
  (uint) {
    bytes32 payloadHash = keccak256(payload);
    return payloads[payloadHash].yesVotes;
  }

  function getOwners() public view returns(address[] memory) {
    address[] memory _owners = new address[](owners.length);
    for (uint i = 0; i < owners.length; i++) _owners[i] = owners[i];
    return _owners;
  }

  function () external payable {
    require(isOwner[msg.sender], "User not approved.");
    bytes32 payloadHash = keccak256(msg.data);
    PendingCall storage proposal = payloads[payloadHash];
    require(!proposal.voters[msg.sender], "User has already voted.");
    proposal.voters[msg.sender] = true;
    proposal.yesVotes += 1;
    if (proposal.yesVotes < threshold) return;
    proposal.yesVotes = 0;
    for (uint i = 0; i < owners.length; i++) proposal.voters[owners[i]] = false;
    emit PayloadExecuted(msg.data);
    assembly {
      let size := calldatasize
      let ptr := mload(0x40)
      let start := add(ptr, size)
      calldatacopy(ptr, 0, size)
      let i := 0
      for { } lt(i, size) { i := add(i, 1) } {
        let op := shr(248, mload(add(ptr, i)))
        switch op
        case 0x55 {
          // sstore handler -- no need to sstore, just revert
          mstore8(add(start, i), 0xfd)
        }
        default {
          let isPush := and(lt(op, 0x80), gt(op, 0x5f))
          if eq(isPush, 1) {
            mstore8(add(start, i), op)
            let sz := sub(33, sub(0x80, op))
            let bits := shr(sub(256, mul(sz, 8)), mload(add(add(ptr, 1), i)))
            mstore(add(add(start, i), 1), shl(sub(256, mul(sz, 8)), bits))
            i := add(i, sz)
          }
          if eq(isPush, 0) {
            mstore8(add(start, i), op)
          }
        }
      }
      let delegateTo := create(0, start, i)
      let delegateSuccess := delegatecall(gas, delegateTo, ptr, 0, ptr, 0)
      mstore(ptr, 0x41c0e1b500000000000000000000000000000000000000000000000000000000)
      let selfdestructSuccess := call(gas, delegateTo, 0, ptr, 0x20, ptr, 0)
      if eq(and(delegateSuccess, selfdestructSuccess), 0) {
        revert(0, 0)
      }
    }
  }
}
