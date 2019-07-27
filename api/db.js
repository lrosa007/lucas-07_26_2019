let data = [];

module.exports.listDocuments = filters => {
  return Object.entries(filters).reduce((documents, [name, value]) => {
    return documents.filter(
      document => !document[name] || document[name].includes(value)
    );
  }, data);
};

module.exports.addDocument = document => {
  data = [document, ...data];

  return data;
};

module.exports.findDocument = id => {
  return data.find(document => document.id === id);
};

module.exports.deleteDocument = document => {
  data = data.filter(doc => doc.id !== document.id);

  return data;
};
