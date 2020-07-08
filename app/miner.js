const Wallet = require('../wallet'); 
const Transaction = require('../wallet/transaction');

class Miner {
    constructor(blockchain,transactionPool,wallet,p2pServer){
      this.blockchain = blockchain,
      this.transactionPool = transactionPool;
      this.wallet = wallet;
      this.p2pServer = p2pServer;  
    }

    mine(){
        const validTransaction = this.transactionPool.validTransactions();
        // include a reward for the miner
        validTransaction.push(Transaction.rewardTransaction(this.wallet,Wallet.blockchainWallet()));
        //create a block consisting of the valid transaction
        const block =  this.blockchain.addBlock(validTransaction);
        //synchronize chains in the peer-to-peer server
        this.p2pServer.syncChains();
        //clear the transaction pool
        this.transactioPool.clear();
        //broadcast to every miner to clear their transaction pools 
        this.p2pServer.brodcastClearTransaction(); 
        return block;
    }
}

module.exports = Miner;