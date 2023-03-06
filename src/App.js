import hotbg from './assets/hot.jpg'
import coldbg from './assets/cold.jpg'
import Description from './components/Description';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';


function App() {
  const [city , setCity] =useState("Delhi")
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg , setBg]= useState(hotbg)


useEffect(() =>{
  const fetchWeatherData =async () =>{
   const data = await getFormattedWeatherData(city,units);
   setWeather(data)

   
   if (data.temp <= 20 ) 
   {setBg(coldbg)}
   else{
    setBg(hotbg)
   }

  };

  fetchWeatherData();

},[city]);



const enterKeyPressed =(e) =>{
  if (e.keyCode === 13){
    setCity(e.currentTarget.value)
    e.currentTarget.blur();
  }
};
            

  return (
    <div className="app"style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
      {
        weather && (
          <div className="container">
          <div className="section section__input">
            <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City..' />
            <button>*F</button>
          </div>
          <div className="section section__temprature">
            <div className="icon">
              <h3>{`${weather.name},${weather.country}`}</h3>
              <img src={weather.iconURL}
              alt="weatherIcon" />

             <h3>{weather.description}</h3>
            </div>
            <div className="temprature">
              <h1>{`${weather.temp.toFixed()} *${
                units === "metric" ? "C" : "C"}`}
               </h1>
            </div>
          </div>
           <Description weather={weather} units={units}/>

        </div>

        )
      }
        
      </div>
    </div>
  );
}

export default App;
