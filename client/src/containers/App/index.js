import React, { Component } from "react";
import "./App.css";
import { NavigationBar, Canvas, MyFiles, Upload } from "../../components";
import Login from "../../components/Login/login";
import FileType from "../../components/FileType";
import CanvasBanner from "../../images/canvasBanner.jpg";
import NavLink from "react-bootstrap/NavLink";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import { Overlay, Popover, OverlayTrigger } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from "axios";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import {
  getNodeAtPath,
  addNodeUnderParent,
  removeNodeAtPath
} from "react-sortable-tree";

// import Test from "../../components/MyFiles/example/app";

// const privateData = {
//   name: 'root',
//   toggled: true,
//   children: [
//       {
//           name: 'Contacts',
//           children: [
//               { name: 'Customers.csv' },
//               { name: 'Phone.csv' }
//           ]
//       },
//       {
//           name: 'Buyers',
//           children: [
//               {
//                   name: 'Schools',
//                   children: [
//                       { name: 'NJIT' },
//                       { name: 'Rutgers' }
//                   ]
//               }
//           ]
//       }
//   ]
// };
// const publicData = {
//   name: 'root',
//   toggled: true,
//   children: [
//       {
//           name: 'Items',
//           children: [
//               { name: 'Phones.csv' },
//               { name: 'Stocks.csv' }
//           ]
//       },
//       {
//           name: 'Sales',
//           children: [
//               {
//                   name: 'Newark',
//                   children: [
//                       { name: 'IHOP' },
//                       { name: 'GDS' }
//                   ]
//               }
//           ]
//       }
//   ]
// };
class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.attachRef = target => this.setState({target});
    
    this.state = {
      canvasTitle: "",
      file: "",
      loginState: false,
      username: "",
      password: "",
      upState: false,
      fileSection: "",
      dataChecks: false,
      publicList: [],
      privateList: [],
      header: [],
      data: [],
      showOverlay: false,
      //show: false,
      checked: false,
      treeData: [
        {
          title: "Private",
          children: [{ title: "Folder", children: [] }]
        }
      ],
      treeDataTwo: [
        {
          title: "Public",
          children: [{ title: "Folder", children: [] }]
        }
      ]
    };
    this.fileSelection = this.fileSelection.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.rightClick=this.rightClick.bind(this);
  }

  rightClick = (e) => {
    e.preventDefault();
    //const {showOverlay} = this.state;
    //this.setState({
    //  showOverlay: !showOverlay
    //});
    console.log("Right Click Acknowledged")
  }

  handleRightClick = async (e) => {
    e.preventDefault();
    // console.log("HSDF", file)
    await this.setState({target: e.target})
    // console.log("THIS IS TARGET", this.state.target)
    // const { file } = target.span.includes(".csv")
    // console.log("TESTING", Object.values(this.state.target)[1].children)
    try{
      if(Object.values(this.state.target)[1].children.includes(".csv")){
        await this.setState(s => ({ showOverlay: true }));
        await this.setState({file: Object.values(this.state.target)[1].children})
      }
      else{
        await this.setState(s => ({ showOverlay: false }));
        await this.setState({file: ""})
      }
    }
    catch(e){
      await this.setState(s => ({ showOverlay: false }));
      await this.setState({file: ""})
      // console.log("THIS IS THE ERROR", e)
    }
    // console.log(" THIS IS THE FILE", this.state.file)
  };

  loginBtn = () => {
    if (this.state.loginState) {
      this.setState({
        loginState: false
      });
    } else {
      this.setState({
        loginState: true
      });
    }
    // console.log(this.state.loginState);
  };  

  handleUserChange = e => {
    console.log("Asdfsad");
    console.log(e.target.value);
    this.setState({ username: e.target.value });
  };

  handlePassChange = e => {
    this.setState({ password: e.target.value });
  };

  loginSubmit = () => {
    if (this.state.loginState) {
      this.setState({
        loginState: false
      });
    } else {
      this.setState({
        loginState: true
      });
    }
    console.log("Login form submitted");
    console.log("Username: ", this.state.username);
    console.log("Password: ", this.state.password);
  };

  uploadFile = () => {
    if (this.state.upState) {
      this.setState({
        upState: false
      });
    } else {
      this.setState({
        upState: true
      });
    }
    // console.log(this.state.upState);
  };

  submitFileType = (fileName, fileType) => {
    console.log("File Name: ", fileName)
    console.log("File Type: ", fileType)
    this.setState(s => ({ showOverlay: !s.showOverlay }));
    // this.setState({ dataChecks: true });
  };

  componentDidMount() {
    // this.setState({ nextCanvas: false });
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    axios
      .get(
        "http://127.0.0.1:5000/listFiles",
        { label: "Test", text: "Test" },
        config
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fileSelection = async (e) => {
    console.log(e.props)
    if(e.props != undefined)  
    {
      if(e.props.children.includes('.csv')){
        this.setState({ canvasTitle: e.props.children });
        console.log(e, " file selected");
        let res = await axios.post(`http://127.0.0.1:5000/openFile`,  {"name": e.props.children})
        
        let header = res.data[0]
        let data = res.data[1]
        // await this.setState({ header: header })
        console.log("header",  header)
        console.log("data", data)
      }
    }
    //Create these 2 states
    // labels = []
    // data = []
    // Use axios to get the data of this csv from the backend
    // Store the first index  in labels, and the second index in data
    // Pass those variables to Canvas
    // Replace the variavles in Canvas to use the parameters
  };

  fileType = (e) => {
    //e.preventDefault()
    console.log("Right click")
  }

  //increment list with upload item whenever submit is clicked
  incrementOnUpload = fileName => {
    let flag = true;
    // make sure file with same name doesn't exist in public section/change later to update data instead
    for (var i in this.state.privateList) {
      if (this.state.privateList[i] === fileName.name) {
        flag = false;
      }
    }
    if (fileName !== undefined && flag) {
      const list = [...this.state.privateList, fileName.name];
      this.setState({
        privateList: list
      });
      console.log(list);
    }
  };

  move = (rowInfo) => {
    console.log(rowInfo.node.sub);

    let newList = this.state.treeDataTwo;
    newList[0].children[0].children.push(rowInfo.node);
    console.log(newList[0].children);
    this.setState({
      treeDataTwo: newList
    })
  }

  //move from private to public
  moveFile = rowInfo => {
    let title = rowInfo.node.sub;
    console.log(this.state.checked);
    console.log(this.state.treeDataTwo);
    let flag = true;
    // make sure file with same name doesn't exist in public section/change later to update data instead
    for (var i in this.state.publicList) {
      if (this.state.publicList[i] === title) {
        flag = false;
      }
    }
    console.log(this.state.publicList);
    if (flag) {
      if (title !== undefined) {
        const list = [...this.state.publicList, title];
        this.setState({
          publicList: list
        });
        this.move(rowInfo);
        console.log(list);
      }
      console.log(this.state.publicList);
    }
  };

  fillBottombar = item => {
    //map through list
    return (
      <li>
        <NavLink onClick={() => this.fileSelection("Public", item)}>
          {item}
        </NavLink>
      </li>
    );
  };

  checkboxTrigger = checkbox => {
    console.log(checkbox);
    if (checkbox === false) {
      this.setState({
        checked: false
      });
    } else {
      this.setState({
        checked: true
      });
    }
  };

  treeClick = name => {
    console.log(name);

    this.setState({
      canvasTitle: name,
      fileSection: "Private"
    });
  };

  onToggle(node, toggled){
    if(this.state.cursor){this.state.cursor.active = false;}
    node.active = true;
    if(node.children){ node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  onClick(e){
    console.log("askdfhbglsdf")
  }


  createNewTree = (tree, newFile) => {
    let newObj = tree;
    let obj;
    let list = [...this.state.privateList, newFile];
    let newList = [];
    let name = newFile;
    let number = 0;

    console.log(newFile);
    console.log(tree);

    list.map(item => {
      obj = {
        title: (
          <a
            href="#"
            onClick={() => {
              this.treeClick(item);
            }}
          >
            {item}
          </a>
        ),
        sub: item
      };

      newList.push(obj);
      console.log(obj);
    });
    console.log(list);
    newObj[0].children[0].children = newList;

    this.setState({
      treeData: newObj
    });

    // return list;
  };

  /////    /      //tree functions//      /    ////
  updateTreeData = treeData => {
    this.setState({
      treeData
    });
  };

  checkArrayUpdate = () => {
    //check for update button click through prop
    console.log(this.state.upState);
  };

  addNode = (rowInfo) => {
    console.log(rowInfo);
    let NEW_NODE = { title: "" };
    let { node, treeIndex, path } = rowInfo;
    path.pop();
    let parentNode = getNodeAtPath({
      treeData: this.state.treeData,
      path: path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      ignoreCollapsed: true
    });
    let getNodeKey = ({ node: object, treeIndex: number }) => {
      return number;
    };
    let parentKey = getNodeKey(parentNode);
    if (parentKey == -1) {
      parentKey = null;
    }
    let newTree = addNodeUnderParent({
      treeData: this.state.treeData,
      newNode: NEW_NODE,
      expandParent: true,
      parentKey: parentKey,
      getNodeKey: ({ treeIndex }) => treeIndex
    });
    this.setState({ treeData: newTree.treeData });
  };

  removeNode = (rowInfo) => {
    console.log(rowInfo)
    let newList = [];
    let { node, treeIndex, path } = rowInfo;
    for(let i in this.state.privateList){
      if(this.state.privateList[i] != rowInfo.node.sub){
        newList.push(this.state.privateList[i])
      }
    }
    console.log(newList)

    this.setState({
      treeData: removeNodeAtPath({
        treeData: this.state.treeData,
        path: rowInfo.path, // You can use path from here
        getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
          // console.log(number);
          return number;
        },

        ignoreCollapsed: false
      })
    });
    this.setState({
      privateList: newList
    })
  };
  

  checkNode = (rowInfo) => {
    console.log(rowInfo.treeIndex);
    if(rowInfo.treeIndex == 0){
      return
    }
    if (rowInfo.treeIndex == 1) {
      return [
        <div>
          <button label="Add" onClick={event => this.addNode(rowInfo)}>
            Add
          </button>
        </div>
      ];
    }
    if (rowInfo.treeIndex !== 0) {
      return [
        <div>
          <button label="Delete" onClick={event => this.removeNode(rowInfo)}>
            Remove
          </button>
          <button label="Add" onClick={event => this.addNode(rowInfo)}>
            Add
          </button>
          <button label="Move" onClick={event => this.moveFile(rowInfo)}>
            Move
          </button>
        </div>
      ];
    }
  };

  fileType = (e) => {
    //e.preventDefault()
    console.log("Right click")
  }

  render() {
    let login;
    const {showOverlay, target} = this.state;
    if (this.state.loginState === true) {
      login = (
        <div>
          <Login
            loginBtn={this.loginBtn}
            username={this.state.username}
            password={this.state.password}
            handleUserChange={this.handleUserChange}
            handlePassChange={this.handlePassChange}
            loginSubmit={this.loginSubmit}
          />
        </div>
      );
    }

    let upload;
    if (this.state.upState === true) {
      upload = (
        <div>
          <Upload
            uploadFile={this.uploadFile}
            incrementOnUpload={this.incrementOnUpload}
            createNewTree={this.createNewTree}
            treeData={this.state.treeData}
          />
        </div>
      );
    }

    return (
      <div style={{height: '100vh', backgroundImage: `url(${CanvasBanner})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <NavigationBar
          uploadFile={this.uploadFile}
          username={this.state.username}
          password={this.state.password}
          loginBtn={this.loginBtn}
        />

        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: "1" }}>
              <div style={{ height: 400, width: 400 }}>
                <SortableTree
                  treeData={this.state.treeData}
                  onChange={this.updateTreeData}
                  onMoveNode={({ node, treeIndex, path }) =>
                    global.console.debug(
                      "node:",
                      node,
                      "treeIndex:",
                      treeIndex,
                      "path:",
                      path
                    )
                  }
                  canDrag={({ node }) => !node.noDragging}
                  canDrop={({ node }) => !node.noDrop}
                  generateNodeProps={rowInfo => ({
                    buttons: this.checkNode(rowInfo),
                    //ref: this.attachRef,
                    onContextMenu: this.rightClick,
                    onContextMenu: this.handleRightClick,
                    onClick: () =>  this.fileSelection(rowInfo.node.title),
                    //onContextMenu: (e) => this.fileType()
                  })}
                  theme={FileExplorerTheme}
                />
                {/* {console.log("THIS IS THE TARGET", this.state.target)} */}
                <Overlay
                  show={this.state.showOverlay}
                  target={this.state.target}
                  placement="bottom"
                  container={this}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" title="File Type">
                    <FileType 
                      submitFileType={this.submitFileType}
                      file={this.state.file}
                    />
                  </Popover>
                </Overlay>

                {/*<Overlay target={target} show={showOverlay} placement="bottom">
                {props => (
                  <Popover title="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
                    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHH
                  </Popover>
                )}
                </Overlay>}
                {/*
                <FileType
                  show={this.state.showOverlay}
                  submitFileType={this.submitFileType}
                />
                */}
                <div style={{ height: 400, width: 400 }}>
                
                  <SortableTree
                    treeData={this.state.treeDataTwo}
                    onChange={treeDataTwo => this.setState({ treeDataTwo })}
                    onMoveNode={({ node, treeIndex, path }) =>
                      global.console.debug(
                        "node:",
                        node,
                        "treeIndex:",
                        treeIndex,
                        "path:",
                        path
                      )
                    }
                    canDrag={({ node }) => !node.noDragging}
                    canDrop={({ node }) => !node.noDrop}
                    canNodeHaveChildren={({ node }) => node.noCopy}
                    generateNodeProps={rowInfo => ({
                      buttons: this.checkNode(rowInfo),
                      //ref: this.attachRef,
                      onContextMenu: this.rightClick,
                      onContextMenu: this.handleRightClick,
                      onClick: () =>  this.fileSelection(rowInfo.node.title),
                      //onContextMenu: (e) => this.fileType()
                    })}
                    theme={FileExplorerTheme}
                  />
                  <Overlay
                  show={this.state.showOverlay}
                  target={this.state.target}
                  placement="bottom"
                  container={this}
                  containerPadding={20}
                >
                  <Popover id="popover-contained" title="File Type">
                    <FileType 
                      submitFileType={this.submitFileType}
                    />
                  </Popover>
                </Overlay>

                </div>
              </div>
            </div>
            {login}
            {upload}
            <div
              style={{
                flex: "9",
                backgroundImage: `url(require(${CanvasBanner}))`
              }}
            >
              <Canvas
                title={this.state.canvasTitle}
                fileSection={this.state.fileSection}
                next={this.nextCanvas}
                moveFile={this.moveFile}
                checkboxTrigger={this.checkboxTrigger}
              />
            </div>
          </div>
        </div>

        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div> */}
      </div>
    );
  }
};


export default App;
