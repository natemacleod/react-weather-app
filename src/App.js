import './App.css';
import logo from './logo.svg';
import React, { useState, useEffect } from 'react';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar';

PrimeReact.ripple = true;

const getWeatherIcon = i => {
  switch (i) {
    case 'snow': return (<i className='ib wi bi bi-snow' />);
    case 'snow-showers-day', 'snow-showers-night': return (<i className='ib wi bi bi-cloud-snow-fill' />);
    case 'rain': return (<i className='ib wi bi bi-cloud-rain-fill' />);
    case 'thunder-rain', 'thunder-showers-day', 'thunder-showers-night': return (<i className='ib wi bi bi-cloud-lightning-rain-fill' />);
    case 'showers-day', 'showers-night': return (<i className='ib wi bi bi-cloud-drizzle-fill' />);
    case 'fog': return (<i className='ib wi bi bi-cloud-fog-fill' />);
    case 'wind': return (<i className='ib wi bi bi-wind' />);
    case 'cloudy': return (<i className='ib wi bi bi-clouds-fill' />);
    case 'partly-cloudy-day': return (<i className='ib wi bi bi-cloud-sun-fill' />);
    case 'partly-cloudy-night': return (<i className='ib wi bi bi-cloud-moon-fill' />);
    case 'clear-day': return (<i className='ib wi bi bi-sun-fill' />);
    case 'clear-night': return (<i className='ib wi bi bi-moon-fill' />);
  }
}

const formatDate = d => {
  let arr = d.split('T');
  arr[1] = arr[1].substring(0, arr[1].length - 3);
  return arr[0] + " at " + arr[1];
}

const getDates = alert => {
  let start = alert['onset'];
  let end = alert['ends'];

  return formatDate(start) + " to " + formatDate(end);
}

const AlertView = (props) => {
  const alerts = props.alerts.map((a) => {
    return (
      <div className='alert' key={a['headline']}>
        <i className='bi bi-exclamation-triangle' />
        <div className='alertText'>
          <h5 className="ib"><a href={a['link']} target='_blank'>{a['headline']}</a></h5>
          <h6 className="ib"><em>{getDates(a)}</em></h6>
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${props.location}?unitGroup=metric&key=9MKRB6JF2FRHFZ7UU8G8GRFY2&contentType=json&iconSet=icons2`,
      {
        method: 'GET'
      }
    ).then((resp) => {
      resp.json().then((j) => {
        setData(j);
        console.log(j);
        setLoading(false);
      })
    });
  }, [props.location]);

  if (!loading) return (
    <div id='locData'>
      <div id="basics">
        <div id="bigtext">
          <div id="topline">
            <h2 className='ib'>{data['address']} //&nbsp;</h2>
            {getWeatherIcon(data['currentConditions']['icon'])}
            <h1 className="ib">{Math.round(data['currentConditions']['temp'])}°&nbsp;</h1>
          </div>
          <h4>{data['resolvedAddress']}</h4>
          <p>{data['description']}</p>
        </div>
        <div id="basicstats">
          <div className="stat">
            <i className='bi bi-chevron-up' />
            <div className="statInner">
              <h6>HIGH</h6>
              <p>{Math.round(data['days'][0]['tempmax'])}° / <em>{(Math.round(data['days'][0]['feelslikemax']))}°</em></p>
            </div>
          </div>
          <div className="stat">
            <i className='bi bi-chevron-down' />
            <div className="statInner">
              <h6>LOW</h6>
              <p>{Math.round(data['days'][0]['tempmin'])}° / <em>{(Math.round(data['days'][0]['feelslikemin']))}°</em></p>
            </div>
          </div>
          <div className="stat">
            <i className='bi bi-thermometer-half' />
            <div className="statInner">
              <h6>FEELS LIKE</h6>
              <p><em>{(Math.round(data['currentConditions']['feelslike']))}°</em></p>
            </div>
          </div>
          <div className="stat">
            <i className='bi bi-droplet' />
            <div className="statInner">
              <h6>HUMIDITY</h6>
              <p>{Math.round(data['currentConditions']['humidity'])}%</p>
            </div>
          </div>
          <div className="stat">
            <i className="bi bi-cloud-rain"></i>
            <div className="statInner">
              <h6>POP</h6>
              <p>{Math.round(data['currentConditions']['precipprob'])}%</p>
            </div>
          </div>
          <div className="stat">
            <i className='bi bi-brightness-high' />
            <div className="statInner">
              <h6>UV INDEX</h6>
              <p>{data['currentConditions']['uvindex']}</p>
            </div>
          </div>
        </div>
      </div>
      {data['alerts'].length > 0 &&
        <AlertView alerts={data['alerts']} />
      }
    </div>
  );
  else return (<div id='basics'>Loading</div>);
}

const App = (props) => {
  const [active, setActive] = useState('Kitchener');
  const [menuItems, setMenuItems] = useState([{
    label: 'Kitchener',
    command: () => setActive('Kitchener'),
    items: [{
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => console.log("Delete")
    }]
  }, {
    label: 'Victoria',
    command: () => setActive('Victoria'),
    items: [{
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => console.log("Delete")
    }]
  }]);

  return (
    <div className="App">
      <Menubar
        model={[
          {
            label: 'My Locations',
            icon: 'pi pi-globe',
            items: menuItems,
          }
        ]}
        start={<img src={logo} height='50px' />}
        end={
          <span className="p-input-icon-right">
            <i className="pi pi-search" />
            <InputText placeholder='Add a Location' />
          </span>
        }
      />
      <LocationData location={active} />
    </div>
  );
}

export default App;
