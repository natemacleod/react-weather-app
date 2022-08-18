// LocationData.js
// React Component displaying all relevant data for a given location

import { ScrollPanel } from 'primereact/scrollpanel';
import { getWeatherIcon } from '../MultiComponentFunctions';
import AlertView from './AlertView';
import Forecast from './Forecast';
import './LocationData.css';

const LocationData = (props) => {
    // Returns an array containing datapoints for each of the next [x] hours
    const getNextXHours = x => {
        let hours = Array(x).fill(null);
        let curDay = 0;
        let curTime = new Date().getHours();
        for (let i = 0; i < x; i++) {
            hours[i] = props.data['days'][curDay]['hours'][curTime];
            curTime++;
            if (curTime === 24) {
                curTime = 0;
                curDay++;
            }
        }
        return hours;
    }

    // The main view will only be displayed if the app is not loading
    if (!props.loading) return (
        <ScrollPanel style={{ width: '100%', height: '90vh' }}>
            <div id='locData'>
                <div id="basics">
                    <div id="bigtext">
                        <div id="topline">
                            <h2 className='ib'>{props.data['address']}</h2>
                            {getWeatherIcon(props.data['currentConditions']['icon'])}
                            <h1 className="ib">{Math.round(props.data['currentConditions']['temp'])}°&nbsp;</h1>
                        </div>
                        <h4>{props.data['resolvedAddress']}</h4>
                        <p>{props.data['description']}</p>
                    </div>
                    <div id="basicstats">
                        <div className="stat">
                            <i className='bi bi-chevron-up' />
                            <div className="statInner">
                                <h6>HIGH</h6>
                                <p>{Math.round(props.data['days'][0]['tempmax'])}° / <em>{(Math.round(props.data['days'][0]['feelslikemax']))}°</em></p>
                            </div>
                        </div>
                        <div className="stat">
                            <i className='bi bi-chevron-down' />
                            <div className="statInner">
                                <h6>LOW</h6>
                                <p>{Math.round(props.data['days'][0]['tempmin'])}° / <em>{(Math.round(props.data['days'][0]['feelslikemin']))}°</em></p>
                            </div>
                        </div>
                        <div className="stat">
                            <i className='bi bi-thermometer-half' />
                            <div className="statInner">
                                <h6>FEELS LIKE</h6>
                                <p><em>{(Math.round(props.data['currentConditions']['feelslike']))}°</em></p>
                            </div>
                        </div>
                        <div className="stat">
                            <i className='bi bi-droplet' />
                            <div className="statInner">
                                <h6>HUMIDITY</h6>
                                <p>{Math.round(props.data['currentConditions']['humidity'])}%</p>
                            </div>
                        </div>
                        <div className="stat">
                            <i className="bi bi-cloud-rain"></i>
                            <div className="statInner">
                                <h6>POP</h6>
                                <p>{Math.round(props.data['currentConditions']['precipprob'])}%</p>
                            </div>
                        </div>
                        <div className="stat">
                            <i className='bi bi-brightness-high' />
                            <div className="statInner">
                                <h6>UV INDEX</h6>
                                <p>{props.data['currentConditions']['uvindex']}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {props.data['alerts'].length > 0 &&
                    <AlertView alerts={props.data['alerts']} />
                }
                <div id="forecast">
                    <div className="fcInner">
                        <h5 className='fchead'>Next 72 Hours</h5>
                        <Forecast data={getNextXHours(72)} timeFormat={'HOUR'} />
                    </div>
                    <div className="fcInner">
                        <h5 className='fchead'>Next 15 Days</h5>
                        <Forecast data={props.data['days']} timeFormat={'NONE'} />
                    </div>
                </div>
            </div>
        </ScrollPanel>
    );
    else return (<div id="basics"><h3>Loading...</h3></div>); // Prevents errors when we don't have location data yet
}

export default LocationData;