import React from 'react'
import { useState, useEffect } from 'react';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Mumbai'); // Default location
    const [imgsrc, setImgsrc] = useState(null);

    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        error: null

    });

    const layer = "temp_new", z = 4, x = 10, y = 10;

    const apiKey = "55cd20b70efe11c1657d0115b68de9df";
    const apiUrl2 = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${apiKey}`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`;

    // const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    useEffect(() => {
        if (navigator.geolocation) {
            // Try to get the user's current location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // If successful, update the location state with the latitude and longitude
                    setLocation({
                        latitude: position.coords.latitude.toFixed(4),
                        longitude: position.coords.longitude.toFixed(4),
                        error: null
                    });
                    console.log(position.coords.latitude )

                    
                },
                (error) => {
                    // If there's an error, set the error message in state
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: error.message
                    });
                    console.log(location.latitude, location.longitude);
                }
            );
        } else {
            // If geolocation is not supported by the browser
            setLocation({
                latitude: null,
                longitude: null,
                error: 'Geolocation is not supported by this browser.'
            });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
                       
                // console.log(location.latitude+1,location.longitude+1);
            
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // console.log(response.url);
                // setImgsrc(response.url);
                const data = await response.json();

                // console.log(data);
                setWeatherData(data);
                setCity(data.name)

            } catch (error) {
                setError(error);
            }

        };


        fetchData();
    },[location]);


    return (
        <div>
            {/* {error && <p>Error: {error.message}</p>} */}
            {weatherData ? (
                <div>
                    <h2 className='weather-location'>Weather in {weatherData.name}</h2>
                    <p>Temperature: {Math.round(weatherData.main.temp)}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    {/* <img src={imgsrc} alt="no image"  /> */}
                    {/* <p>{console.log(weatherData)}</p> */}
                </div>
            ) : (
                <p>Loading weather data...</p>

            )}


        </div>
    )
}

export default Weather