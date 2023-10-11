import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

function Forecast({ title, items}) {
    console.log(items);
  return <div>
    <div className='flex items-center mr-10 justify-start mt-6'>
        <p className='text-white -ml-6 md:-ml-6  font-medium uppercase whitespace-nowrap mb-6 mt-3'>{title}
        </p>
    </div>
    <hr className='-ml-20 -mr-20 md:-ml-6 md:-mr-20 mb-4 border-b-2'/>
    <div className='tracking-wide leading-tight flex text-sm -ml-4 md:text-xl flex-col md:flex-row w-fit items-center justify-between m-2 pr-2 text-cyan-200 '>
        {items.map((item) => (
            <div className='flex sm:flex-row -ml-20 sm:w-fit md:w-fit sm:p-0 pr-0 md:flex-col item-center md:pr-1  md: justify-between sm:m-2 md:m-0 tracking-wide leading-tight ' >
            <p className='text-sm  md:w-fit mb-4 font-bold md:text-lg whitespace-nowrap mr-4 flex flex-row text-white  '>{item.title} <br class="block" />
            </p>
            <hr className='my-0 border-b-2 md:hidden'/>
            <img src={iconUrlFromCode(item.icon)}alt=""
            className='mb-4 -mt-2 md:text-lg whitespace-nowrap mr-4 flex flex-row text-sm  w-12 md:w-12 my-0'/>
            
            <p className='font-medium mx-2 tracking-wide '>{`${item.temp.toFixed()}°`}</p>
            <p className='justify-center font-medium mx-2 md:text-sm  whitespace-nowrap capitalize mb-3'>{`${item.description}`}</p>
            
            
            

        </div>
        ))}
        


    </div>
  </div>
}

export default Forecast