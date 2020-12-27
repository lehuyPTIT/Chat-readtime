const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: { type: String, default: "" },
  email: { type: String, unique: true },
  password: { type: String, default: "", unique: false },
  userImage: { type: String, default: "https://picsum.photos/200/300" },
  request: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  sendRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  friendsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

const User = new mongoose.model("users", userSchema);
module.exports = User;
