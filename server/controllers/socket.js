module.exports = (io, users) => {
  io.on("connection", (socket) => {
    console.log("socket connect");
    console.log(socket.id, "socket.id");
    socket.on("list", (data) => {
      users.push(socket.id);
      io.emit("list-user", { users });
    });

    socket.on("disconnect", (reason) => {
      console.log("dis", socket);
    });

    socket.on("message-client", (data) => {
      console.log(socket.id);
      socket.emit("server-message", { message: "Hello " + socket.id });
    });

    socket.emit("server-message", { message: "Hello " + socket.id });
  });
};
