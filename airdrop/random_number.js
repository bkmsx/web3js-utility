var rn = require("random-number");
exports.generateNumber = function(min, max, precision) {
  var options = {
    // example input , yes negative values do work
    min: min,
    max: max,
    integer: true
  };
  var number = rn(options);
  if (precision == 0) {
    return number;
  } else {
    return number.toPrecision(precision);
  }
};
