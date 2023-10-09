import './App.css';

import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLoc from './components/TimeAndLoc';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';



function App() {

  const [query, setQuery] = useState({q: 'philippines'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)
 

  useEffect(() => {
    const fetchWeather = async () => {
    await getFormattedWeatherData({...query, units}).then((data) => {
        setWeather(data);
      });
    
  
    };
  
    fetchWeather();

  }, [query, units]);
  const formatBackground = () => {
    if(!weather) return 'from-cyan-500 from-5% via-violet-500 via-20%  to-blue-600 to-90%'
    const threshold = units === 'metric' ? 30 :80
    if  (weather.temp <= threshold) return 'from-cyan-500 from-5% via-violet-500 via-20%  to-blue-600 to-90%'

    return 'from-yellow-500 from-10% via-orange-800 via-20%  to-orange-600 to-90%' 
  }
  
  return (
    <div className={`mx-auto max-w-screen-md mt-1 py-1 px-32 bg-gradient-to-br from-cyan-500 from-5% via-violet-500 via-20%  to-blue-600 to-90% h-fit shadow-xl shadow-gray-400 rounded-md ${formatBackground()}`}>
     <TopButtons setQuery = {setQuery}/>
     <Inputs setQuery = {setQuery} units = {units} setUnits = {setUnits}/>
     {weather && (
      <div>
      <TimeAndLoc weather ={weather}/>
     <TempAndDetails weather ={weather}/>
     <Forecast title="hourly forecast" items={weather.hourly}/>
     <Forecast title="daily forecast" items={weather.list}/>
      </div>
     )}
     
    

    </div>
    
  );
}

export default App;