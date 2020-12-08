const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://lehuy123:anhhuyyh1@cluster0.vnxvs.mongodb.net/chat-app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      console.log("Connect to Database failer");
    } else {
      console.log("Connect to Database success");
    }
  }
);
