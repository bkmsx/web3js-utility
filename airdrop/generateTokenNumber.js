var fs = require("fs");
var csv = require("fast-csv");
var random = require("./_RandomNumber");

var csvStream = csv.createWriteStream({ headers: true }),
  writableStream = fs.createWriteStream("_tokens.csv");

writableStream.on("finish", function() {
  console.log("DONE!");
});
const maxCap = 2500000;
const walletNumber = 12000;
csvStream.pipe(writableStream);
var total = 0;
for (var i = 0; i < walletNumber; i++) {
  var remainWallet = walletNumber - i;
  var max = (maxCap - total) / remainWallet;
  var number = Math.floor(random.generateNumber(125, max, 0) / 5) * 5;
  total += number;
  console.log(number, number * 2);
  csvStream.write([number, number * 2]);
}
console.log(total);
csvStream.end();
