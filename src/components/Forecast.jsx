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
    <div className='flex flex-col md:flex-row w-fit items-center justify-between m-2 pr-2 text-cyan-200'>
        {items.map((item) => (
            <div className='flex flex-col item-center justify-center mr-2'>
            <p className='font-bold text-lg text-white mr-4 '>{item.title}
            </p>
            <img src={iconUrlFromCode(item.icon)}alt=""
            className='w-fit md:w-12 my-1'/>
            
            <p className='font-medium mx-2'>{`${item.temp.toFixed()}°`}</p>
            <p className='font-medium mx-2'>{`${item.description}`}</p>
            <hr className='sm:my-2 border-b-2 '/>
            

        </div>
        ))}
        


    </div>
  </div>
}

export default Forecast