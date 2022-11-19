import React, { Component } from 'react'
import './App.css'
import { Table } from 'antd';
import axios  from 'axios';
import 'antd/dist/antd.css'

export default class Graph2 extends Component {
    constructor(props){
        super(props);
        this.state={
            column:[],
            data:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/csv/train_image_level.csv")
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
    box(data){
        return(
            <div>
                <center>[null]   32%</center>
                <center>['x': 789.28836, 'y'...     0%:</center>
                <center>Other (4293)    68%</center>
            </div>
        )
    }
    label(data){
        return(
            <div>
                <center>none 1 0 0 1 1   32%</center>
                <center>opacity 1 789.28836...  0%</center>
                <center>Other (4293)    68%</center>
            </div>
        )
    }
    Study(data){
        return(
            <div>
                <center>6054</center>
                <center>unique values</center>
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
                    title: 'boxes',
                    dataIndex:'boxes',
                    children : [
                        {
                            title : this.box(data),
                            dataIndex: 'boxes'
                        }
                    ],
                    sorter: {
                        compare: (a, b) => a.boxes.localeCompare(b.boxes),
                        multiple: 3,
                    },
                   
                    
                },
                {
                    title: 'label',
                    dataIndex:'label',
                    children : [
                        {
                            title : this.label(data),
                            dataIndex: 'label'
                        }
                    ],
                    sorter: {
                        compare: (a, b) => a.label.localeCompare(b.label),
                        multiple: 3,
                    },
                   
                },
                {
                    title: 'StudyInstanceUID',
                    dataIndex:'StudyInstanceUID',
                    children : [
                        {
                            title : this.Study(data),
                            dataIndex: 'StudyInstanceUID'
                        }
                    ],
                    sorter: {
                        compare: (a, b) => a.StudyInstanceUID.localeCompare(b.StudyInstanceUID),
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