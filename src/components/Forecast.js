// Forecast.js
// React Component acting as a table to display future weather predictions

import { ScrollPanel } from 'primereact/scrollpanel';
import { getWeatherIcon, formatDate } from '../MultiComponentFunctions';
import './Forecast.css';

const Forecast = (props) => {
    // Each datapoint corresponds to a table row
    const rows = props.data.map(d => {
        return (
            <tr className='dataRow' key={d['datetimeEpoch']}>
                <td className='rh'>
                    <div className='date'>
                        <h5>{formatDate(d['datetimeEpoch'] * 1000, props.timeFormat)}</h5>
                        <div className='icontemp'>
                            {getWeatherIcon(d['icon'])}
                            <h3>{Math.round(d['temp'])}°</h3>
                        </div>
                    </div>
                </td>
                <td><em>{Math.round(d['feelslike'])}°</em></td>
                <td>{Math.round(d['humidity'])}%</td>
                <td>{Math.round(d['precipprob'])}%</td>
                <td>{Math.round(d['windspeed'])} km/h</td>
                <td>{d['uvindex']}</td>
            </tr>
        );
    });

    return (
        <div className='fc'>
            <table className='heads'>
                <thead>
                    <tr>
                        <th className='rh'></th>
                        <th>Feels Like</th>
                        <th>Humidity</th>
                        <th>POP</th>
                        <th>Wind Speed</th>
                        <th>UV Index</th>
                    </tr>
                </thead>
            </table>
            <ScrollPanel style={{ width: '100%', height: '400px' }}>
                <table className='fctable'>
                    <tbody>{rows}</tbody>
                </table>
            </ScrollPanel>
        </div>
    );
}

export default Forecast;