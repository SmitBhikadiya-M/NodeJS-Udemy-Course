console.log("Client side js file is loaded");

window.onload = function () {

  const weatherform = document.querySelector("#weather-search-form");
  const iferror = document.querySelector("#iferror");
  const ifnoterror = document.querySelector("#ifnoterror");
  
  weatherform.addEventListener("submit", (e) => {
    e.preventDefault();
    const search = e.target.querySelector("input[type=text]").value;
    fetch(`http://localhost:3000/weather?address=${search}`)
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res);
        if(res.error) {
            iferror.textContent = res.error;
        }else {
            iferror.textContent = '';
            ifnoterror.textContent = `Currently at ${res.placeName}, ${res.temperature}C temperature out `;
        } 
    })
    .catch((err)=>{
        iferror.textContent = err.error;
    });
  });
};

