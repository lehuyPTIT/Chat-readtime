const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const io = require("socket.io")(server);
const cors = require("cors");

require("./connect-mongo");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const authRouter = require("./router/authRoutes");
const Middlewares = require("./service/middlewares");
const AuthControllers = require("./controllers/authController");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("tiny"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/sigup", AuthControllers.sigup);
app.use("/api", Middlewares.checkLogin, authRouter);

let users = [];
let custom_id = 1;
io.use(async (socket, next) => {
  let token = socket.handshake.query.auth;

  next(null, true);
});

require("./controllers/socket")(io, users);
server.listen(PORT, () => console.log("app listen " + PORT));
