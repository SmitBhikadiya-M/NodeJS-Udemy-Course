
window.onload = () => {
    const form = document.getElementById("assignment1Form");
    const errorDiv = document.querySelector(".errorDiv");
    let data = null;
    form.addEventListener('submit', (e)=>{
        errorDiv.textContent = "Fetching....";
        e.preventDefault();
        let stargazers = document.getElementById("stargazers").value;
        if( stargazers===undefined || stargazers==='' || stargazers===null ) stargazers = 0;
        const baseApi = "http://localhost:3000/repolist?stargazers_count="+stargazers;
        fetch(baseApi+"&download=csv", {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.length === 0){
                errorDiv.textContent = "Record Not Found!!!";
            }else if(res.error!==undefined){
                errorDiv.textContent = res.error;
            }else{
                errorDiv.innerHTML = '<p style="color:green">Data Fetched & Downloaded Successfully</p>';
                data = res;
            }
        }).catch((err)=>{
            console.log(err);
            data = null;
            errorDiv.textContent = err;
        });
    });
}