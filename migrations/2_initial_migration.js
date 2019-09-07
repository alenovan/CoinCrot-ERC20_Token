const CoinCrotToken = artifacts.require("CoinCrotToken");

module.exports = function(deployer) {
  deployer.deploy(CoinCrotToken, 100000);
};
