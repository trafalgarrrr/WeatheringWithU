import React from 'react'
import{
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,

} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TempAndDetails({weather: {description, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone}}) {
  return <div>
    <div className='flex items-center justify-center py-4 text-xl text-white'>
        <p>{description}</p>
    </div>

    <div className='flex flex-col md:flex-row items-center justify-between text-white py-0 mt-[-10px]'>
        <img src={iconUrlFromCode(icon)} 
        alt=""
        className='w-20' 
        /> 
        <p className='text-5xl'>{`${temp.toFixed()}°`}</p>
        <div className='flex flex-col space-y-2 my-0'>
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTemperature size={18} className='mr-1' />
                Real feel:
                <span className='font-medium ml-1'>{`${feels_like.toFixed()}°`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
                <UilTear size={18} className='mr-1' />
                Humidity:
                <span className='font-medium ml-1'>{`${humidity.toFixed()}%`}</span>
            </div>
            <div className='flex font-light text-sm items-center justify-center'>
                <UilWind size={18} className='mr-1' />
                Wind:
                <span className='font-medium ml-1 '>{`${speed.toFixed()}km/h`}</span>
            </div>
        </div>
    </div>

    <div className='flex items-center justify-around text-sm whitespace-normal mt-4 w-fit -ml-20 md:-ml-0 md:pl-0 flex-top space-x-2 text-white py-3 px-0'>
        <UilSun className='text-sm mr-0 -ml-8 md:-ml-0'/>
        <p className='font-light text-sm'>
            Rise: <span className='font-medium ml-1 text-sm'>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>
        <p className='font-light'>|</p>

        <UilSunset />
        <p className='font-light'>
            Set: <span className='font-medium ml-1'>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
        </p>
        <p className='font-light'>|</p>

        <UilArrowUp />
        <p className='font-light'>
            High: <span className='font-medium ml-1'>{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className='font-light'>|</p>

        <UilArrowDown />
        <p className='font-light'>
            Low: <span className='font-medium ml-1'>{`${temp_min.toFixed()}°`}</span>
        </p>

    </div>

  </div>

}

export default TempAndDetails