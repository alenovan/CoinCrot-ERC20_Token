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
    event Approvel(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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

    function approve(address _spender, uint256 _value) public returns(bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approvel(msg.sender, _spender, _value);
        return true;
    }

   function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
       require(_value <= balanceOf[_from]);
       require(_value <= allowance[_from][msg.sender]);
       balanceOf[_from] -= _value;
       balanceOf[_to] += _value;
       allowance[_from][msg.sender] -= _value;
       emit Transfer(_from, _to, _value);
       return true;
   }
}