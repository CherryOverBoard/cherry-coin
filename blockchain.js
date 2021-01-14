const SHA256 = require('crypto-js/sha256');

class Block {

    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
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
    }

    createGenisysBlock() {
        const genisys = new Block(Date.now(), {}, "0");
        return genisys;
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
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

module.exports.Block = Block;
module.exports.Blockchain = Blockchain;
