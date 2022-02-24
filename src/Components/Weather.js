import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiOutlineReload } from "react-icons/ai";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { MdLocationOn } from "react-icons/md";
import { TiWeatherCloudy } from "react-icons/ti";

export const Weather = () => {
  var API_KEY = "cc518323bacd827e81fe5806dbfd156f";
  const [Lat, setLat] = useState();
  const [Long, setLong] = useState();
  const [Weather, setWeather] = useState();
  const [Sunrise, setSunrise] = useState();
  const [Sunset, setSunset] = useState();
  const [Loading, setLoading] = useState(false);

  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  console.log(time);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });

    const fetchWeather = async () => {
      await axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=cc518323bacd827e81fe5806dbfd156f`
        )
        .then((res) => {
          let weatherData = res.data;
          setWeather(weatherData);
          console.log(res.data);
          setSunrise(weatherData.sys.sunrise);
          setSunset(weatherData.sys.sunset);
        })
        .catch((err) => console.log(err));
    };
    fetchWeather();
    console.log("Latitude:" + Lat + " " + "Longitude: " + Long);
    console.log(Weather);
  }, [Lat, Long]);

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => {
      window.location.reload();
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <title>Weather App</title>
      <div className="weather-app">
        <div className="row app-wrap">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-white app-title">Check Weather</h5>
            </div>
            {!Weather ? (
              <span className="spinner-border weather-loading"></span>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-start">
                  <h1 className="text-secondary display-5 city-name">
                    <MdLocationOn /> You're in {Weather.name}
                  </h1>
                  <div>
                    <span className="country">({Weather.sys.country})</span>
                    <button
                      className={
                        Loading == true
                          ? "btn btn-reload loading"
                          : "btn btn-reload"
                      }
                      onClick={handleReload}
                    >
                      <AiOutlineReload />
                    </button>
                  </div>
                </div>

                <p className="sunrise text-white">
                  <span className="icon">
                    <WiSunrise />
                  </span>
                  <span>Sunrise at {moment.unix(Sunrise).format("h:mA")}</span>
                </p>
                <p className="sunset text-white">
                  <span className="icon">
                    <WiSunset />
                  </span>
                  <span>Sunset at {moment.unix(Sunset).format("h:mA")}</span>
                </p>
                {Weather.weather.map((list, index) => {
                  return (
                    <div key={index} className="description text-white">
                      <span className="icon">
                        <TiWeatherCloudy />
                      </span>
                      {list.description}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
