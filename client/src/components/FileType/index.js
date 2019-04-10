import React from 'react'

const FileType = () => (
    <Form>
    <h5>Select the type of file:</h5>
    <Form.Group>
      <Form.Check
        type="radio"
        name="fileType"
        value="master"
        label="Master"
        onChange={this.handleFileType}
        checked={fileType === "master"}
      />
      <Form.Check
        type="radio"
        name="fileType"
        value="transactional"
        label="Transactional"
        onChange={this.handleFileType}
        checked={fileType === "transactional"}
      />
    </Form.Group>
    {fileSection == "Private" ? (
      <>
        <h5>
          Would you like to make the file available to everyone?
        </h5>
        <Form.Check
          type="checkbox"
          label="Make the file Public"
          onChange={this.handlePublic}
          checked={!publicFile}
        />
      </>
    ) : (
      <></>
    )}
    <div style={{ float: "right" }}>
      
      <Button
        onClick={e => {
          next(fileType, publicFile);
          this.props.moveFile(this.props.canvasTitle);
        }}
      >
        Next
      </Button>
    </div>
  </Form>
);

export default FileType;