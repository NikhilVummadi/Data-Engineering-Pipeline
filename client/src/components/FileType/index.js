import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class FileType extends Component{
  constructor(props){
    super(props);
    this.state = {
      type: "",
    }
  }

  render(){ 
    const { show, submitFileType } = this.props
    return  (
      <Form>
        <Form.Group>
        <Form.Check type="radio" label="Master" />
        <Form.Check type="radio" label="Transactional" />
        <Button type="submit" className="float-right" size="sm">
          Submit
        </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default FileType;