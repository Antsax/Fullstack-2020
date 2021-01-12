import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({
    location: {
      name: '',
    },
    current: {
      temperature: '',
      wind_speed: '',
      wind_dir: '',
      weather_icons: '',
    },
  })

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.name},${country.capital}`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [country.capital, country.name])

  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <b>temperature: </b> {weather.current.temperature} Celsius <br />
      <img src={weather.current.weather_icons} alt="weather icon" /> <br />
      <b>wind: </b> {weather.current.wind_speed} mph direction{' '}
      {weather.current.wind_dir}
    </div>
  )
}

export default Weather
