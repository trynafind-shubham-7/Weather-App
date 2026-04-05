import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AnimatedWeatherGraphic.css";

export default function AnimatedWeatherGraphic({ info }) {
    const containerRef = useRef(null);

    // Determine basic weather type
    const isRain = info.humidity > 80 || info.weather.includes("rain") || info.weather.includes("drizzle");
    const isCloud = info.weather.includes("cloud") || info.weather.includes("haze") || info.weather.includes("mist");
    const isSun = !isRain && !isCloud && info.temp > 15;
    
    // Default to cold/snow if none match and temp is low
    const isSnow = !isRain && !isCloud && !isSun && info.temp <= 15;

    useGSAP(() => {
        // Reset timelines and animations when info changes
        let ctx = gsap.context(() => {
            if (isSun) {
                gsap.to(".sun-shape", {
                    rotation: 360,
                    duration: 20,
                    repeat: -1,
                    ease: "linear"
                });
                gsap.fromTo(".sun-shape", 
                    { scale: 0 }, 
                    { scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
                );
            }

            if (isCloud || isRain || isSnow) {
                gsap.fromTo(".cloud-shape", 
                    { x: (i) => i % 2 === 0 ? -100 : 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power3.out" }
                );
                
                // Continuous floating for clouds
                gsap.to(".cloud-shape", {
                    y: 15,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    stagger: 0.5
                });
            }

            if (isRain) {
                gsap.fromTo(".drop", 
                    { y: -50, opacity: 0 },
                    { 
                        y: 500, 
                        opacity: 1, 
                        duration: 0.8, 
                        repeat: -1, 
                        stagger: { amount: 1.5, from: "random" }, 
                        ease: "linear" 
                    }
                );
            }

            if (isSnow) {
                gsap.fromTo(".flake", 
                    { y: -50, rotation: 0, opacity: 0 },
                    { 
                        y: 500, 
                        rotation: 360,
                        opacity: 1, 
                        duration: 3, 
                        repeat: -1, 
                        stagger: { amount: 2, from: "random" }, 
                        ease: "sine.inOut" 
                    }
                );
            }

        }, containerRef);
        
        return () => ctx.revert();
    }, [isRain, isCloud, isSun, isSnow]);

    return (
        <div className="weather-anim-container" ref={containerRef}>
            {isSun && (
                <div className="sun-wrapper">
                    <div className="sun-shape"></div>
                </div>
            )}
            
            {(isCloud || isRain || isSnow) && (
                <div className="clouds-wrapper">
                    <div className="cloud-shape c1"></div>
                    <div className="cloud-shape c2"></div>
                </div>
            )}

            {isRain && (
                <div className="rain-wrapper">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="drop" style={{ left: `${Math.random() * 100}%` }}></div>
                    ))}
                </div>
            )}

            {isSnow && (
                <div className="snow-wrapper">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="flake" style={{ left: `${Math.random() * 100}%` }}></div>
                    ))}
                </div>
            )}
        </div>
    );
}
