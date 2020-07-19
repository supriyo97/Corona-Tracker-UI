import React, {Component} from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from "./api";
import { Typography } from '@material-ui/core';
// import Charts from './components/Chart/Chart';

class App extends Component {
    state = {
        data: {}
    }

    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState ({data : fetchedData});
    }

    render() {

        return (
            <div className={ styles.container }>
                <Typography variant="h2">COVID-19 TRACKER</Typography>
                <Cards data={this.state.data}/>
                <CountryPicker/>
                <Chart/>
            </div>
        )
    }
}

export default App;