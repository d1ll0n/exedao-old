pragma solidity >= 0.5.0;
pragma experimental ABIEncoderV2;

contract M3gastrar {
    mapping(address => address[]) public walletsByUser;

    function getWalletAddresses(address user)
    public view returns (address[] memory wallets)
    {
        address[] storage sWallets = walletsByUser[user];
        wallets = new address[](sWallets.length);
        for (uint i = 0; i < sWallets.length; i++) wallets[i] = sWallets[i];
    }

    function addWalletAddress(address wallet) public {
        walletsByUser[msg.sender].push(wallet);
    }
}