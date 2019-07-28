const fs = require("fs");
const uuid = require("uuid");

// Data
let data = require("./.documents/data.json");

module.exports.listDocuments = async filters => {
  return Object.entries(filters).reduce((documents, [name, value]) => {
    return documents.filter(
      document => !document[name] || document[name].includes(value)
    );
  }, data);
};

module.exports.addDocument = async document => {
  const id = uuid.v4();

  const location = `./.documents/${id}__${document.name}`;

  fs.copyFile(document.tempPath, location, err => {
    if (err) throw err;

    console.log(`DB: ${document.name} was copied to .documents`);
  });

  delete document.tempPath;

  data = [{ ...document, location, id }, ...data];

  fs.writeFile("./.documents/data.json", JSON.stringify(data), err => {
    if (err) throw err;

    console.log(`DB: Inserted Document ${data.id}`);
  });

  return document;
};

module.exports.findDocument = async id => {
  return data.find(document => document.id === id);
};

module.exports.deleteDocument = async document => {
  data = data.filter(doc => doc.id !== document.id);

  fs.unlink(document.location, err => {
    if (err) throw err;

    console.log(`DB: ${document.name} was removed from .documents`);
  });

  fs.writeFile("./.documents/data.json", JSON.stringify(data), err => {
    if (err) throw err;

    console.log(`DB: Deleted Document ${document.id}`);
  });

  return document;
};
