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
