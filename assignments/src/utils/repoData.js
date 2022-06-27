const request = require('request');

const loadRepoData = (fc) => {
    const url = "https://api.github.com/search/repositories?q=is:public+forks:>=200+language:python";
    const headers = {
        'user-agent' : 'assignments'
    }
    request({url, json:true, headers}, (err, res) => {
        if(err){
            fc("somthing went wrong with the connection!!!", undefined);
        }else if(res.body.errors && res.errors.length > 0){
            fc("Invalid Request!!!", undefined);
        }else if(res.body.total_count === 0){
            fc("Record Not Found", undefined);
        }else{
            fc(undefined, res.body.items);
        }
    });
}

module.exports = { loadRepoData }