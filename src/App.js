import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from "./api";
import { Typography } from '@material-ui/core';

class App extends Component {
    state = {
        data : {},
        country : ''
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState ({data : fetchedData});
    }

    countryPickerHandler = async (country) => {
        // console.log(country);
        const fetchedData = await fetchData(country);
        this.setState ({data : fetchedData, country : country});
    } 

    render() {
        const {data, country} = this.state;

        return (
            <div className={ styles.container }>
                <Typography className={styles.heading} variant="h2">COVID-19 TRACKER</Typography>
                <Cards data={data}/>
                <CountryPicker countryPickerHandler={this.countryPickerHandler}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;