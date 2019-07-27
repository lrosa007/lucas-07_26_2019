import React, { Component, createRef } from 'react';

// Utils
import fileListToArray from 'utils/fileListToArray';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = { highlighted: false };
    this.inputRef = createRef();
  }

  openFileDialog = () => {
    const { disabled } = this.props;

    if (disabled) return;

    this.inputRef.current.click();
  };

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
        onClick={this.openFileDialog}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.inputRef}
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
      </div>
    );
  }
}

export default Upload;