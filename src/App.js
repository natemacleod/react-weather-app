import './App.css';
import logo from './logo.svg';
import React from 'react';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import PrimeReact from 'primereact/api';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar';

PrimeReact.ripple = true;

function callAPI(path) {
  
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: null,
      locations: [],
      menuItems: [
        {
          label: 'My Locations',
          icon: 'pi pi-globe',
          items: [],
          disabled: true
        }
      ]
    }
  }
  render() {
    return (
      <div className="App">
        <Menubar
          model={this.state.menuItems}
          start={<img src={logo} height='50px' />}
          end={
            <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText placeholder='Search' />
            </span>
          }
        />
        <div id="basics">
          <div id="bigtext">
            <h1>Kitchener</h1>
            <h4>Kitchener, ON, Canada</h4>
            <h3 className="ib">24</h3>
            <h6 className="ib">.3</h6>
            <h3 className="ib">° | &nbsp;</h3>
            <p className="ib">Cooling down with a chance of rain Sunday.</p>
          </div>
          <div id="basicstats">
            <div className="stat">
              <i className='bi bi-chevron-up' />
              <div className="statInner">
                <h6>HIGH</h6>
                <p>33° / 33°</p>
              </div>
            </div>
            <div className="stat">
              <i className='bi bi-chevron-down' />
              <div className="statInner">
                <h6>LOW</h6>
                <p>33° / 33°</p>
              </div>
            </div>
            <div className="stat">
              <i className='bi bi-thermometer-half' />
              <div className="statInner">
                <h6>FEELS LIKE</h6>
                <p>33°</p>
              </div>
            </div>
            <div className="stat">
              <i className='bi bi-droplet' />
              <div className="statInner">
                <h6>HUMIDITY</h6>
                <p>33%</p>
              </div>
            </div>
            <div className="stat">
              <i className="bi bi-cloud-rain"></i>
              <div className="statInner">
                <h6>POP</h6>
                <p>33%</p>
              </div>
            </div>
            <div className="stat">
              <i className='bi bi-brightness-high' />
              <div className="statInner">
                <h6>UV INDEX</h6>
                <p>9</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
