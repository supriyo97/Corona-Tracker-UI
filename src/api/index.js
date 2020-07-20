import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

//fetch the data for Cards
export const fetchData = async (country) => {
    let changedURL = url;

    if(country) {
        changedURL = `${url}/countries/${country}`;
    }
    try {
        const { data : { confirmed, deaths, recovered, lastUpdate } } = await axios.get(changedURL);
        return { confirmed, deaths, recovered, lastUpdate };

    } catch (error) {
        console.log(error);
    }
}

//fetch the data for Charts
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modData = data.map((dailydata) => ({
            confirmed : dailydata.confirmed.total,
            deaths : dailydata.deaths.total,
            date : dailydata.reportDate,
        }));

        return modData;
    } catch (error) {
        console.log(error);
    }
}

//fetch countries data
export const fetchCountries = async () => {
    try {
        const { data : {countries} } = await axios.get(`${url}/countries`);

        // console.log(countries);
        return countries.map(country => country.name);
    } catch (error) {
        console.log(error);
    }
}