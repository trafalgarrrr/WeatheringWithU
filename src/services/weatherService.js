import { DateTime } from "luxon";

const API_KEY = "96b1ed10508eb6a22e446f44fbe50b82";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY});

    return fetch(url)
    .then((res) => res.json())
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: description, icon} = weather[0]
    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, description, icon, speed}
}

const formatForecastWeather = (data) => {
    let  { timezone, list, hourly } = data;
    const dailyForecasts = [];
    let previousDate = null;
    
    //hourly
   
    hourly = data.list.slice(3, 8).map(l => {
        //const luxonDateTime = DateTime.fromSeconds(l.dt * 1000,);
       
        //const timeOnly = l.dt_txt.split(" ")[1]; // day select
        
    const militaryTime = l.dt_txt.split(" ")[1];
    const luxonDateTime = DateTime.fromFormat(militaryTime, 'HH:mm:ss');
    const nonMilitaryTime = luxonDateTime.toFormat('hh:mm a');

    return {
        title: nonMilitaryTime,
        temp: l.main.feels_like,
        icon: l.weather[0].icon,
        description: l.weather[0].description,
        date: l.dt_txt,
    };
});
    //daily
    const tomorrow = DateTime.now().setZone(timezone).plus({ days: 1 }).toFormat('yyyy-MM-dd');
    list = list.slice(3, 40).map(l => {
        const apiDate = DateTime.fromFormat(l.dt_txt, 'yyyy-MM-dd HH:mm:ss', { zone: timezone });
        const apiDateFormatted = apiDate.toFormat('yyyy-MM-dd');

        if (apiDateFormatted >= tomorrow) {
            const date = apiDate.toFormat('ccc');
        if (date !== previousDate) {
            dailyForecasts.push({
                title: date,
                temp: l.main.temp,
                icon: l.weather[0].icon,
                description: l.weather[0].description,
                date: l.dt_txt,
            });

            // Update the previous date
            previousDate = date;
           
        }
        return {
            title: date,
            temp: l.main.temp,
            icon: l.weather[0].icon,
            description: l.weather[0].description,
            date: l.dt_txt,
            
        } 
    }
    });
    
    list.filter(item => item !== null);
   

    return {timezone, hourly, list: dailyForecasts};
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData("weather", searchParams).then(formatCurrentWeather);

    const {lat, lon} = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("forecast", {
        lat, lon, exclude: "current,minutely,alerts", units: searchParams.units,
    }).then(formatForecastWeather);

    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime = ( secs, zone, format = "cccc, yyyy dd LLL' | Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;


export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };