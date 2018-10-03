// Require the web3 node module.
var Web3 = require("web3");
var fs = require("fs");
var csv = require("fast-csv");
var random = require("./random_number.js");
// Show Web3 where it needs to look for a connection to Ethereum.
web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/75bdcbca0b894b1ebed5777a506bbfea"
  )
);

var csvStream = csv.createWriteStream({ headers: true }),
  writableStream = fs.createWriteStream("accounts.csv");

writableStream.on("finish", function() {
  console.log("DONE!");
});

csvStream.pipe(writableStream);
for (var i = 0; i < 100; i++) {
  var account = web3.eth.accounts.create();
  console.log(
    account["address"],
    account["privateKey"],
    random.generateNumber()
  );
  csvStream.write([
    account["address"],
    account["privateKey"],
    random.generateNumber()
  ]);
}

csvStream.end();
