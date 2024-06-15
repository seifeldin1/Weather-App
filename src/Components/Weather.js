
import React from "react";
import { useState , useEffect} from "react";
import "./Weather.css";


const GetWeather=()=>{
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState('');
    const [lattitude , setLattitude] = useState(30.0444); 
    const [longitude , setLongitude] = useState(31.2357);
    const[weather , setWeather] = useState(null);

    const[newlattitude , setNewLattitude] = useState(lattitude);
    const[newlongitude , setNewLongitude] = useState(longitude);

    //contains message when new longitude or new lattitude changes
    useEffect(()=>{
        setError('Click "Get Weather" to get the weather of the coordinates you have choosen ')
    } , [lattitude , longitude]);

    const fetchWeather= async()=>{
        try{
            setLoading(true);
            const response = await fetch( `https://api.open-meteo.com/v1/forecast?latitude=${lattitude}&longitude=${longitude}&current=temperature_2m`);

            if(!response.ok) throw new Error("You have enetered wrong coordinates");
            const data = await response.json();

            setWeather(data);
            setNewLattitude(lattitude);
            setNewLongitude(longitude);
        }
        catch(err){
            setError(err.message);
        }
        finally{
            setLoading(false);
        }
        
    }

    const submitHandler=(event)=>{
        event.preventDefault();
        fetchWeather();
    }

    console.log(weather);

    return(
        <div className="weather-container">
            <h1>Weather App</h1>
            <form onSubmit={submitHandler} className="form">
                <label className="titles">
                    Latitude:
                    <input type="number" value={lattitude} className="coordinates" onChange={(e)=>setLattitude(e.target.value) }></input>
                </label>
                <label className="titles">
                    Longitude:
                    <input type="number" value={longitude} className="coordinates" onChange={(e)=>setLongitude(e.target.value) }></input>
                </label>
                <button type="submit" className="submit-button">Get Weather</button>
                
            </form>
            {loading&& <p>Loading...</p>}
            {error&& <p className="theError">{error}</p>}
            {weather&& (

                <div className="result">
                    <h3>Weather at location: {newlattitude}° N, {newlongitude}° E</h3>
                    <p>Temperature: {weather.current.temperature_2m}°C</p>
                </div>
            )

               
            }

        </div>
    )




}


export default GetWeather;