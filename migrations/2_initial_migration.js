const CoinCrotToken = artifacts.require("CoinCrotToken");
const CoinCrotTokenSale = artifacts.require("CoinCrotTokenSale");

module.exports = function(deployer) {
  deployer.deploy(CoinCrotToken, 100000).then(function(){
    var tokenPrice = 1000000000000000;
    return deployer.deploy(CoinCrotTokenSale,CoinCrotToken.address, tokenPrice);
  });
};
