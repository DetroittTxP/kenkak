import React, { Component } from 'react';
import TreeMenu from "react-simple-tree-menu";
import './Tree.css';
import { withRouter } from "react-router-dom";
import axios  from 'axios';

class Data extends Component {
  constructor(props){
    super(props);
    this.state = {
      Data: {} 
    }
  }


  async componentDidMount(){
    await axios.get("http://localhost:5000/folder")
      .then((res) => {
        this.setState({Data: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

//ทำให้กราฟขึ้น
  onClickItem = (keys) => {
    console.log(keys);
    if(keys.path !== null){
      this.props.history.push(""); 
      this.props.history.push(`${keys.path}`);
    }
  };

  render(){
    return (
    <div style={{overflowY:"auto"}}>
      <TreeMenu
          data={this.state.Data}
          hasSearch={false}
          onClickItem={this.onClickItem}
      />
    </div>
    );
  };
};

const Tree = withRouter(Data);
export default Tree ;