var CoinCrotToken = artifacts.require("./CoinCrotToken.sol");

contract("CoinCrotToken", function(accounts){
    var tokenInstance;

    it('initializes the contract with the correct values', function(){
        return CoinCrotToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'CoinCrotToken');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'CCT', 'has the corret');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, 'CCT v1.0', 'has the correct standard');
        })
    });

    it('set the total supply', function(){
        return CoinCrotToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSuply();
        }).then(function(totalSuply){
            assert.equal(totalSuply.toNumber(), 100000, 'set the total supply');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 100000, 'it allocates the inital supply')
        });
    });

    it('transfers token onership', function() {
        return CoinCrotToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.transfer.call(accounts[1], 999999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
            return tokenInstance.transfer.call(accounts[1], 25000, { from: accounts[0] });
        }).then(function(success) {
            assert.equal(success, true, 'it returns true');
            return tokenInstance.transfer(accounts[1], 25000, {from: accounts[0]});
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triffers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "transfer" event');
            assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the token are transferred to');
            assert.equal(receipt.logs[0].args._value, 25000, 'logs the transfer value');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 25000, 'adds the amout to the receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 75000, 'deduct the amount from the sending account');
        })
    });



});