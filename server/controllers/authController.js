const jwt = require("jsonwebtoken");

const User = require("../models/User");

const login = (req, res, next) => {
  const { email, pw } = req.body;
  let token;

  User.findOne({ email: email, password: pw })
    .then((user) => {
      if (user) {
        console.log(user);
        token = jwt.sign(
          { iss: user.name, sub: user._id, iat: new Date().getTime() },
          "code"
        );
        return res.send({ token });
      } else
        return res.status(403).json({ message: "Sai tai khoan hoac mat khau" });
    })
    .catch((err) => console.log(err));
};
const getProfile = (req, res) => {
  User.find(
    {},
    {
      _id: 1,
      name: 1,
    }
  ).exec((err, result) => {
    console.log(result, "result");
  });
  User.findById(req.userId)
    .then((user) => {
      console.log(user);
      if (user) {
        return res.status(200).json({ data: user });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Error" });
    });
};
const sigup = (req, res, next) => {
  const { email, pw, fullname } = req.body;
  console.log(email, "email");
  console.log(pw, "pw");
  console.log(fullname, "ffff");
  // User.find().then((data) => console.log(data));
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const newUser = new User({
          fullname,
          email,
          password: pw,
        });
        newUser.save();
        res.status(200).json({ message: "dang ky thanh cong" });
      } else {
        res.status(403).json({ message: "Email da ton tai" });
      }
    })
    .catch((err) => res.status(500).json({ message: err }));
};
module.exports = {
  login,
  sigup,
  getProfile,
};
