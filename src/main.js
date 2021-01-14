const {Transaction, Blockchain} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const cherryCoin = new Blockchain();

const addr1 = ec.genKeyPair();
const addr2 = ec.genKeyPair();
const addr3 = ec.genKeyPair();
const addr4 = ec.genKeyPair();

const tr1 = new Transaction(addr1.getPublic('hex'), addr2.getPublic('hex'), 25);
const tr2 = new Transaction(addr3.getPublic('hex'), addr2.getPublic('hex'), 15);

tr1.signTransaction(addr1);
tr2.signTransaction(addr3);

cherryCoin.addTransaction(tr1);
cherryCoin.addTransaction(tr2);

cherryCoin.minePendingTrasactions('address4');

console.log(addr1.getPublic('hex') + ' balance: ' + cherryCoin.getBalanceOfAddress(addr1.getPublic('hex')));
console.log(addr2.getPublic('hex') + ' balance: ' + cherryCoin.getBalanceOfAddress(addr2.getPublic('hex')));
console.log(addr3.getPublic('hex') + ' balance: ' + cherryCoin.getBalanceOfAddress(addr3.getPublic('hex')));
console.log(addr4.getPublic('hex') + ' balance: ' + cherryCoin.getBalanceOfAddress(addr4.getPublic('hex')));

console.log(JSON.stringify(cherryCoin, null, 4));
