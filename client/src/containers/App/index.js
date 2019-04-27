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
import Rename from "../../components/renameFile"
import {
  getNodeAtPath,
  addNodeUnderParent,
  removeNodeAtPath,
  insertNode,
  map,
  walk
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
      rename: false,
      row: '',
      addState: false,
      newName: '',
      //show: false,
      checked: false,
      folderCount: 1,
      treeData: [
        {
          title: "Private",
          children: []
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
    const {showOverlay} = this.state;
    this.setState({
      showOverlay: !showOverlay
    });
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
    // let newObj = tree;
    // let obj;
    // let list = [...this.state.privateList, newFile];
    // let newList;
    // let name = newFile;
    // let number = 0;

    // console.log(newFile);
    // console.log(tree);

    // list.map(item => {
    //   obj = {
    //     title: (
    //       <a
    //         href="#"
    //         onClick={() => {
    //           this.treeClick(item);
    //         }}
    //       >
    //         {item}
    //       </a>
    //     ),
    //     sub: item,
    //     type: 'file'
    //   };

    //   // newList.push(obj);
    //   console.log(obj);
    //   newObj[0].children.push(obj);  
    // });
    // console.log(list);
    
    let rowInfo = tree;
    console.log(tree)
    let NEW_NODE = {title: <a
              href="#"
              onClick={() => {
                this.treeClick(newFile);
              }}
            >{newFile}</a>
            , type: 'file'};
    let {node, treeIndex, path} = rowInfo;
    let parentNode = getNodeAtPath({
        treeData: this.state.treeData,
        path : path,
        getNodeKey: ({ treeIndex }) =>  treeIndex,
        ignoreCollapsed : true
    });
    
    let newTree = insertNode({
            treeData: this.state.treeData,
            depth: 1,
            minimumTreeIndex: 1,
            newNode: NEW_NODE,
            parentKey: null,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            expandParent: false
     });

    this.setState({
      treeData: newTree.treeData
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
    console.log(rowInfo.path.length)
    let currDepth = rowInfo.path.length+1;
    let NEW_NODE = {title: 'title', type: 'folder'};
    let {node, treeIndex, path} = rowInfo;
    path.pop();
    let parentNode = getNodeAtPath({
        treeData: this.state.treeData,
        path : rowInfo.path,
        getNodeKey: ({ treeIndex }) =>  treeIndex,
        ignoreCollapsed : true
    });
    let getNodeKey = ({ node: object, treeIndex: number }) => {
        return number;
    };
    let parentKey = getNodeKey(parentNode);
    if(parentKey == -1) {
        parentKey = null;
    }
    
    let newTree = insertNode({
            treeData: this.state.treeData,
            depth: 3,
            minimumTreeIndex: rowInfo.treeIndex+1,
            newNode: NEW_NODE,
            parentKey: parentKey,
            getNodeKey: ({ treeIndex }) =>  treeIndex,
            expandParent: false
     });

     this.setState({treeData: newTree.treeData, folderCount: this.state.folderCount+1});
  };

  addBtn = rowInfo => {
    console.log('add button')
    // this.setState({
    //   newName: rowInfo
    // })
    if (this.state.addState) {
      this.setState({
        addState: false
      });
    } else {
      this.setState({
        addState: true
      });
    }
    console.log(this.state.addState)
  }

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
    if(rowInfo.node.type === 'folder'){
      this.setState({
        privateList: newList,
        folderCount: this.state.folderCount-1
      })
    } else {
      this.setState({
        privateList: newList
      })
    }
  };
  
  rename = (rowInfo, newName) => {
    if(rowInfo.node.type == 'file'){
      console.log(rowInfo.node.title)
      rowInfo.node.title = <a
      href="#"
      onClick={() => {
        this.treeClick(newName);
      }}
    >{newName}</a>
      
    } else{
      rowInfo.node.title = newName
    }
    


    
    
    

    // Some component popup with input
    // change name of folder/file to value of input text
  }

  renameFile = (rowInfo) => {
    if (this.state.rename) {
      this.setState({
        rename: false
      });
    } else {
      this.setState({
        rename: true
      });
    }
    this.setState({
      row: rowInfo
    })
    // console.log(this.state.upState);
  };

  checkNode = (rowInfo) => {
    console.log(rowInfo);
    if(rowInfo.treeIndex == 0){
      return [
        <div>
          <button label="Add" onClick={event => this.addNode(rowInfo)}>
            Add
          </button>
          </div>
      ]
    }
    if (rowInfo.node.type === 'folder') {
      
        return [<div>
            <button label="Add" onClick={event => this.addNode(rowInfo)}>
              Add
            </button>
            <button label="Delete" onClick={event => this.removeNode(rowInfo)}>
              Remove
            </button>
            <button label="Rename" onClick={event => this.renameFile(rowInfo)}>
              Rename
            </button>
        </div>]
      // }
      
    }
    if (rowInfo.node.type === 'file') {
      return [
        <div>
          <button label="Delete" onClick={event => this.removeNode(rowInfo)}>
            Remove
          </button>
          <button label="Rename" onClick={event => this.renameFile(rowInfo)}>
            Rename
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

    let file;
    if (this.state.addState === true){
      file = (
        <MyFiles
          addBtn={this.addBtn}
          rowInfo={this.state.newName}
          treeData={this.state.treeData}
          addNode={this.addNode}
        />
      )
    }

    let rename;
    if (this.state.rename === true) {
      rename = (
        <div>
          <Rename renameFile={this.renameFile} rename={this.rename} rowInfo={this.state.row}
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
                    theme={FileExplorerTheme}
                  />

                </div>
              </div>
            </div>
            {file}
            {login}
            {upload}
            {rename}
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
