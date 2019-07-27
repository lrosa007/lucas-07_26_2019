const { IncomingForm } = require("formidable");
const uuid = require("uuid");

// DB
const db = require("./db");

// Config
const { maxByteSize } = require("./config");

module.exports.index = (req, res) => {
  const documents = db.listDocuments(req.query);

  res.status(200).json({
    data: documents,
  });
};

module.exports.create = (req, res) => {
  const form = new IncomingForm();

  form.on("file", (field, file) => {
    const document = {
      id: uuid.v4(),
      size: file.size,
      location: file.path,
      name: file.name,
    };

    if (document.size > maxByteSize) {
      res
        .status(402)
        .json({ data: `File to large, Max Size is ${maxByteSize} bytes` });
    } else {
      db.addDocument(document);

      res.status(200).json();
    }
  });

  form.parse(req);
};

module.exports.destroy = (req, res) => {
  const document = db.findDocument(req.params.id);

  if (document) {
    db.deleteDocument(document);

    res.status(200).json({ data: `${document.id} removed` });
  } else {
    res.status(404).json({ data: "Document Not Found" });
  }
};
