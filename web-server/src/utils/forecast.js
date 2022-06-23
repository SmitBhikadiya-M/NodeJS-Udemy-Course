const request = require('request');

const loadForecast = ({latitude, longitude, placeName}={}, fc) => {
    const url = `http://api.weatherstack.com/current?access_key=b86e8775d0e107671719b29b8b73df89&query=${latitude},${longitude}`;
    request({url, json: true}, (err, res)=>{
        if(err){
            fc(undefined, 'Unable to connect with the server')
        }else if(res.body.success!=undefined && res.body.success===false){
            fc(undefined, 'Unable to find forecast for given cordinates');
        }else{ 
            fc({placeName, ...res.body.current}, undefined)
        }
    });
}

module.exports = { loadForecast }
