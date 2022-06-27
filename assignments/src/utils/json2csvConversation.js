const csvwriter = require('csv-writer');
const path = require('path');

const converter = (data, fc) => {

    const donwloadsPath = path.join(__dirname, '../../public/downloads/csvs/');
    const createCsvWriter = csvwriter.createObjectCsvWriter;

    const csvWriter = createCsvWriter({
        path: donwloadsPath+"repoData.csv",
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'description', title: 'DESCRIPTION'},
            {id: 'html_url', title: 'HTML_URL'},
            {id: 'watchers_count', title: 'WATCHERS_COUNT'},
            {id: 'stargazers_count', title: 'STARGAZERS_COUNT'},
            {id: 'forks_count', title: 'FORKS_COUNT'},

        ]
    });

    csvWriter.writeRecords(data).then((res)=>{
        console.log("Data Successfully Uploaded In CSV file");
    }).catch((err)=>{
        console.log(err);
    });

}


module.exports = converter;