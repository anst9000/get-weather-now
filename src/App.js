import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Form from './Form';
import Presentation from './Presentation';

const App = () => {
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState(null)
  const [requestError, setRequestError] = useState(false)

  useEffect(() => {
    if (location === "") return

    const API_KEY = process.env.REACT_APP_GET_WX_NOW
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${API_KEY}`;

    const getInfo = async () => {
      await axios.get(baseURL).then((res) => {
        console.log(res.data);
        setWeather(res.data)
        setRequestError(false)
      }).catch((error) => {
        setRequestError(true)
        if (error.status === 400) {
          console.log('Handle 400')
        } else if (error.status === 404) {
          console.log('Handle 404')
        } else {
          // Handle else
        }

        console.log(error.message)
      })
    }

    getInfo()
  }, [location])

  const getLocation = (city) => {
    setLocation(city)
  };

  return (
    <div className="container">
      <div className="content">
        <header>
          <h1>Get Weather Now</h1>
          <h2>{ }</h2>
          <p>Type city or place below.</p>
          <p>{ }</p>
        </header>

        <Form getLocation={getLocation} />
        <Presentation weather={weather} requestError={requestError} location={location} />

        <footer>
          <p>Page by Anders Strömberg</p>
          <p><a href="mailto:coltlaboy@yahoo.se">coltlaboy@yahoo.se</a></p>
          <p>Weather is fetched from OpenWeather API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
