const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Message = require("./models/Message");

module.exports = (io, users) => {
  io.on("connection", (socket) => {
    // get all request add friends
    socket.on("getRequest", function () {
      User.findOne({ _id: socket.userId }, { request: 1, _id: 0 }).exec(
        (err, data) => {
          console.log(data, "request");
          if (err) {
            return;
          } else socket.emit("request", [...data.request]);
        }
      );
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
              doc.sendRequest = [...doc.sendRequest, socket.userId];
              doc.save((err) => {
                if (!err) {
                  return;
                }
              });
            });
          }
        });
      });
    });

    socket.on("disconnect", (reason) => {
      console.log("dis", socket.id);
    });
  });
};
