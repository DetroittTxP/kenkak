import React, { Component } from 'react'
import './App.css'
import { Table } from 'antd';
import axios  from 'axios';
import 'antd/dist/antd.css'

export default class Graph1 extends Component {
    constructor(props){
        super(props);
        this.state={
            column:[],
            data:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/csv/sample_submission.csv")
        .then ((res) => {
            this.setdata(res.data) 
        })
    }


    id(data){
        return(
            <div>
                <center >{ data.length }</center>
                <center > unique values </center>
            </div>
        )
    }

    pre(data){
        var None = data.filter((data) => {
            return data.PredictionString === "none 1 0 0 1 1"
        })
        var none = Math.round((None.length / data.length)*100)
        var Negative = data.filter((data)  => { 
            return data.PredictionString === "negative 1 0 0 1 1"
        })
        var neg = Math.round((Negative.length / data.length)*100) 
        return(

            <div>
                <h5>none 1 0 0 1 1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {none} %</h5>
                <h5>negative 1 0 0 1 1 &nbsp;&nbsp;&nbsp;&nbsp; {neg} %</h5>
            </div>
        )
    }

    setdata(data){
        console.log(data);
        this.setState({
            column : [
                {
                    title: 'id',
                    dataIndex: 'id',
                    children : [
                        {
                            title : this.id(data),
                            dataIndex: 'id'
                        }
                    ],
                    sorter: {
                        compare: (a, b) => a.id.localeCompare(b.id),
                        multiple: 3,
                    },
                   
                },
                {
                    title: 'PredictionString',
                    dataIndex: 'PredictionString',
                    children : [
                        {
                            title : this.pre(data),
                            dataIndex: 'PredictionString'
                        }
                    ],
                    sorter: {
                        compare: (a, b) => a.PredictionString.localeCompare(b.id),
                        multiple: 3,
                    },
                },
            ],

            data : data
        })
    }

    render(){
        return (
            <div >
                <Table columns={this.state.column} dataSource={this.state.data} />
            </div>          
            );
    }
}