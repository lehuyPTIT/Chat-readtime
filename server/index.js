const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const io = require("socket.io")(server);
const cors = require("cors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
require("./connect-mongo");
const PORT = process.env.PORT || 5000;

const authRouter = require("./router/authRoutes");
const Middlewares = require("./service/middlewares");
const AuthControllers = require("./controllers/authController");

app.use(
    cors({
        credentials: true,
        origin: "https://chat-realtime-client.herokuapp.com",
    })
);
app.use(morgan("tiny"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.all("/", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get("/", (req, res) => {
    return res.send("Server running!");
});
app.post("/sigup", AuthControllers.sigup);
app.post("/login", AuthControllers.login);
app.use("/api", Middlewares.checkLogin, authRouter);

let users = [];
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    jwt.verify(token, "code", function (err, decoded) {
        if (err) {
            return res.send({ message: err });
        }
        if (!decoded) {
            return res.send({ message: "Athouthezion" });
        } else {
            socket.userId = decoded.sub;
            next();
        }
    });
});
require("./socket")(io, users);

server.listen(PORT, () => console.log("app listen " + PORT));
