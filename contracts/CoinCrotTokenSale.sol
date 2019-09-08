pragma solidity ^0.5.1;

import "./CoinCrotToken.sol";

contract CoinCrotTokenSale{
    address admin;
    CoinCrotToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;

    event Sell(address _buyer, uint256 _amount);

    constructor(CoinCrotToken _tokenContract, uint256 _tokenPrice)public{
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    //Mulitply
    function multiply(uint x, uint y)internal pure returns(uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    //Buy Tokens
    function buyTokens(uint256 _numberOfTokens) public payable{
        
        // Require that value is equal to tokens
        require(msg.value == multiply(_numberOfTokens, tokenPrice));

        // Require that the contract has enough tokens
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens);

        // Require that a transfer is succesful
        require(tokenContract.transfer(msg.sender, _numberOfTokens));


        // Keep track of tokenSold
        tokenSold += _numberOfTokens;

        // Trigger Sell Event
        emit Sell(msg.sender, _numberOfTokens);
    }

}