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

}

class Blockchain {
    constructor() {
        this.chain = [];
        this.createGenisysBlock();
    }

    createGenisysBlock() {
        const genisys = new Block(Date.now(), {}, "0");
        this.chain.push(genisys);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
