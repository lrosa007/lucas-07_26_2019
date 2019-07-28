import React, { Component } from 'react';
import classnames from 'classnames';

// Utils
import fileListToArray from 'utils/fileListToArray';

// Styles
import styles from './styles.module.css';

const uploadClasses = ({ disabled }) =>
  classnames(styles.upload, { [styles.disabled]: disabled });

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
        className={uploadClasses({ disabled })}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
      >
        <label className={styles.label} for="files">
          UPLOAD
        </label>
        <input
          id="files"
          type="file"
          multiple
          className={styles.input}
          onChange={this.onFilesAdded}
        />
      </div>
    );
  }
}

export default Upload;
