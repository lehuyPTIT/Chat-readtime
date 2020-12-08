const sendMessage = (socket, data) => {
  socket.emit("new-message", { data });
};
module.exports = {
  sendMessage,
};
