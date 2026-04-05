import "./InfoBox.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedWeatherGraphic from "./AnimatedWeatherGraphic";

export default function InfoBox({ info }){
    const containerRef = useRef(null);
    const imgRef = useRef(null);

    const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=1200&auto=format&fit=crop&q=80";
    const COLD_URL = "https://images.unsplash.com/photo-1520889905494-a9ba556b0cf2?w=1200&auto=format&fit=crop&q=80";
    const RAIN_URL = "https://images.unsplash.com/photo-1559234599-4119a32377d6?w=1200&auto=format&fit=crop&q=80";
    const HAZE_URL = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80";
    const SNOW_URL = "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&auto=format&fit=crop&q=80";
    const THUNDER_URL = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1200&auto=format&fit=crop&q=80";

    const weather = info.weather.toLowerCase();
    let imageUrl;
    if (weather.includes("thunder") || weather.includes("storm")) imageUrl = THUNDER_URL;
    else if (weather.includes("snow") || weather.includes("sleet")) imageUrl = SNOW_URL;
    else if (weather.includes("rain") || weather.includes("drizzle") || info.humidity > 80) imageUrl = RAIN_URL;
    else if (weather.includes("haze") || weather.includes("mist") || weather.includes("fog") || weather.includes("smoke")) imageUrl = HAZE_URL;
    else if (info.temp <= 15) imageUrl = COLD_URL;
    else imageUrl = HOT_URL;

    useGSAP(() => {
        // Smooth image transition + scale upon city change
        gsap.fromTo(imgRef.current,
            { scale: 1.08, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
        );
        gsap.fromTo(containerRef.current,
            { opacity: 0.85, scale: 0.99 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" }
        );
    }, { dependencies: [info], scope: containerRef });

    return (
        <div className="SolidInfoBox" ref={containerRef}>
            
            {/* Full-bleed background image */}
            <div className="WeatherImageBg">
                <img src={imageUrl} alt={info.weather} ref={imgRef} />
            </div>

            {/* Abstract animated weather shapes layered over image */}
            <AnimatedWeatherGraphic info={info} />

            {/* Data layout floats over the image */}
            <div className="InfoLayout">
                <div className="MainTempZone">
                    <h2 className="CityTitleSolid">{info.city}</h2>
                    <div className="TempDisplaySolid">
                        <span className="BigTempSolid">{Math.round(info.temp)}&deg;</span>
                        <span className="WeatherStatusSolid">{info.weather}</span>
                    </div>
                </div>

                <div className="DetailsZone">
                    <div className="StatBlock color-alt-1">
                        <span className="StatLabelSolid">Feels Like</span>
                        <span className="StatValueSolid">{Math.round(info.feelsLike)}&deg;</span>
                    </div>
                    <div className="StatBlock color-alt-2">
                        <span className="StatLabelSolid">Humidity</span>
                        <span className="StatValueSolid">{info.humidity}%</span>
                    </div>
                    <div className="StatBlock color-alt-3">
                        <span className="StatLabelSolid">Min Temp</span>
                        <span className="StatValueSolid">{Math.round(info.tempMin)}&deg;</span>
                    </div>
                    <div className="StatBlock color-alt-4">
                        <span className="StatLabelSolid">Max Temp</span>
                        <span className="StatValueSolid">{Math.round(info.tempMax)}&deg;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}