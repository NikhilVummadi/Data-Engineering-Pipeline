import React from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const nodes = [
  {
    value: "mars",
    label: "Mars",
    children: [
      { value: "phobos", label: "Phobos" },
      { value: "deimos", label: "Deimos" }
    ]
  }
];

const nodeTwo = [
  {
    value: "jupitar",
    label: "Jupitar",
    children: [
      { value: "hercules", label: "Hercules" },
      { value: "perseus", label: "Perseus" },
      { value: "phobos", label: "Phobos" },
      { value: "deimos", label: "Deimos" }
    ]
  }
];

class Tree extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: [],
      expanded: [],
      checkedTwo: [],
      expandedTwo: []
    };
  }

  render() {
    return (
      <div>
        <CheckboxTree
          nodes={nodes}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={checked => this.setState({ checked })}
          onExpand={expanded => this.setState({ expanded })}
        />
        <CheckboxTree
          nodes={nodeTwo}
          checked={this.state.checkedTwo}
          expanded={this.state.expandedTwo}
          onCheck={checkedTwo => this.setState({ checkedTwo })}
          onExpand={expandedTwo => this.setState({ expandedTwo })}
        />
      </div>
    );
  }
}

export default Tree;
