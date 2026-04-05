import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import InfoBox from "./InfoBox";
import SearchBox from "./SearchBox";
import "./WeatherApp.css";

export default function WeatherApp () {
    const containerRef = useRef(null);
    const [weatherInfo, setWeatherInfo] = useState({
        city : "Delhi",
        feelsLike: 24,
        humidity: 57,
        temp: 24.05,
        tempMax: 24.05,
        tempMin: 24.05,
        weather: "haze",
    });

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    useGSAP(() => {
        gsap.from(".anim-block", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "circ.out"
        });
    }, { scope: containerRef });

    return (
    <div className="AppContainer" ref={containerRef}>
        <div className="Sidebar anim-block">
            <header className="Header">
                <h1>WEATHER</h1>
                <div className="LabelLine"></div>
                <p>DATA SYSTEM</p>
            </header>
            <div className="SearchWrapper">
                <SearchBox updateInfo={updateInfo}/>
            </div>
        </div>
        <div className="MainContent anim-block">
            <InfoBox info={weatherInfo}/>
        </div>
    </div>
    );
}