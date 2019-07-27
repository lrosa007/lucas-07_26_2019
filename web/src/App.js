import React, { Component, createRef } from "react";

// Styles
import "./App.css";

const fileListToArray = list => {
  const array = [];
  for (var i = 0; i < list.length; i++) {
    array.push(list.item(i));
  }
  return array;
};

const sendRequest = file => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.upload.addEventListener("load", _event => {
      resolve(req.response);
    });

    req.upload.addEventListener("error", _event => {
      reject(req.response);
    });

    const formData = new FormData();
    formData.append("file", file, file.name);

    req.open("POST", "http://localhost:4000/documents");

    req.send(formData);
  });
};

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
        style={{ cursor: disabled ? "default" : "pointer" }}
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          onFilesAdded={files => {
            try {
              const promises = files.map(file => sendRequest(file));

              Promise.all(promises);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </header>
    </div>
  );
}

export default App;
