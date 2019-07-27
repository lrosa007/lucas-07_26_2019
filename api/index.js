const express = require("express");

const app = express();
const PORT = 3000;

const tempData = [
  {
    name: "Upload 1"
  },
  {
    name: "Upload 2"
  },
  {
    name: "Upload 3"
  }
];

app.get("/", (_req, res) => res.status(200).json({ data: tempData }));

app.listen(PORT, () => console.log(`Upload API Running on port: ${PORT} 🚀`));
