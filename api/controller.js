const { IncomingForm } = require("formidable");

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

module.exports.index = (req, res) => {
  res.status(200).json({
    data: Object.entries(req.query).reduce((documents, [name, value]) => {
      return documents.filter(
        document => !document[name] || document[name].includes(value)
      );
    }, tempData)
  });
};

module.exports.create = (req, res) => {
  const form = new IncomingForm();

  form.on("file", (field, file) => {
    console.log(file);
  });

  form.on("end", () => {
    res.status(200).json();
  });

  form.parse(req);
};

module.exports.destroy = (req, res) => {
  tempData = tempData.filter(document => document.id !== req.params.id);

  res.status(200).json();
};
