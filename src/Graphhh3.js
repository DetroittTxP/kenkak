import {Component} from "react";
import {Bar} from 'react-chartjs-2';
import {parse} from 'papaparse';
import './App.css';

class Graphhh3 extends Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
            chartdataIndeterminate_for_Appearance :{} ,
        }
    }

    setData(data)
    {
        var NegativePneu0 = data.filter ((data) => {
            return data['IndeterminateAppearance'] === "0"
        })
        var NegativePneu1 = data.filter ((data) => {
            return data['IndeterminateAppearance'] === "1"
        })

        this.setState(
            {
                chartdataIndeterminate_for_Appearance :{
                    labels: ['0', '1'],
                    datasets: [{
                        label:'# Indeterminate Appearance',
                        data: [NegativePneu0.length,NegativePneu1.length],
                        backgroundColor:[
                            '#006789',
                            '#006789']
                    }]
                },
            }
        )
    }

    componentDidMount() {
        parse("http://localhost:5000/train_study_level.csv", {
            download: true,
            header : true ,
            complete : (e) => {
                console.log(e);
                this.setData(e.data);
            }
        })
    }

    render(){
        return(
                <div className = 'Graphhh3 '  > 
                    <Bar 
                        data={this.state.chartdataIndeterminate_for_Appearance}
                    />
                </div>
        )
    }

}

export default Graphhh3;