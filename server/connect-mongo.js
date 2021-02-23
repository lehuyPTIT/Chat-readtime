const mongoose = require("mongoose");
console.log(process.env.PORT, "env");
mongoose.connect(
    process.env.URL_MONGO_DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    (err) => {
        if (err) {
            console.log("Connect to Database failer");
        } else {
            console.log("Connect to Database success");
        }
    }
);
