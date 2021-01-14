const {Block, Blockchain} = require('./blockchain');

const cherryCoin = new Blockchain();

const block1 = new Block(Date.now(), {amount: 20});

cherryCoin.addNewBlock(block1);

const block2 = new Block(Date.now(), {amount: 13});

cherryCoin.addNewBlock(block2);

console.log(JSON.stringify(cherryCoin, null, 4));
console.log("Is blockchain valid? " + cherryCoin.isChainValid());

console.log();
console.log("Doing hacks...");
block1.data = {amount: 10};
block1.hash = block1.calculateHash();

console.log();
console.log(JSON.stringify(cherryCoin, null, 4));
console.log("Is blockchain valid? " + cherryCoin.isChainValid());
