import qs from 'query-string';

// Utils
import formatter from './formatter';

const maxByteSize = 10 * 1024 * 1024;
const allowedFileTypes = ['image/jpeg', 'image/png'];

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

export const uploadDocuments = files => {
  const allowed = files
    .filter(({ size }) => size <= maxByteSize)
    .filter(({ type }) => allowedFileTypes.includes(type));

  return Promise.all(allowed.map(file => uploadDocument(file)))
    .then(() => {
      const notAllowed = files.filter(
        ({ size, type }) =>
          size > maxByteSize || !allowedFileTypes.includes(type)
      );

      const sizeMessage = notAllowed.reduce(
        (acc, file, index) =>
          `${acc}\n ${index + 1}. ${file.name} - ${formatter(file.size)} - ${
            file.type
          }`,
        ''
      );

      if (notAllowed.length > 0) {
        alert(
          `Error Uploading Documents\nMax Size is 10mb\nOnly image/jpeg & image/png allowed.${sizeMessage}`
        );
      }
    })
    .catch(e => console.log(e));
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
