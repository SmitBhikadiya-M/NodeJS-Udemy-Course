const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const command = process.argv[2];

if(!command){
    console.log("Command must required to find Weather!!");
}else if(typeof command !== 'string'){
    console.log("Command must be a string");
}else{
    geocode.loadGeoCode(command, ({cordinates, placeName} = {}, error) => {
        if(error){
            console.log(error);
        }else{
            forecast.loadForecast(cordinates, (forecastData, error) => {
                if(error){
                    console.log(123, error);
                }else{
                    console.log(placeName);
                    console.log(`${forecastData.weather_descriptions[0]} throughout the ${ (forecastData.is_day==='yes') ? 'day' : 'night' }. It is currently ${forecastData.temperature}C degress out. It feels like ${forecastData.feelslike}C temprature out`);
                }
            });
        }
    });
    
    
}



