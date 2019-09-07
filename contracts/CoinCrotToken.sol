pragma solidity ^0.5.1;


contract CoinCrotToken{
    string public name = "CoinCrotToken";
    string public symbol = "CCT";
    string public standard = "CCT v1.0";
    uint256 public totalSuply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSuply) public{
        balanceOf[msg.sender] = _initialSuply;
        totalSuply = _initialSuply;
    }

    function transfer(address _to, uint256 _value)public returns(bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    
        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}