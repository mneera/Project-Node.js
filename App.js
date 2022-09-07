const express = require("express");
const mongoose = require("mongoose");
const TaksRouter = require("./routes/Tasks");
const UsersRouter = require("./routes/Users");
const RoleTouter = require("./routes/Role");
const StatusTouter = require("./routes/Status")

require("dotenv").config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.CNSTRING, { useNewUrlParser: true });
// mongoose
//   .connect(process.env.CNSTRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((result) => app.listen(3000))
//   .catch((err) => console.log(err));

app.use("/Tasks", TaksRouter);
app.use("/Users", UsersRouter);
app.use("/Role", RoleTouter);
app.use("/Status", StatusTouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is working on port ${PORT}`);
});
