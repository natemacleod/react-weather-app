/*
    React Weather App (title WIP)
    Version 1.0 (6/27/2022)
    Created by Nate MacLeod (natemacleod.github.io)
*/

import './App.css';
import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

// PrimeReact imports
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PrimeReact from 'primereact/api';
import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

import LocationData from './components/LocationData';
PrimeReact.ripple = true;

const App = (props) => {
    // State setup
    const [active, setActive] = useState('Kitchener'); // Current location
    const [bar, setBar] = useState(""); // Contents of 'Add Location' bar
    const [menuItems, setMenuItems] = useState([{
        label: 'Kitchener',
        command: () => setActiveLocation('Kitchener'),
    }]); // List of locations for use in the Menubar component
    const [resp, setResp] = useState(200); // HTTP status code of the most recent API request
    const [loading, setLoading] = useState(true); // Whether the app is loading (the app will not try to display API data when it is loading)
    const [data, setData] = useState({}); // All API data collected during runtime

    // Whenever the active location changes, this will run
    //   If we already have API data for the location, that will be used (this reduces unneeded API calls)
    //   If we don't, new data will be fetched and converted to JSON
    useEffect(() => {
        if (active in data) {
            setResp(200);
            setLoading(false);
            return;
        } else if (active == null) {
            setResp(1);
            setLoading(false);
            return;
        } else fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${active}?unitGroup=metric&key=EVA3Q6YVR36WLKVSKA6LTUUR5&contentType=json&iconSet=icons2`,
            {
                method: 'GET'
            }
        ).then((resp) => {
            if (!resp.ok) {
                setResp(resp.status);
                setLoading(false);
            } else {
                setResp(200);
                resp.json().then((j) => {
                    let d = data;
                    d[active] = j;
                    setData(d);
                    console.log(j);
                    setLoading(false);
                });
            }
        });
    }, [active]);

    // Adds a location (from the add location bar) to the selection menu and makes it active
    const addLocation = () => {
        let items = menuItems;
        items.push({
            label: bar,
            command: () => setActiveLocation(bar),
        });
        setMenuItems(items);
        setActiveLocation(bar);
        setBar("");
    }

    // Changes the active location to [loc]
    const setActiveLocation = loc => {
        setLoading(true);
        setActive(loc);
    }

    return (
        <div className="App">
            <Menubar
                model={[
                    {
                        label: 'My Locations',
                        icon: 'pi pi-globe',
                        items: menuItems,
                    },
                    {
                        label: 'Return Home',
                        icon: 'pi pi-home',
                        url: 'https://natemacleod.github.io'
                    }
                ]}
                start={<img src={logo} height='50px' />}
                end={
                    <div id="addLocation">
                        <InputText placeholder='Add a Location' value={bar} onChange={e => setBar(e.target.value)} />
                        <Button icon="pi pi-plus" onClick={() => { addLocation() }} />
                    </div>
                }
            />
            {resp === 200 && !loading && <LocationData data={data[active]} loading={loading} />}
            {resp !== 200 &&
                <div id='e404'>
                    <h3>Error <strong>{resp}</strong></h3>
                    {(resp === 404 || resp === 400) && <p>
                        Data for "{active}" not found.
                        Check for spelling errors and try again. <br />
                        If you're sure the spelling is correct,
                        the location might not have any data associated with it.
                    </p>}
                    {resp === 429 && <p>
                        Too many requests have been made to the weather API today. <br />
                        I do not make any money off this project; as such, I am using a free API to keep costs at zero. <br />
                        The API is limited at 1000 calls per day -- this limit has been reached. <br />
                        Try again tomorrow!
                    </p>}
                    {resp === 1 && <p>
                        You haven't added any locations. <br />
                        Add one using the bar in the top right.
                    </p>}
                </div>}
            <div id='linkback'>
                <p><a href="https://www.visualcrossing.com/">Weather Data Provided by Visual Crossing</a></p>
            </div>
        </div>
    );
}

export default App;
