import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getWeather() {
    setLoading(true);
    setError("");

    try {
      const API_KEY =import.meta.env.VITE_WEATHER_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

          if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="container">
      <h1>Weather App 🌦️</h1>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />

      <button onClick={getWeather}>Get Weather</button>

      {loading && <p>Loading weather...</p>}

      {error && <p>{error}</p>}

      {weather && !loading && (
        <div>
          <h2>{weather.name}</h2>
          <h1>{weather.main.temp}°C</h1>
          <div className="weather-condition">
          
          <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          />
          <p>{weather.weather[0].description}</p>
          </div>
          <div className="weather-details">
          <div className="detail-card">
            <span>💧</span>
            <p>Humidity</p>
            <h3>{weather.main.humidity}%</h3>
          </div>

          <div className="detail-card">
            <span>💨</span>
            <p>Wind Speed</p>
            <h3>{weather.wind.speed} m/s</h3>
          </div>

          <div className="detail-card">
          <span>🌡️</span>
          <p>Feels Like</p>
          <h3>{weather.main.feels_like}°C</h3>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;