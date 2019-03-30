import React, { Component } from "react";
import Private from "./PrivateFiles";
import PublicFiles from "./PublicFiles";

class Public extends Component {
  render() {
    console.log(this.props);

    return this.props.privateList.map(item => (
      <PublicFiles key={item.id} name={item} />
    ));
  }
}

export default Public;
