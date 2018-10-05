// Require the web3 node module.
var Web3 = require("web3");
var fs = require("fs");
var csv = require("fast-csv");
var random = require("./_RandomNumber");
// Show Web3 where it needs to look for a connection to Ethereum.
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/75bdcbca0b894b1ebed5777a506bbfea"
  )
);

var csvStream = csv.createWriteStream({ headers: true }),
  writableStream = fs.createWriteStream("_accounts.csv");

writableStream.on("finish", function() {
  console.log("DONE!");
});
const maxCap = 2500000;
const walletNumber = 12000;
csvStream.pipe(writableStream);
var total = 0;
for (var i = 0; i < walletNumber; i++) {
  var account = web3.eth.accounts.create();
  // var remainWallet = walletNumber - i;
  // var max = (maxCap - total) / remainWallet;
  // var number = Math.floor(random.generateNumber(125, max, 0) / 5) * 5;
  // total += number;
  console.log(account["address"], account["privateKey"]);
  csvStream.write([
    account["address"],
    account["privateKey"]
    // number,
    // number * 2
  ]);
}
// console.log(total);
csvStream.end();
