const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Message = require("../models/Message");

const { cloudinary } = require("../service/cloudinary");

const login = (req, res, next) => {
    const { email, pw } = req.body;
    let token;

    User.findOne({ email: email, password: pw })
        .then((user) => {
            if (user) {
                token = jwt.sign(
                    {
                        iss: user.name,
                        sub: user._id,
                        iat: new Date().getTime(),
                    },
                    "code"
                );
                return res.send({ token });
            } else
                return res
                    .status(403)
                    .json({ message: "Sai tai khoan hoac mat khau" });
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
    User.findById(req.userId, {
        fullname: 1,
        request: 1,
        sendRequest: 1,
        friendsList: 1,
        email: 1,
        address: 1,
        phoneNumber: 1,
        birthday: 1,
        sex: 1,
        userImage: 1,
    })
        .populate("friendsList", {
            fullname: 1,
            request: 1,
            sendRequest: 1,
            friendsList: 1,
            email: 1,
            address: 1,
            phoneNumber: 1,
            birthday: 1,
            sex: 1,
            userImage: 1,
        })
        .then((user) => {
            if (user) {
                return res.status(200).json({ data: user });
            }
        })
        .catch((err) => {
            return res.status(500).json({ message: "Error" });
        });
};

const updateProfile = async (req, res, next) => {
    try {
        const {
            fullname,
            email,
            address,
            phoneNumber,
            sex,
            birthday,
        } = req.body;
        const fileStr = req.body.imageUpload;
        const uploaderResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "chat_realtime",
        });
        console.log(uploaderResponse);
        console.log(req.userId);
        console.log({
            fullname,
            email,
            phoneNumber,
            address,
            birthday,
            sex,
            userImage: uploaderResponse.url,
        });
        User.findOneAndUpdate(
            { _id: req.userId },
            {
                fullname,
                email,
                phoneNumber,
                address,
                birthday,
                sex,
                userImage: uploaderResponse.url,
            },
            {},
            function (err, doc) {
                console.log(doc, "doc");
                if (err) console.log(err);
                if (err) return res.status(500).json({ error: err });
                return res
                    .status(200)
                    .json({ success: true, message: "Luu thanh cong" });
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ err: "Something went wrong" });
    }
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
            if (user.friendsList.indexOf(req.userId) !== -1) check = 1;
            if (user.sendRequest.indexOf(req.userId) !== -1) check = 2;
            if (user.request.indexOf(req.userId) !== -1) check = 3;

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
                sender: req.userId,
                receiver: id,
            },
            {
                sender: id,
                receiver: req.userId,
            },
        ],
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec((err, message) => {
            if (err) return res.status(500).json({ message: "Co loi xay ra" });
            return res.status(200).json({ data: message, success: true });
        });
};
const addFriend = (req, res, next) => {
    const id = req.params.id;
};
module.exports = {
    login,
    sigup,
    getProfile,
    updateProfile,
    search,
    addFriend,
    getListMess,
};
