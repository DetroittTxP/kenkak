import React, { Component } from 'react'
import './App.css'
import { Table } from 'antd';
import axios  from 'axios';
import 'antd/dist/antd.css'
import Graphhh1 from './Graphhh1';
import Graphhh2 from './Graphhh2';
import Graphhh3 from './Graphhh3';
import Graphhh4 from './Graphhh4';

export default class Graph2 extends Component {
    constructor(props){
        super(props);
        this.state={
            column:[],
            data:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:5000/csv/train_study_level.csv")
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
                    title: 'Negative for Pneumonia',
                    dataIndex:'NegativeforPneumonia',
                    children : [
                       {
                           title:<Graphhh1/>,
                           dataIndex:'NegativeforPneumonia',
                       }
                    ],
                    sorter: {
                        compare: (a, b) => a.boxes.localeCompare(b.boxes),
                        multiple: 3,
                    },
                   
                    
                },
                {
                    title: 'Typical Appearance',
                    dataIndex:'TypicalAppearance',
                    children : [
                        {
                            title:<Graphhh2/>,
                            dataIndex:'TypicalAppearance',
                        }
                        
                    ],
                    sorter: {
                        compare: (a, b) => a.label.localeCompare(b.label),
                        multiple: 3,
                    },
                   
                },
                {
                    title: 'Indeterminate Appearance',
                    dataIndex:'IndeterminateAppearance',
                    children : [
                        {
                            title:<Graphhh3/>,
                            dataIndex:'IndeterminateAppearance',
                            
                        }
                        
                    ],
                    sorter: {
                        compare: (a, b) => a.StudyInstanceUID.localeCompare(b.StudyInstanceUID),
                        multiple: 3,
                    },
                },
            
            {
                title: 'Atypical Appearance',
                dataIndex:'AtypicalAppearance',
                children : [
                    {
                        title:<Graphhh4/>,
                        dataIndex:'AtypicalAppearance',
                        
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