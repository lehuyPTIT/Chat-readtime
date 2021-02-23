const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  var host = req.headers["authorization"];

  jwt.verify(host, "code", function (err, decoded) {
    if (err) {
      console.log("xac thuc sai");
      return res.send({ message: err });
    }
    if (!decoded) {
      console.log("Decode sai");
      return res.send({ message: "Athouthezion" });
    } else {
      req.userId = decoded.sub;
      next();
    }
  });
};

module.exports = {
  checkLogin,
};
