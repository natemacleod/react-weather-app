import './App.css';
import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import PrimeReact from 'primereact/api';
import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';

PrimeReact.ripple = true;

const getWeatherIcon = i => {
  switch (i) {
    case 'snow': return (<i className='ib wi bi bi-snow' />);
    case 'snow-showers-day':
    case 'snow-showers-night': return (<i className='ib wi bi bi-cloud-snow-fill' />);
    case 'rain': return (<i className='ib wi bi bi-cloud-rain-fill' />);
    case 'thunder-rain':
    case 'thunder-showers-day':
    case 'thunder-showers-night': return (<i className='ib wi bi bi-cloud-lightning-rain-fill' />);
    case 'showers-day':
    case 'showers-night': return (<i className='ib wi bi bi-cloud-drizzle-fill' />);
    case 'fog': return (<i className='ib wi bi bi-cloud-fog-fill' />);
    case 'wind': return (<i className='ib wi bi bi-wind' />);
    case 'cloudy': return (<i className='ib wi bi bi-clouds-fill' />);
    case 'partly-cloudy-day': return (<i className='ib wi bi bi-cloud-sun-fill' />);
    case 'partly-cloudy-night': return (<i className='ib wi bi bi-cloud-moon-fill' />);
    case 'clear-day': return (<i className='ib wi bi bi-sun-fill' />);
    case 'clear-night': return (<i className='ib wi bi bi-moon-fill' />);
  }
}

const formatDate = (d, timeFormat) => {
  d = new Date(d);
  switch (timeFormat) {
    case 'NONE':
      return d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    case 'HOUR':
      return d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
      });
    case 'FULL':
      return d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
      });
  }
}

const getAlertDates = alert => {
  let start = alert['onsetEpoch'] * 1000;
  let end = alert['endsEpoch'] * 1000;

  return formatDate(start, 'FULL') + " to " + formatDate(end, 'FULL');
}

const getNextXHours = (days, x) => {
  let hours = Array(x).fill(null);
  let curDay = 0;
  let curTime = new Date().getHours();
  for (let i = 0; i < x; i++) {
    hours[i] = days[curDay]['hours'][curTime];
    curTime++;
    if (curTime === 24) {
      curTime = 0;
      curDay++;
    }
  }
  return hours;
}

const Forecast = (props) => {
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

const AlertView = (props) => {
  const alerts = props.alerts.map((a) => {
    return (
      <div className='alert' key={a['headline']}>
        <i className='bi bi-exclamation-triangle' />
        <div className='alertText'>
          <h5 className="ib"><a href={a['link']} target='_blank'>{a['headline']}</a></h5>
          <h6 className="ib"><em>{getAlertDates(a)}</em></h6>
          <h6>{a['description']}</h6>
        </div>
      </div>
    );
  });

  return (
    <div id='alertView'>
      {alerts}
    </div>
  )
}

const LocationData = (props) => {
  if (!props.loading) return (
    <div id='locData'>
      <div id="basics">
        <div id="bigtext">
          <div id="topline">
            <h2 className='ib'>{props.data['address']} //&nbsp;</h2>
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
        <Forecast data={getNextXHours(props.data['days'], 72)} timeFormat={'HOUR'} />
        <Forecast data={props.data['days']} timeFormat={'NONE'} />
      </div>
    </div>
  );
  else return (<div id="basics"><h3>Loading...</h3></div>);
}

const App = (props) => {
  //const msg = useRef(null)
  const [active, setActive] = useState(null);
  const [bar, setBar] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const [resp, setResp] = useState(200);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
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
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${active}?unitGroup=metric&key=9MKRB6JF2FRHFZ7UU8G8GRFY2&contentType=json&iconSet=icons2`,
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

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  const removeLocation = loc => {
    let items = menuItems;
    items = items.filter(l => l['label'] !== loc);
    setMenuItems(items);
    if (active === loc) {
      setLoading(true);
      if (items.length > 0) setActive(items[0]['label']);
      else setActive(null);
    }

    let d = data;
    delete d[loc];
    setData(d);
  }

  const addLocation = () => {
    let items = menuItems;
    items.push({
      label: bar,
      command: () => setActiveLocation(bar),
      items: [{
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => removeLocation(bar)
      }]
    });
    setMenuItems(items);
    setActiveLocation(bar);
    setBar("");
  }

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
            icon: 'pi pi-chevron-left',
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
            Data for "{props.location}" not found.
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
