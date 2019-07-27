import React, { Component } from 'react';

// Utils
import fileListToArray from 'utils/fileListToArray';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = { highlighted: false };
  }

  onFilesAdded = event => {
    const { disabled, onFilesAdded } = this.props;

    if (disabled) return;

    const files = event.target.files;

    if (onFilesAdded) {
      const array = fileListToArray(files);

      onFilesAdded(array);
    }
  };

  onDragOver = event => {
    const { disabled } = this.props;

    event.preventDefault();

    if (disabled) return;

    this.setState({ hightlight: true });
  };

  onDragLeave = _event => {
    this.setState({ hightlight: false });
  };

  onDrop = event => {
    const { disabled, onFilesAdded } = this.props;

    event.preventDefault();

    if (disabled) return;

    const files = event.dataTransfer.files;

    if (onFilesAdded) {
      const array = fileListToArray(files);

      onFilesAdded(array);
    }

    this.setState({ hightlight: false });
  };

  render() {
    const { disabled } = this.props;

    return (
      <div
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <label for="files" style={{ color: 'black' }}>
          UPLOAD
        </label>
        <input
          id="files"
          type="file"
          style={{ visibility: 'hidden' }}
          onChange={this.onFilesAdded}
        />
      </div>
    );
  }
}

export default Upload;
