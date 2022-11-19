import {Component} from "react";
import {Bar} from 'react-chartjs-2';
import {parse} from 'papaparse';
import './App.css';

class Graphhh4 extends Component {
    constructor(props)
    {
        super(props);
        this.state = //เป็นการกำหนดค่าเริ่มต้น (ถ้าไม่มีไม่ต้องใส่) อันนี้เราใส่ chartData มาเป็นconstucter
        {
            chartdataAtypical_for_Appearance :{} ,
        }
    }

    setData(data)
    {
        var NegativePneu0 = data.filter ((data) => {
            return data['AtypicalAppearance'] === "0"
        })
        var NegativePneu1 = data.filter ((data) => {
            return data['AtypicalAppearance'] === "1"
        })

        this.setState(
            {
                chartdataAtypical_for_Appearance :{
                    labels: ['0', '1'],
                    datasets: [{
                        label:'# Atypical Appearance',
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
                <div className = 'Graphhh4 '  > 
                    <Bar 
                        data={this.state.chartdataAtypical_for_Appearance}
                    />
                </div>
        )
    }

}

export default Graphhh4;