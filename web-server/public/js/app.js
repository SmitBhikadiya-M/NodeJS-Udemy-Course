console.log("Client side js file is loaded");

window.onload = function () {

  const weatherform = document.querySelector("#weather-search-form");
  const iferror = document.querySelector("#iferror");
  const ifnoterror = document.querySelector("#ifnoterror");
  
  weatherform.addEventListener("submit", (e) => {
    e.preventDefault();
    iferror.textContent = '';
    ifnoterror.textContent = 'Loading...';
    const search = e.target.querySelector("input[type=text]").value;
    fetch(`/weather?address=${search}`)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res);
        if(res.error) {
            iferror.textContent = res.error;
            ifnoterror.textContent = '';
        }else {
            ifnoterror.innerHTML = `<div>
                                      <img src='${res.weather_icons}'></img>
                                      <h3>${res.weather_descriptions}</h3>
                                      <span style='font-size:22px; font-weight:bold'>${res.temperature}C Temp</span>
                                      <p style='margin:0'>
                                        <div>(${res.placeName})</div>
                                        <div></div>
                                      </p>
                                    </div>`;
        } 
    })
    .catch((err)=>{
        iferror.textContent = err.error;
    });
  });
};

