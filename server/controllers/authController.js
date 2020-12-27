const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Message = require("../models/Message");
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
  ).exec((err, result) => {});
  User.findById(req.userId)
    .populate("friendsList")
    .then((user) => {
      console.log(user);
      if (user) {
        return res.status(200).json({ data: user });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error" });
    });
};
const sigup = (req, res, next) => {
  const { email, pw, fullname } = req.body;
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
const search = (req, res, next) => {
  const name = req.query.name;
  if (!name) return res.status(200).json({ data: [], success: true });
  User.find(
    { fullname: { $regex: name }, _id: { $ne: req.userId } },
    {
      _id: 1,
      fullname: 1,
      request: 1,
      sendRequest: 1,
      friendsList: 1,
    }
  ).exec((err, result) => {
    let data = [];

    data = result.map((user) => {
      let check = 0;
      if (user.request.indexOf(req.userId) !== -1) check = 1;
      if (user.sendRequest.indexOf(req.userId) !== -1) check = 2;
      if (user.friendsList.indexOf(req.userId) !== -1) check = 3;
      return { _id: user._id, fullname: user.fullname, check: check };
    });
    return res.status(200).json({ data: data, success: true });
  });
};
const getListMess = (req, res, next) => {
  const id = req.params.id;
  Message.find().exec((err, doc) => {});
  Message.find({
    $or: [
      {
        sender: "5fe2c0f1cb97d22890a46f60",
        receiver: "5fe2c0f1cb97d22890a46f60",
      },
      {
        sender: "5fe2c0f1cb97d22890a46f60",
        receiver: "5fe2b04ecb97d22890a46f5f",
      },
    ],
  }).exec((err, message) => {});
};
const addFriend = (req, res, next) => {
  const id = req.params.id;
};
module.exports = {
  login,
  sigup,
  getProfile,
  search,
  addFriend,
  getListMess,
};
