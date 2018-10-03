var fs = require("fs");
var csv = require("fast-csv");

var publicKeys = [];
var amounts = [];
var stream = fs.createReadStream("accounts.csv");

var index = 0;
var groupKey = [];
var groupAmount = [];
var csvStream = csv()
  .on("data", function(data) {
    groupKey.push(data[0]);
    groupAmount.push(data[2]);
    index++;
    if (index == 10) {
      publicKeys.push(groupKey);
      amounts.push(groupAmount);
      index = 0;
      groupKey = [];
      groupAmount = [];
    }
  })
  .on("end", function() {
    console.log(publicKeys);
    console.log(amounts);
  });
stream.pipe(csvStream);
