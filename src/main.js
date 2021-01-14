const {Transaction, Blockchain} = require('./blockchain');

const cherryCoin = new Blockchain();

const tr1 = new Transaction('address1', 'address2', 25);
const tr2 = new Transaction('address3', 'address2', 15);

cherryCoin.addTransaction(tr1);
cherryCoin.addTransaction(tr2);

cherryCoin.minePendingTrasactions('address4');

console.log('address1 balance: ' + cherryCoin.getBalanceOfAddress('address1'));
console.log('address2 balance: ' + cherryCoin.getBalanceOfAddress('address2'));
console.log('address3 balance: ' + cherryCoin.getBalanceOfAddress('address3'));
console.log('address4 balance: ' + cherryCoin.getBalanceOfAddress('address4'));

console.log(JSON.stringify(cherryCoin, null, 4));
