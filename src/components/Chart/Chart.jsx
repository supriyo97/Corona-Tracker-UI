import React, { useState, useEffect } from 'react';
import { Line,Bar } from 'react-chartjs-2';
import { fetchDailyData } from "../../api";
import styles from './Chart.module.css';

const Charts = () => {
    const [ dailyData, setDailyData ] = useState([]);

    useEffect(() => {
        const fetchChartAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        // console.log(dailyData);
        fetchChartAPI();
    });
    
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

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default Charts;