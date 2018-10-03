var rn = require("random-number");
exports.generateNumber = function() {
  var options = {
    // example input , yes negative values do work
    min: 0,
    max: 0.1
  };
  var number = rn(options);
  return number.toPrecision(4);
};
