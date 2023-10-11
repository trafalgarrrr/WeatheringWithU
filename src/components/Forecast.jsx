import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

function Forecast({ title, items}) {
    console.log(items);
  return <div>
    <div className='flex items-center justify-start mt-6'>
        <p className='text-white -ml-16 font-medium uppercase whitespace-nowrap'>{title}
        </p>
    </div>
    <hr className='-ml-16 '/>
    <div className='tracking-wide leading-tight flex text-sm  md:text-xl flex-col md:flex-row w-fit items-center justify-between m-2 pr-2 text-cyan-200 '>
        {items.map((item) => (
            <div className='flex flex-col item-center justify-center tracking-wide leading-tight ' >
            <p className='text-sm  md:w-fit mb-4 font-bold md:text-lg whitespace-nowrap mr-4 flex flex-row text-white  '>{item.title} <br class="block" />
            </p>
            <hr className='my-0 border-b-2 md:hidden'/>
            <img src={iconUrlFromCode(item.icon)}alt=""
            className='text-sm w-fit md:w-12 my-0'/>
            
            <p className='font-medium mx-2 tracking-wide '>{`${item.temp.toFixed()}°`}</p>
            <p className='justify-center font-medium mx-2 md:text-lg whitespace-normal capitalize mb-3'>{`${item.description}`}</p>
            
            
            

        </div>
        ))}
        


    </div>
  </div>
}

export default Forecast