import qs from 'query-string';

export const uploadDocument = file => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.upload.addEventListener('load', _event => {
      resolve(req.response);
    });

    req.upload.addEventListener('error', _event => {
      reject(req.response);
    });

    const formData = new FormData();
    formData.append('file', file, file.name);

    req.open('POST', 'http://localhost:4000/documents');

    req.send(formData);
  });
};

export const searchDocuments = query => {
  const queryString = qs.stringify(query);

  return fetch(`http://localhost:4000/documents?${queryString}`)
    .then(res => res.json())
    .then(({ data }) => ({
      count: data.length,
      totalSize: data.reduce((total, doc) => {
        return total + doc.size;
      }, 0),
      documents: data,
    }));
};

export const deleteDocument = id => {
  return fetch(`http://localhost:4000/documents/${id}`, {
    method: 'delete',
  });
};
