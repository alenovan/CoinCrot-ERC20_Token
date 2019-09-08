pragma solidity ^0.5.1;

import "./CoinCrotToken.sol";

contract CoinCrotTokenSale{
    address admin;
    CoinCrotToken public tokenContract;
    uint256 public tokenPrice;

    constructor(CoinCrotToken _tokenContract, uint256 _tokenPrice)public{
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
}