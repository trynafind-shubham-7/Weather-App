import "./SearchBox.css";
import { useState, useRef } from 'react';
import gsap from "gsap";

export default function SearchBox({updateInfo}){
    let [city,setCity] = useState("");
    let [error,setError] = useState(false);
    const formRef = useRef(null);

    const API_URL ="http://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "573e9dedd00ebc54785e22012f33ab82";

    let getweatherInfo = async () => {
        try{
            let response = await fetch (`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
        
            let result = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_max,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,
            };
            return result;
        } catch (err) {
            throw err;
        }
    };

    let handleChange = (evt) => {
        setCity(evt.target.value); 
    };

    let handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            setError(false);
            
            // Interaction animation with GSAP
            gsap.to(formRef.current, { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });

            let newinfo = await getweatherInfo();
            updateInfo(newinfo);  
            setCity("");
        } catch (err) {
            setError(true);
            // Error shake animation
            gsap.fromTo(formRef.current, {x: -10}, {x: 10, duration: 0.05, yoyo: true, repeat: 5});
        }
    };

    return(
    <div className='SearchBox'>
        <form onSubmit={handleSubmit} className="SearchForm" ref={formRef}>
            <div className="InputGroup">
                <input 
                    id="city" 
                    type="text" 
                    placeholder="ENTER LOCATION" 
                    required 
                    value={city}
                    onChange={handleChange}
                    className="SolidInput"
                    autoComplete="off"
                />
            </div>
            <button type="submit" className="SolidButton">SEARCH</button>
            {error && <p className="ErrorMsgAnim">Location Unknown</p>}
        </form>
    </div>);
}