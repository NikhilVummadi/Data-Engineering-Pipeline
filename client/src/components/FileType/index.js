import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class FileType extends Component{
  constructor(props){
    super(props)
    this.state = {
      fileType: 'master',
      publicFile: false,
    }
  }

  handleFileType = async (e) => {
    await this.setState({fileType: e.target.value})
  }

  handlePublic = (e) => {
    const { publicFile } = this.state
    this.setState({ publicFile: !publicFile})
  }
  render(){ 
    const { file, submitFileType } = this.props
    const { fileType, publicFile } = this.state
    return  (
      <Form>
      <h5>Select the type of file:</h5>
      <Form.Group>
        <Form.Check type="radio" name="fileType" value="master" label="Master" onChange={this.handleFileType} checked={fileType === 'master'}/>
        <Form.Check type="radio" name="fileType" value="transactional" label="Transactional" onChange={this.handleFileType} checked={fileType === 'transactional'}/>
      </Form.Group>
      <div style={{float: "right",}}>
        <Button onClick={() => submitFileType(file, fileType)}>Next</Button>
      </div>
      </Form>
    );
  }
}

export default FileType;