const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  message: { type: String },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  senderName: { type: String },
  receiverName: { type: String },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Message = new mongoose.model("messages", messageSchema);
module.exports = Message;
