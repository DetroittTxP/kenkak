import {parse} from 'papaparse';
import React, { Component } from 'react'
import './App.css'
// import '../Sidebar/Sidebar.css'

export default class Graph5 extends Component {
    constructor(props){
        super(props);
        this.state={
            Data:{}
        }
    }
    setData(data){
        this.setState({
            Data : data
        })
    }
    componentDidMount(){
        parse("http://localhost:5000/train_image_level.csv", {
            download: true,
            header : true ,
            complete : (e) => {
                console.log(e);
                this.setData(e.data);
            }
        })
      }

    render() {
        return (
            <div className="">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>boxes</th>
                            <th>label</th>
                            <th>StudyInstanceUID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.Data.length> 0 &&  this.state.Data.map((data)=>{
                    return <tr> 
                        {Object.keys(data).map((e)=>{
                            return <td>{data[`${e}`]}</td>
                        })} 
                    </tr>
                    })} 
                    </tbody>
                </table>
             </div>
        )
    }
}