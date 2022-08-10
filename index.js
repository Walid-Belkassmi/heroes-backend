const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = 5000;

app.use(morgan("tiny"));
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
