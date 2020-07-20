import React, { useState, useEffect } from 'react';
import { Line,Bar } from 'react-chartjs-2';
import { fetchDailyData } from "../../api";
import styles from './Chart.module.css';

const Charts = ({ data : {confirmed, recovered, deaths}, country }) => {
    const [ dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchChartAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        // console.log(dailyData);
        fetchChartAPI();
    }, []);
    
    const lineChart = (
        (dailyData.length) ? (<Line
            data={{
                labels : dailyData.map(({date}) => date),
                datasets : [{
                    label : 'Infected',
                    data : dailyData.map(({confirmed}) => confirmed),
                    borderColor : '#3333ff',
                    fill : true,
                }, {
                    label : 'Death',
                    data : dailyData.map(({deaths}) => deaths),
                    borderColor : 'red',
                    backgroundColor : 'rgba(250,0,0, 0.5)',
                    fill : true,
                }],
            }}/>) : null
    );

    const barChart = (
        confirmed ? (<Bar
            data = {{
                labels : ['Infected', 'Recovered', 'Deaths'],
                datasets : [{
                    label : 'People',
                    backgroundColor : [
                        'rgb(0, 0, 250, 0.5)',
                        'rgb(0, 250, 0, 0.5)',
                        'rgb(250, 0, 0, 0.5)',
                    ],
                    data : [confirmed.value, recovered.value, deaths.value],
                }]
            }}
            options = {{
                legend : { display : false },
                title : { display : true, text : `Current state in ${country}` }
            }}
            />) : null
    );

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts;