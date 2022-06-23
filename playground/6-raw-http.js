// hear we explore http and https which in-built nodejs lib  

const http = require('http');
const url = `http://api.weatherstack.com/current?access_key=b86e8775d0e107671719b29b8b73df89&query=45,-75`;

const request = http.request(url, (res)=>{
    let data = '';
    res.on('data', (chunk) => {
       data += chunk.toString();
    });
    res.on('end', ()=>{
        data = JSON.parse(data);
        console.log(data);
    });
});


request.on('error', error => { console.error(error) });
request.end();