/* CLI => python -m SimpleHTTPServer */

const Header = () => {
  console.log('INFO:\tCOMPONENT - <Header />');
  return(
    <div className='container-fluid header'>
      <h1>Free Code Camp</h1>
      <h3>Local Weather App</h3>
    </div>
  );
}

class Temperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFahrenheit: true,
      icon: `http://openweathermap.org/img/w/${this.props.icon}.png`
    }

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({
      isFahrenheit: (this.state.isFahrenheit) ? false : true
    });
  }

  render() {
    // Convert to Fahrenheit if isFahrenheit, else convert to Celcius
    let TEMP = (this.state.isFahrenheit) ?
                Math.round(this.props.kelvin * (9/5) - 459.67) :
                Math.round(this.props.kelvin - 273.15);
    let TYPES = ['Fahrenheit', 'Celsius'];
    let TOOLTIP = ('Click to toggle ' + ((this.state.isFahrenheit)?TYPES[1]:TYPES[0]));
    return(
      <div className='row text-center'>
        <span id='weather-icon'>
          <img
            src={this.state.icon}
            alt='weather icon' />
        </span>
        <button
          id='degrees'
          onClick={this.handleButtonClick.bind(this)}
          data-toggle='tooltip'
          title={TOOLTIP}>
          {TEMP}&deg; {
            (this.state.isFahrenheit) ?
            TYPES[0].charAt(0) :
            TYPES[1].charAt(0)
          }
        </button>
      </div>
    );
  }
}

const WeatherData = (props) => {
  return(
    <div className='row boxes'>
      <div className='col col-sm-2'>
        <span id='location'>
          {props.city}
        </span>
      </div>
      <div className='col col-sm-2'>
        <span id="sky">
          {props.main + ": " + props.description}
        </span>
      </div>
      <div className='col col-sm-2'>
        <span id='wind'>
          {props.windspeed + " m/s"}
        </span>
      </div>
    </div>
  );
}

class LocalWeather extends React.Component {
  constructor(props) {
    console.log('INFO:\tCOMPONENT - <LocalWeather />');
    super(props);

    this.state = {
      data: null,
    };
  }

  render() {
    console.log('INFO:\tLIFECYCLE - LocalWeather.render()');
    // Dispay message indication loading weather data
    if (!this.state.data) {
      return (
        <div className='loading'>Grabbing weather data...</div>
      );
    }
    // Display weather data
    return (
      <div className="container-fluid content">
        <Temperature
          kelvin={this.state.data.main.temp}
          icon={this.state.data.weather[0].icon} />
        <WeatherData
          city={this.state.data.name}
          main={this.state.data.weather[0].main}
          description={this.state.data.weather[0].description}
          windspeed={this.state.data.wind.speed} />
          {$('[data-toggle="tooltip"]').tooltip()}
      </div>
    );
  }

  componentDidMount() {
    console.log('INFO:\tLIFECYCLE - LocalWeather.componentDidMount()');

    // setState undefined in geolocation callback, http://stackoverflow.com/a/38302892
    let self = this;
    const URL = 'http://api.openweathermap.org/data/2.5/weather?';
    const API_KEY = '987bdab9b6f926dbb6de05bf67491e93';
    // Checking for geolocation, https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation#The_geolocation_object
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let API_URL = `${URL}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}`;

        $.getJSON(API_URL).done((response) => {
          console.log('INFO:\tAPI response - ', response);
          self.setState({ data: response });
        }.bind(this));
      });
    } else {
      alert('ERROR:\tNo geolocation in current navigator.');
    }
  }
}

// Putting it all together
const App = () => {
  return(
    <div className='container-fluid text-center'>
      <Header />
      <LocalWeather />
    </div>
  );
}

/* RENDER */
ReactDOM.render(<App />, document.querySelector('#app'));
