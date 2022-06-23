const request = require("request");

const loadGeoCode = (address, fc) => {
  const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2JoaWthZGl5YSIsImEiOiJjbDRwNTA2cHowMWJ5M2JubmJ3dTJjMTE0In0.jGtF7pX3zR3_tddoj5iH0A&limit=1`;
  
  request({ url: geocodingURL, json: true }, (err, res) => {
    if (err) {
        fc(undefined, "Unable to connect weather service!!");
    } else if(res.body.features.length === 0){
        fc(undefined, "Unable to find location. Try another search!!");
    }else{
        fc({cordinates: { latitude: res.body.features[0].center[1], longitude: res.body.features[0].center[0] }, placeName: res.body.features[0].place_name}, undefined);
    }
  });

};

module.exports = {
  loadGeoCode,
};
