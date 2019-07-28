const { IncomingForm } = require("formidable");

// DB
const db = require("./db");

// Config
const { allowedFileTypes, maxByteSize } = require("./config");

module.exports.index = (req, res) => {
  return db
    .listDocuments(req.query)
    .then(documents =>
      res.status(200).json({
        data: documents,
      })
    )
    .catch(e => {
      console.log(e);

      res.status(500).send("Internal Error");
    });
};

module.exports.create = (req, res) => {
  const form = new IncomingForm();

  form.maxFileSize = maxByteSize;

  form.on("file", (_field, file) => {
    if (file.size <= maxByteSize && allowedFileTypes.includes(file.type)) {
      db.addDocument({
        size: file.size,
        tempPath: file.path,
        name: file.name,
        type: file.type,
      })
        .then(document => {
          res.status(200).json({ data: `${document.id} successfully added` });
        })
        .catch(e => {
          console.log(e);

          res.status(500).send("Internal Error");
        });
    } else {
      res
        .status(402)
        .json({ data: `File to large, Max Size is ${maxByteSize} bytes` });
    }
  });

  form.parse(req);
};

module.exports.destroy = (req, res) => {
  return db.findDocument(req.params.id).then(document => {
    if (document) {
      db.deleteDocument(document)
        .then(() => {
          res.status(200).json({ data: `${document.id} removed` });
        })
        .catch(e => {
          console.log(e);

          res.status(500).send("Internal Error");
        });
    } else {
      res.status(404).json({ data: "Document Not Found" });
    }
  });
};
