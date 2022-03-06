

const keyApi = "5c5308034d77a39e46ac52d2d8b185e1";
let resultatsApi;

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        // console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelApi(long, lat)
    }, ()=>{
        alert('vous avez desactivé la geolocalisation, merci de l\'activer pour pouvoir l\'utiliser')
    })
}

function AppelApi(long, lat){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyApi}`)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
    })
}