import cloud_icon from "../assets/cloudy.png";
import rain_icon from "../assets/rainy.png";
import snow_icon from "../assets/snowy.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import search_icon from "../assets/search.png";
import wind_icon from "../assets/wind.png";
import sun_icon from "../assets/sun.png";
import storm_icon from "../assets/storm.png";
import "./Weather.css";
import React, { useEffect, useRef } from "react";

const Weather = () => {

    const inputRef = useRef()
  const [weatherData, setWeather] = React.useState(false);
  const AllIcons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "11d": storm_icon,
    "11n": storm_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === ""){
        alert("Please enter valid city!")
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = AllIcons[data.weather[0].icon] || sun_icon;
      setWeather({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
        setWeather(false);
        console.error
    }
  };

  useEffect(() => {
    search("lahore");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input  ref = {inputRef} type="text" placeholder="Search for a city" />
        <img src={search_icon} alt="" onClick={()=>{search(inputRef.current.value)}}/>
      </div>
      <img src={weatherData.icon} alt="" className="weather_icon" />
      <p className="temperature">{weatherData.temperature}</p>
      <p className="city">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
          <div className="col">
            <img src={wind_icon} alt="" />
            <div>
              <p>{weatherData.wind}</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
