import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, StylesProvider } from "@material-ui/core";
import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";

const CountryPicker = ( {countryPickerHandler} ) => {
    const [fetchedCountries, setfetchedCountries] = useState([]);

    useEffect(() => {
        const fetchCountryAPI = async () => {
            setfetchedCountries(await fetchCountries());
        }
        fetchCountryAPI();
        // console.log(fetchedCountries);
    }, [setfetchedCountries]);

    // console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onClick={(e) => countryPickerHandler(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;