import "../../../node_modules/react-ui-sortable-tree/dist/react-ui-tree.css";
import "../../../node_modules/react-ui-sortable-tree/lib/react-ui-tree.less";
import "../../../node_modules/react-ui-sortable-tree/example/theme.less";
import "../../../node_modules/react-ui-sortable-tree/example/app.less";
import tree from "../../../node_modules/react-ui-sortable-tree/example/app.less";
import cx from "classnames";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tree from "react-ui-tree";

class TreeTest extends Component {
  state = {
    active: null,
    tree: {
      module: "react-ui-tree",
      children: [
        {
          module: "dist",
          collapsed: true,
          children: [
            {
              module: "node.js",
              leaf: true
            },
            {
              module: "react-ui-tree.css",
              leaf: true
            },
            {
              module: "react-ui-tree.js",
              leaf: true
            },
            {
              module: "tree.js",
              leaf: true
            }
          ]
        },
        {
          module: "example",
          children: [
            {
              module: "app.js",
              leaf: true
            },
            {
              module: "app.less",
              leaf: true
            },
            {
              module: "index.html",
              leaf: true
            }
          ]
        },
        {
          module: "lib",
          children: [
            {
              module: "node.js",
              leaf: true
            },
            {
              module: "react-ui-tree.js",
              leaf: true
            },
            {
              module: "react-ui-tree.less",
              leaf: true
            },
            {
              module: "tree.js",
              leaf: true
            }
          ]
        },
        {
          module: ".gitiignore",
          leaf: true
        },
        {
          module: "index.js",
          leaf: true
        },
        {
          module: "LICENSE",
          leaf: true
        },
        {
          module: "Makefile",
          leaf: true
        },
        {
          module: "package.json",
          leaf: true
        },
        {
          module: "README.md",
          leaf: true
        },
        {
          module: "webpack.config.js",
          leaf: true
        }
      ]
    }
  };

  renderNode = node => {
    return (
      <span
        className={cx("node", {
          "is-active": node === this.state.active
        })}
        onClick={this.onClickNode.bind(null, node)}
      >
        {node.module}
      </span>
    );
  };

  onClickNode = node => {
    this.setState({
      active: node
    });
  };

  render() {
    return (
      <div style={{ width: 400 }}>
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode}
          />
        </div>
      </div>
    );
  }

  handleChange = tree => {
    this.setState({
      tree: tree
    });
  };

  updateTree = () => {
    const { tree } = this.state;
    tree.children.push({ module: "test" });
    this.setState({
      tree: tree
    });
  };
}
