// Add the web3 node module
var airdropABI = require("./airdrop_abi");
var Tx = require("ethereumjs-tx");
var Web3 = require("web3");
var Account = require("./getAccount");
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/75bdcbca0b894b1ebed5777a506bbfea"
  )
);

var publicKey = "0x737522E8714FE572B03Ce15628bBccA7Acd80578";
var privateKey =
  "5604b5334c686e4596cf64300ad7b1d74ea0915d14023c03b1bba882c64c8671";
var contractAddress = "0x3218AF7Ad910C5D8e1511114013a8674dB83A021";
var nonce = web3.eth.getTransactionCount(publicKey);
var contract = web3.eth.contract(airdropABI.contractAbi).at(contractAddress);

Account.getAccounts(function(recipients, amounts) {
  sendTokens(publicKey, privateKey, recipients[0], amounts[0]);
});

function sendTokens(
  sender_publicKey,
  sender_privateKey,
  recipient_publicKey,
  amount
) {
  var privateKey = Buffer.from(sender_privateKey, "hex");
  var receivingAddr = sender_publicKey;
  var txValue = web3.toHex(web3.toWei("0", "ether"));

  var txData = contract.airdropToken.getData(recipient_publicKey, amount);

  var rawTx = {
    from: sender_publicKey,
    to: contractAddress,
    nonce: web3.toHex(nonce), // Nonce is the times the address has transacted, should always be higher than the last nonce 0x0#
    gasPrice: web3.toHex(90e9), // Normal is '0x14f46b0400' or 90 GWei
    gasLimit: web3.toHex(3000000), // Limit to be used by the transaction, default is '0x55f0' or 22000 GWei
    value: txValue, // The value we are sending '0x16345785d8a0000' which is 0.1 Ether
    data: txData,
    chainId: 3 // The data to be sent with transaction, '0x6f6820686169206d61726b' or 'oh hai mark'
  };

  console.log(rawTx); // This is used for testing to see if the rawTx was formmated created properly, comment out the code below to use.

  var tx = new Tx(rawTx);
  tx.sign(privateKey); // Here we sign the transaction with the private key

  var serializedTx = tx.serialize(); // Clean things up a bit  0x14bbc949c9123778b57af1b5cf291795969d48c39720a33bd2132598781b9d7e

  console.log(serializedTx.toString("hex")); // Log the resulting raw transaction hex for debugging if it fails to send

  web3.eth.sendRawTransaction("0x" + serializedTx.toString("hex"), function(
    err,
    hash
  ) {
    console.log(err);
    console.log(hash);
  });
}
