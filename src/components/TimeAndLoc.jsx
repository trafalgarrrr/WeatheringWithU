import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

function TimeAndLoc({weather: {dt, timezone, name, country}}) {
  return <div>
    <div className='flex items-center justify-center my-6 whitespace-normal'>
        <p className='text-white text-xl font-extralight'>
            {formatToLocalTime(dt, timezone)}
        </p>
    </div>

    <div className='flex items-center justify-center whitespace-nowrap my-3'>
        <p className='text-white text-3xl font-medium '>{`${name}, ${country}`}
            
        </p>
    </div>


  </div>
  
}

export default TimeAndLoc