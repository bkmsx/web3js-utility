var fs = require("fs");
var csv = require("fast-csv");
var stream = fs.createReadStream("accounts.csv");
var csvStream = csv().on("data", function(data) {
  console.log(data[0]);
  console.log(data[1]);
});
stream.pipe(csvStream);
