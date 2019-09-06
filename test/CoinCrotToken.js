var CoinCrotToken = artifacts.require("./CoinCrotToken.sol");

contract("CoinCrotToken", function(accounts){
    it('set the total supply', function(){
        return CoinCrotToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSuply();
        }).then(function(totalSuply){
            assert.equal(totalSuply.toNumber(), 100000, 'set the total supply');
        });
    });
})