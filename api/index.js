const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { IncomingForm } = require("formidable");

const app = express();
const PORT = 4000;

app.use(morgan("combined"));

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200
  })
);

let tempData = [
  {
    id: "1",
    name: "Upload 1"
  },
  {
    id: "2",
    name: "Upload 2"
  },
  {
    id: "3",
    name: "Upload 3"
  }
];

app.get("/documents", (req, res) => {
  res.status(200).json({
    data: Object.entries(req.query).reduce((documents, [name, value]) => {
      return documents.filter(
        document => !document[name] || document[name].includes(value)
      );
    }, tempData)
  });
});

app.post("/documents", (req, res) => {
  const form = new IncomingForm();

  form.on("file", (field, file) => {
    console.log(file);
  });

  form.on("end", () => {
    res.status(200).json();
  });

  form.parse(req);
});

app.delete("/documents/:id", (req, res) => {
  tempData = tempData.filter(document => document.id !== req.params.id);

  res.status(200).json();
});

app.listen(PORT, () => console.log(`Upload API Running on port: ${PORT} 🚀`));
