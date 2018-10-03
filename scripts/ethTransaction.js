/*
A script that will sign and broadcast an ethereum transaction to the network, then shows the result in the console.

WARNING!
If executed this script will send ether, be sure the info is correct before you run this!
Alternatively you should use a test net with test ether first before running this on the main net.

For an explanation of this code, navigate to the wiki https://github.com/ThatOtherZach/Web3-by-Example/wiki/Send-Ether-Transaction
*/

// Add the web3 node module
var Web3 = require("web3");
var fs = require("fs");
var csv = require("fast-csv");
// Show web3 where it needs to look for the Ethereum node.
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/75bdcbca0b894b1ebed5777a506bbfea"
  )
);

// An extra module is required for this, use npm to install before running
var Tx = require("ethereumjs-tx");
var addr = "0x737522E8714FE572B03Ce15628bBccA7Acd80578";
var nonce = web3.eth.getTransactionCount(addr);

var stream = fs.createReadStream("accounts.csv");
var csvStream = csv().on("data", function(data) {
  console.log("Transaction " + nonce + " :");
  console.log(data);
  sendETH(data[0], data[2]);
  nonce++;
});
stream.pipe(csvStream);

function sendETH(
  sender_publicKey,
  sender_privateKey,
  recipient_publicKey,
  amount
) {
  var privateKey = Buffer.from(
    "5604b5334c686e4596cf64300ad7b1d74ea0915d14023c03b1bba882c64c8671",
    "hex"
  );

  // The reciviing address of the transaction
  var receivingAddr = publicKey;

  // Value to be sent, converted to wei and then into a hex value
  var txValue = web3.toHex(web3.toWei(amount, "ether"));

  // Data to be sent in transaction, converted into a hex value. Normal tx's do not need this and use '0x' as default, but who wants to be normal?
  var txData = "0x";

  var rawTx = {
    from: addr,
    nonce: web3.toHex(nonce), // Nonce is the times the address has transacted, should always be higher than the last nonce 0x0#
    gasPrice: web3.toHex(90e9), // Normal is '0x14f46b0400' or 90 GWei
    gasLimit: web3.toHex(25000), // Limit to be used by the transaction, default is '0x55f0' or 22000 GWei
    to: receivingAddr, // The receiving address of this transaction
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
// Used to sign the transaction. Obviously you SHOULD better secure this than just plain text
