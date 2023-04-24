import React, { useState, useEffect } from "react"
import getWeather from "../services/weather"


const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    getWeather(capital).then(currentWeather => setWeather(currentWeather))
  }, [])

  if (!weather) {
    return (
      <p>Loading weather...</p>
    )
  }

  return(
    <div>
      <h3>Weather in {capital}</h3>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>{weather.weather[0].main}</p>
      <p>Temperature: {weather.main.temp} ℃</p>
      <p>Feels like: {weather.main.feels_like} ℃</p>

    </div>
  )
}
  
  export default Weather