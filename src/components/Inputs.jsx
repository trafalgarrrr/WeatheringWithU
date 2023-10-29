import React, { useState } from 'react'
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons'


function Inputs({setQuery, units, setUnits}) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = async () => {
    if (city !== '') {
      // Regular expression to check if the city contains any numbers
      const containsNumbers = /\d/.test(city);
      const containsMultipleSpaces = / {2,}/.test(city);

  
      if (containsNumbers) {
        alert('City name must not contain numbers');
        return;
      } else if (containsMultipleSpaces) {
        alert('City name must not contain multiple consecutive spaces');
        return;
      }
  
      try {
        const API_KEY = "96b1ed10508eb6a22e446f44fbe50b82";
        const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        
        const response = await fetch(BASE_URL);
        if (response.ok) {
          const data = await response.json();
          // Handle the data from the API as needed
          setQuery({ q: city });
        } else {
          // Handle HTTP errors
          alert('Invalid city name');
        }
      } catch (error) {
        // Handle other errors here
        alert('Invalid city name!');
      }
    } else {
      alert('Please input a city name!');
    }
  };


  const handleLocationClick = () => {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;

          setQuery({
            lat,
            lon,
          })
        }
      )
    }
  }
  

  return (
    <div className='flex flex-row justify-center my-2'>
        <div className='flex flex-row w-fit items-center justify-center space-x-1'>
            <input 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            type="text" 
            placeholder='Search for city...'
            className='text-sm md:text-xl flex items-center justify-around my-2 sm:fit md:w-fit border rounded py-2 px-4 p-3 font-light w-fit shadow-xl focus:outline-none capitalize' />
            <UilSearch size={25} 
            className="cursor-pointer  text-white hover:text-cyan-300 transition-colors hover:scale-150"
            onClick={handleSearchClick}
            
            />
            <UilLocationPoint
            size={25}                          
            className="text-sm  flex cursor-pointer text-white hover:text-cyan-300 transition-colors hover:scale-150"
            onClick={handleLocationClick}
/>
        </div>
        
        <div className='flex row md:w-fit items-center text-xl mx-2 -my-2 justify-center'>
            <button name='metric' className='sm:w-fit md:w-fit  font-light cursor-pointer  text-white hover:text-cyan-300 transition-colors hover:scale-150 '
            onClick={handleUnitsChange}>
            °C
            </button>
            <p className='text-xl text-white mx-1'>|</p>
            <button name='imperial' className='text-xl  font-light cursor-pointer  text-white hover:text-cyan-300 transition-colors hover:scale-150 '
            onClick={handleUnitsChange}>
            °F
            </button>

        </div>
    </div>
  )
}

export default Inputs