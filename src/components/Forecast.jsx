import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

function Forecast({ title, items}) {
    console.log(items);
  return <div>
    <div className='flex items-center justify-start mt-6'>
        <p className='text-white font-medium uppercase'>{title}
        </p>
    </div>
    <hr className='my-2'/>
    <div className='flex flex-row items-center justify-between text-cyan-200'>
        {items.map((item) => (
            <div className='flex flex-col item-center justify-center'>
            <p className='font-bold text-sm'>{item.title}
            </p>
            <img src={iconUrlFromCode(item.icon)}alt=""
            className='w-12 my-1'/>
            
            <p className='font-medium mx-2'>{`${item.temp.toFixed()}°`}</p>
            <p className='font-medium mx-2'>{`${item.description}`}</p>

        </div>
        ))}
        


    </div>
  </div>
}

export default Forecast