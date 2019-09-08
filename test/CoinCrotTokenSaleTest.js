var CoinCrotTokenSale = artifacts.require("CoinCrotTokenSale");

contract('CoinCrotTokenSale', function(accounts){
    var tokenSaleInstance;
    var tokenPrice = 1000000000000000; //price in wei
    it('initializes the contract with the correct values', function() {
        return CoinCrotTokenSale.deployed().then(function(instance) {
          tokenSaleInstance = instance;
          return tokenSaleInstance.tokenContract();
        }).then(function(address) {
          assert.notEqual(address, 0x0, 'has token contract address');
          return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
          assert.equal(price, tokenPrice, 'token price is correct');
        });
    });
})