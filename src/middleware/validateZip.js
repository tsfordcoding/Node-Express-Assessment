function validateZip(req, res, next) {
  const getZoos = require("./../utils/getZoos");
  const zip = req.params.zip;

  if (zip.length !== 5 || isNaN(Number(zip))) {
    next(`Zip (${zip}) is invalid!`);
  } else if (!getZoos(zip)) {
    next(`${zip} does not exist in our records.`);
  } else {
    next();
  }
}

module.exports = validateZip;
