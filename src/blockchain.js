const SHA256 = require('crypto-js/sha256');

class Transaction {

    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

}

class Block {

    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenisysBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenisysBlock() {
        const genisys = new Block(Date.now(), [], "0");
        return genisys;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTrasactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = new Transaction(null, miningRewardAddress, this.miningReward);
    }

    addTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(let block of this.chain) {
            for(let transaction of block.transactions) {
                if(transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }

                if(transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];
            
            if(current.hash !== current.calculateHash()) {
                return false;
            }

            if(current.previousHash !== previous.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports.Transaction = Transaction;
module.exports.Blockchain = Blockchain;
