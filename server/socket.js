const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Message = require("./models/Message");

module.exports = (io, users) => {
  io.on("connection", (socket) => {
    users[socket.userId] = socket.id;
    // get all request add friends
    console.log("connect", socket.id);
    socket.on("getRequest", function () {
      User.findOne({ _id: socket.userId }, { request: 1 })
        .populate({ path: "request", select: "_id fullname userImage" })
        .exec((err, data) => {
          if (err) {
            return;
          } else socket.emit("request", [...data.request]);
        });
    });
    // send requet add friends

    socket.on("sendRequest", (id) => {
      User.findById(socket.userId, function (err, doc) {
        if (err) {
          return;
        }
        doc.sendRequest = [...doc.sendRequest, id];
        doc.save((err) => {
          if (!err) {
            User.findById(id, function (err, doc) {
              if (err) {
                return;
              }
              doc.request = [...doc.request, socket.userId];
              doc.save((err) => {
                if (!err) {
                  User.findOne({ _id: id }, { request: 1 })
                    .populate({
                      path: "request",
                      select: "_id fullname userImage",
                    })
                    .exec((err, data) => {
                      if (!err) {
                        if (users[id])
                          socket
                            .to(users[id])
                            .emit("request", [...data.request]);
                      }
                    });
                }
              });
            });
          }
        });
      });
    });
    // Accept add friends
    socket.on("accept-friend", (id) => {
      User.findById(socket.userId, function (err, doc) {
        if (err) {
          return;
        }
        doc.request = [...doc.request.filter((item) => item != id)];
        doc.friendsList = [...doc.friendsList, id];
        doc.save((err) => {
          if (!err) {
            User.findById(id, function (err, user) {
              if (err) {
                return;
              }
              user.sendRequest = [
                ...user.sendRequest.filter((item) => item != socket.userId),
              ];
              user.friendsList = [...user.friendsList, socket.userId];
              user.save((err) => {
                if (!err) {
                  if (users[id]) socket.to(users[id]).emit("friends");
                  socket.emit("friends");
                  return;
                }
              });
            });
          }
        });
      });
    });

    // send message friend
    socket.on("new-message", (message) => {
      message.createdAt = new Date();
      const mes = new Message({ ...message });
      mes.save((err, doc) => {
        if (!err)
          socket.to(users[message.receiver]).emit("new-message", message);
      });
    });
    // client disconect
    socket.on("disconnect", (reason) => {
      console.log("dis", socket.id);
    });
  });
};
