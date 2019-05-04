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
  getTreeFromFlatData,
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
      columns: [],
      rows: [],
      showOverlay: false,
      rename: false,
      row: '',
      addState: false,
      newName: '',
      //show: false,
      checked: false,
      folderCount: 1,
      objectArray: [],
      treeData: [
        
      ],
      treeDataTwo: [
        {
          title: "Public",
          children: []
        }
      ]
    };
    this.fileSelection = this.fileSelection.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
  }

  //button style
  getStyle = () => {
    return {
      background: 'white',
      margin: '4px',
      borderRadius: '20%',
      outline: 'none',
      height: '1.5rem',
      fontSize: '10px'
    }
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
    // console.log("Login form submitted");
    // console.log("Username: ", this.state.username);
    // console.log("Password: ", this.state.password);
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
    // console.log("File Name: ", fileName)
    // console.log("File Type: ", fileType)
    this.setState(s => ({ showOverlay: !s.showOverlay }));
    // this.setState({ dataChecks: true });
  };

  readTree = data => {
    let treeData = data;
    let arrayKeys = Object.keys(treeData);
    let arrayValues = Object.values(treeData);
    let privateContainer = [];
    let arrayObj = [];
    let tempArray = [];

    // create array of objects with parents, children, and title
    for (let i in arrayKeys) {
      let obj = {};
      let keysLined = arrayKeys[i];
      let valuesLined = arrayValues[i]; //value within key
      //list inside arrayValues list
      for (let j in valuesLined) {
        obj.title = valuesLined[j];
        obj.parent = keysLined;
        obj.children = [];
        privateContainer.push(valuesLined[j]);
        arrayObj.push(obj);
        obj = {};
      }
    }

    //check if node is file or folder using key array
    tempArray = arrayObj;
    for (let i in tempArray) {
      let temp = tempArray[i];
      let bool = false;
      for (let j in arrayKeys) {
        //keys are all folder node with value
        if (arrayKeys[j] === temp.title) {
          bool = true;
        }
      }
      if (bool) {
        temp.type = "folder";
      } else {
        temp.type = "file";
      }
    }

    let rootNode = {
      title: "private",
      children: [],
      type: "folder"
    };

    // loop through arrayObj taking each node out of list, order them into tree using parent and title
    for (let i in tempArray) {
      if (tempArray[i].type === "file") {
        tempArray[i].title = (
          <a
            href="#"
            onClick={() => {
              this.treeClick(tempArray[i].title);
            }}
          >
            {tempArray[i].title}
          </a>
        );
      }
      // let popped = tempArray.pop();{
      if (tempArray[i].parent === "private") {
        rootNode.children.push(tempArray[i]);
      } else {
        for (let j in tempArray) {
          if (tempArray[j].title === tempArray[i].parent) {
            let temp = tempArray[i];
            tempArray[j].children.push(temp);
            // tempArray.splice(i);
          }
        }
      }
    }

    this.setState({
      treeData: [...this.state.treeData, rootNode],
      privateList: privateContainer
    });
  };

  readPublic = (data) => {
    let dataArray = data.public;
    let root = { title: 'public', children: []}
    let obj;
    dataArray.map(item => {
      obj ={
        title: <a
        href="#"
        onClick={() => {
          this.treeClick(item);
        }}
      >{item}</a>,
        type: 'file'
      }
      root.children.push(obj);
    });
      
    
    this.setState({
      treeDataTwo: [root]
    })
  }

  componentDidMount() {

    // this.setState({ nextCanvas: false });
    var self = this;
    var config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    }; 
    // get private to turn to tree
    axios
      .get(
        "http://127.0.0.1:5000/listPrivateFiles",
        { label: "Test", text: "Test" },
        config
      )
      .then(function(response) {
        let data = response.data
        //callback function
        self.readTree(data);
      })
      .catch(function(error) {
        console.log(error);
      });

      // get public
      axios
      .get(
        "http://127.0.0.1:5000/listPublicFiles",
        { label: "Test", text: "Test" },
        config
      )
      .then(function(response) {
        let data = response.data;
        
        //callback function
        self.readPublic(data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fileSelection = async (e) => {
    if(e.props != undefined)  
    {
      if(e.props.children.includes('.csv')){
        this.setState({ canvasTitle: e.props.children });
        let res = await axios.post(`http://127.0.0.1:5000/sendFile`,  {"fileName": e.props.children})
        await this.setState({columns: res.data[0]})
        await this.setState({rows: res.data[1]})
      }
    }
  };

	datachecks = (check) =>{
    if (check === "stats"){
      console.log("STATISTICS");
      //let res = await axios.post(`http://127.0.0.1:5000/dataCheck`, {"fileData": "", "check": check});
    }
    else if (check === "types"){
      console.log("DATA TYPES");
      //let res = await axios.post(`http://127.0.0.1:5000/dataCheck`, {"fileData": "", "check": "types"});
    }
    else if (check === "missing"){
      console.log("CHECK MISSING VALUES");
      //let res = await axios.post(`http://127.0.0.1:5000/dataCheck`, {"fileData": "", "check": "missing"});
    }
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
    }
  };



  //move from private to public
  moveFile = async(rowInfo) => {
    let NEW_NODE = {title: rowInfo.node.title, type: rowInfo.node.type};
    let newTreeTwo = this.state.treeDataTwo;
    newTreeTwo[0].children.push(NEW_NODE)
    this.setState({treeDataTwo: newTreeTwo});
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


 createNewTree = async (tree, newFile) => {
    // check if name already exists
    let check = true;
    for (let i in this.state.privateList) {
      if (newFile.name === this.state.privateList[i]) {
        check = false;
      }
    }

    if (check) {
      let rowInfo = tree;
      let NEW_NODE = {
        title: (
          <a
            href="#"
            onClick={() => {
              this.treeClick(newFile.name);
            }}
          >
            {newFile.name}
          </a>
        ),
        type: "file"
      };
      // let { node, treeIndex, path } = rowInfo;
      // let parentNode = getNodeAtPath({
      //   treeData: this.state.treeData,
      //   path: path,
      //   getNodeKey: ({ treeIndex }) => treeIndex,
      //   ignoreCollapsed: true
      // });

      let newTree = insertNode({
        treeData: this.state.treeData,
        depth: 1,
        minimumTreeIndex: 1,
        newNode: NEW_NODE,
        parentKey: null,
        getNodeKey: ({ treeIndex }) => treeIndex,
        expandParent: false
      });

      this.setState({
        treeData: newTree.treeData
      });

      let formData = new FormData();
      formData.set("fileName", newFile);
      let res = await axios
        .post("http://127.0.0.1:5000/upload", formData, console.log(newFile))
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    // return list;
  };

  /////    /      //tree functions//      /    ////
  updateTreeData = treeData => {
    this.setState({
      treeData
    });
  };

  setDataTwo = treeDataTwo => {
    this.setState({ treeDataTwo })
  }

addNode = async (rowInfo, newName) => {
    let check = true;
    for (let i in this.state.privateList) {
      if (newName.title === this.state.privateList[i]) {
        check = false;
      }
    }

    if (check) {
      let NEW_NODE = { title: newName, type: "folder" };
      let { node, treeIndex, path } = rowInfo;
      // path.pop();
      let parentNode = getNodeAtPath({
        treeData: this.state.treeData,
        path: rowInfo.path,
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

      let newTree = insertNode({
        treeData: this.state.treeData,
        depth: 3,
        minimumTreeIndex: rowInfo.treeIndex + 1,
        newNode: NEW_NODE,
        parentKey: parentKey,
        getNodeKey: ({ treeIndex }) => treeIndex,
        expandParent: false
      });

      this.setState({
        treeData: newTree.treeData,
        folderCount: this.state.folderCount + 1,
        privateList: [...this.state.privateList, rowInfo.node.title]
      });

      let data = { folderName: newName, parentName: rowInfo.node.title }; //originally contained newName
      let res = await axios
        .post("http://127.0.0.1:5000/addFolder", data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  };


  addBtn = rowInfo => {
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
    this.setState({
      row: rowInfo
    })
  }

  removeNode = async (rowInfo) => {

    let newList = [];
    let { node, treeIndex, path } = rowInfo;
    // for(let i in this.state.privateList){
    //   if(this.state.privateList[i] != rowInfo.node.sub){
    //     newList.push(this.state.privateList[i])
    //   }
    // }

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

    let data = (rowInfo.node.type === 'file') ? {fileName: rowInfo.node.title.props.children} : {fileName: rowInfo.node.title};
    //request
    // var config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // }; 
    let res = await axios
      .post(
        "http://127.0.0.1:5000/remove",
        data
      )
      .then(function(response) {
        console.log(response);

      })
      .catch(function(error) {
        console.log(error);
      });
  };
  
  rename = async (rowInfo, newName) => {
    let oldName = rowInfo.node.title;
    let depth;
    if(rowInfo.node.type === 'file'){
      depth = rowInfo.node.title.props.children;
    }
    if(rowInfo.node.type == 'file'){
      rowInfo.node.title = <a
      href="#"
      onClick={() => {
        this.treeClick(newName);
      }}
    >{newName}</a>
      
    } else{
      rowInfo.node.title = newName
    }

    let data = (rowInfo.node.type == 'file') ? {
      folderName: depth, newFolderName: newName
    } : { folderName: oldName, newFolderName: newName }

    //request
    let res = await axios
      .post(
        "http://127.0.0.1:5000/rename",
        data
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    // Some component popup with input
    // change name of folder/file to value of input text
  };

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
    
  };

  onMoveNode = async(node, path) => {
    this.setState({
      treeData: this.state.treeData
    })

    let res = await axios
    .post(
      "http://127.0.0.1:5000/moveFiles",
      { folderName: node.title, parentName: node.parent },
    )
    .then(function(response) {
      console.log(response);
      console.log(node)
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  checkNode = (rowInfo) => {
    if(rowInfo.treeIndex == 0){
      return [
        <div>
          <button style={this.getStyle()} label="Add" onClick={event => this.addBtn(rowInfo)}>
            Add
          </button>
          </div>
      ]
    }
    if (rowInfo.node.type === 'folder') {
      
        return [<div>
            <button  style={this.getStyle()} label="Add" onClick={event => this.addBtn(rowInfo)}>
              Add
            </button>
            <button  style={this.getStyle()} label="Delete" onClick={event => this.removeNode(rowInfo)}>
              Remove
            </button>
            <button  style={this.getStyle()}  label="Rename" onClick={event => this.renameFile(rowInfo)}>
              Rename
            </button>
        </div>]
      // }
      
    }
    if (rowInfo.node.type === 'file') {
      return [
        <div>
          <button  style={this.getStyle()} label="Delete" onClick={event => this.removeNode(rowInfo)}>
            Remove
          </button>
          <button  style={this.getStyle()} label="Rename" onClick={event => this.renameFile(rowInfo)}>
            Rename
          </button>
          <button  style={this.getStyle()} label="Move" onClick={event => this.moveFile(rowInfo)}>
            Move
          </button>
        </div>
      ];
    }
  };

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
          rowInfo={this.state.row}
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
                  onMoveNode={({ treeData, node, nextParentNode }) => {
                    // this.sendMovedState(node, treeData, nextParentNode);
                  }}
                  canDrag={({ node }) => !node.noDragging}
                  canDrop={({ nextParent }) => {
                    if (nextParent.type === "file") {
                      return false;
                    } else {
                      return true;
                    }
                  }}
                  generateNodeProps={rowInfo => ({
                    buttons: this.checkNode(rowInfo),
                    //ref: this.attachRef,
                    onContextMenu: this.handleRightClick,
                    onClick: () => this.fileSelection(rowInfo.node.title)
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
                    onChange={this.setDataTwo}
                    onMoveNode={({ node, path, treeIndex }) =>
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
                    canDrop={({ nextParent }) => {
                      if (nextParent.type === "file") {
                        return false;
                      } else {
                        return true;
                      }
                    }}
                    // canNodeHaveChildren={({ node }) => node.noCopy}
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
                columns={this.state.columns}
                rows={this.state.rows}
                datachecks={this.datachecks}
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
