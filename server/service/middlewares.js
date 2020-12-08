const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  var host = req.headers["authorization"];
  jwt.verify(host, "code", function (err, decoded) {
    if (err) {
      return res.send({ message: err });
    }
    if (!decoded) {
      return res.send({ message: "Athouthezion" });
    } else {
      console.log(decoded);
      req.userId = decoded.sub;
      console.log(req.userId, "haha");
      next();
    }
  });
};

module.exports = {
  checkLogin,
};
