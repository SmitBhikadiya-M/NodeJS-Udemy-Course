const axios = require('axios');

const awaitTimeOut = (deley, cb) => {
    return new Promise( resolve => setTimeout( ()=>{ cb(); resolve();} , deley) );
}

const validateData = async (data) => {
    if( data.number % 10 == 0 ){
        data.category = 'Retried';
        data.number = Math.floor((Math.random()*60)+1);
        await awaitTimeOut(4000, () => {
            if(data.number % 10 == 0){
                data.category = 'Failed';
            }
        });
    }else{
        data.category = 'Direct';
    }
    return data;
}


const sendDataToDataTracker = async (data) => {
    return await axios({
        method: 'post',
        url: 'http://localhost:3003/insert',
        headers: {
            'Authorization': `Bearer ${data.authToken}`,
            'Content-Type': 'application/json'
        },
        data: {
            ...data, authToken: undefined
        }
    });
}

module.exports = { validateData, sendDataToDataTracker }