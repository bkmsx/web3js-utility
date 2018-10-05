var fs = require("fs");
var csv = require("fast-csv");

exports.getAccounts = function(callback) {
  var publicKeys = [];
  var amounts = [];
  var stream = fs.createReadStream("_accounts_tokens.csv");

  var index = 0;
  var groupKey = [];
  var groupAmount = [];
  var csvStream = csv()
    .on("data", function(data) {
      groupKey.push(data[0]);
      groupAmount.push(data[2]);
      index++;
      if (index == 100) {
        publicKeys.push(groupKey);
        amounts.push(groupAmount);
        index = 0;
        groupKey = [];
        groupAmount = [];
      }
    })
    .on("end", function() {
      if (groupKey.length != 0) {
        publicKeys.push(groupKey);
        amounts.push(groupAmount);
      }
      callback(publicKeys, amounts);
    });
  stream.pipe(csvStream);
};
