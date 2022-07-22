
const fs = require('fs');
const path = require('path');

const storeToken =  (token) => {
    const configLoc = '../config/test.env';
    if(fs.existsSync(configLoc)){
        const tokenEnv = `AUTHTOKEN = ${token}`;
        const readData = fs.readFileSync(configLoc).toLocaleString();
        const filterData = readData.split('\n').filter( (data) => !data.startsWith('AUTHTOKEN') ).join('\n');
        fs.writeFileSync(configLoc, filterData+`\n${tokenEnv}`);
        return true;
    }
    return false;
}

module.exports = { storeToken }