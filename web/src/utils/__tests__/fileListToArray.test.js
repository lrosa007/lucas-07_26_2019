import fileListToArray from '../fileListToArray';

describe('fileListToArray', () => {
  it('transforms a list into an array', () => {
    const blob = new Blob([''], { type: 'text/html' });

    blob.lastModifiedDate = '';
    blob.name = 'filename';

    const file = blob;

    const fileList = {
      0: file,
      1: file,
      length: 2,
      item: index => file,
    };

    expect(fileListToArray(fileList)).toEqual([file, file]);
  });
});
