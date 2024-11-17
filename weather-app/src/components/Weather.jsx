import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import searchicon from '../assets/search.png'
import cloudicon from '../assets/cloud.png'
import drizzleicon from '../assets/drizzle.png'
import humidityicon from '../assets/humidity.png'
import rainicon from '../assets/rain.png'
import snowicon from '../assets/snow.png'
import windicon from '../assets/wind.png'
import clearicon from '../assets/clear.png'



const Weather = () => {

    const inputRef=useRef()

    const [weatherdata, setWeatherData] = useState(false);


    const allIcons = {
        "01d": clearicon,
        "01n": clearicon,
        "02d": cloudicon,
        "02n": cloudicon,
        "03d": cloudicon,
        "03n": cloudicon,
        "04d": drizzleicon,
        "04n": drizzleicon,
        "09d": rainicon,
        "09n": rainicon,
        "010d": rainicon,
        "010n": rainicon,
        "013d": snowicon,
        "013n": snowicon,

    }

    const search = async (city) => {
        if(city===""){
            alert("enter city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url)
            const data = await response.json()
  if(!response.ok){
    alert(data.message);
    return;
  }

            const icon = allIcons[data.weather[0].icon] || clearicon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
// setWeatherData(false)
console.error('error in fetching API');

        }
    }

    useEffect(() => {
        search('london')
    }, [])

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef}type='text' placeholder='search' />
                <img src={searchicon} alt='search icon' onClick={()=>search(inputRef.current.value)} />
            </div>
            
                <img src={weatherdata.icon} alt='' className='weather-icon' />
            <p className='temp'>{weatherdata.temperature}°c</p>
            <p className='city'>{weatherdata.location}</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidityicon} alt="" />
                    <div>
                        <p>{weatherdata.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={windicon} alt="" />
                    <div>
                        <p>{weatherdata.windSpeed}km/h</p>
                        <span>wind speed</span>
                    </div>
                </div>

            </div>
            
            
        </div>
    )
}

export default Weather
