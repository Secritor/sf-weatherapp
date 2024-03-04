
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';
import {WEATHER_API_URL , WEATHER_API_KEY} from './api.js';
import {useState} from 'react';
import Forecast from './components/forecast/forecast.js';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecats] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${WEATHER_API_KEY}`);
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=${WEATHER_API_KEY}`);

    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (responce) => {
      const weatherResponse = await responce[0].json();
      const forecastResponse = await responce[1].json();

      setCurrentWeather({city: searchData.label , ...weatherResponse});
      setForecats({city: searchData.label, ...forecastResponse});
    })
    .catch((err) => console.log(err));

  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/> 
      {currentWeather && <CurrentWeather data={currentWeather}/> }
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
