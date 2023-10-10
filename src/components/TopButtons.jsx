import React from 'react'

function TopButtons({setQuery}) {
    const cities = [
    {
        id:1,
        title: 'Manila'
    },
    {
        id:2,
        title: 'Cebu'
    },
    {
        id:3,
        title: 'Bacolod'
    },
    {
        id:4,
        title: 'Zamboanga'
    },
    {
        id:5,
        title: 'Davao'
    },
    ]

return <div className="text-sm md:text-xl flex items-center justify-around my-2 ">
    {cities.map((city) => (
        <button key={city.id} className=" text-sm md:text-lg p-3 font-medium text-white hover:text-cyan-300 transition-colors hover:scale-150 " onClick={() => setQuery({q: city.title})}> {city.title}</button>
    ))}
</div>
}

export default TopButtons