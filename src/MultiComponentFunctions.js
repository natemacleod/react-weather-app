// MultiComponentFunctions.js
// Contains functions that are used in multiple components

// Returns the appropriate icon based on the text given by the API
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

// Formats dates from epoch time to the appropriate format
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

export { getWeatherIcon, formatDate };