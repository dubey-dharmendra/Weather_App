// api.openweathermap.org/data/2.5/weather?q=balrampur&appid=d0160b00ae603344d5349d39c9e62c20

import React,{useState,useEffect} from 'react';
import './temp.css';

function Temp() {

const [searchvalue,setsearchvalue] = useState("lucknow");
const [Tempinfo,setTempinfo]=useState({});
const [wemood,setwemood]=useState();
const getdata = async () =>{
    try {
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&units=metric&appid=d0160b00ae603344d5349d39c9e62c20`;

        const res = await fetch(url);
        const data = await res.json();

        const {temp,humidity,pressure} = data.main
        const {main:weathermood}=data.weather[0]
        const {name}=data
        const {speed}=data.wind
        const {country,sunset}=data.sys

        if(weathermood){
            switch(weathermood)
            {
                case 'Clouds':setwemood("wi-day-cloudy");
                break;
                case 'Haze':setwemood("wi-fog");
                break;
                case 'Clear':setwemood("wi-day-sunny");
                break;
                case 'Rain':setwemood("wi-wi-rain");
                break;
                case 'Mist':setwemood("wi-cloudy-windy");
                break;
                default:
                    setwemood("wi-day-sunny");
                break;
            }
        }

        const mywea={temp,humidity,pressure,weathermood,name,speed,country,sunset}
        setTempinfo(mywea)
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    getdata();
}, [])


// console.log(Tempinfo)
let sec=Tempinfo.sunset
let date = new Date(sec*1000)
let times = `${date.getHours()}:${date.getMinutes()}`;
    return (
        <div className="Main">
            <div className="content">
                <div className="search">
                    <input type="text" placeholder="city name.." className="searchb" value={searchvalue} onChange={(e)=>setsearchvalue(e.target.value)} />
                    <button className="btn" type="button" onClick={getdata} >Search</button>
                </div>

                <div className="data">
                    <div className="weathericon">
                        <i className={`wi ${wemood}`}></i>
                    </div>
                    <div className="info">
                        <div className="deg">
                            <span>{Tempinfo.temp}&deg;</span>
                            <p>{Tempinfo.weathermood}</p>
                        </div>
                        <div className="disription">
                            <div className="place">{Tempinfo.name},{Tempinfo.country}</div>
                            <div className="date">{new Date().toLocaleString()}</div>
                        </div>
                    </div>
                </div>
                    {/* 4 devided section */}
                    <div className="extra-temp">
                        <div className="min-max">
                            <p><i className={"wi wi-sunset"}></i></p>
                            <p className="down-txt">{times}<br/>
                            Sunset</p>
                        </div>
                        <div className="min-max">
                            <p><i className={"wi wi-humidity"}></i></p>
                            <p className="down-txt">{Tempinfo.humidity} <br/>
                            Humidity</p>
                        </div>
                        <div className="min-max">
                            <p><i className={"wi wi-rain"}></i></p>
                            <p className="down-txt">{Tempinfo.pressure} <br/>
                            Pressure</p>
                        </div>
                        <div className="min-max">
                            <p><i className={"wi wi-strong-wind"}></i></p>
                            <p className="down-txt">{Tempinfo.speed} <br/>
                            Speed</p>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Temp
