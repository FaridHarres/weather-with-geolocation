

const keyApi = "5c5308034d77a39e46ac52d2d8b185e1";
let resultatsApi;
const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const localisation = document.querySelector('.localisation')
const heure = document.querySelectorAll('.heure-nom-prevision')
const tempsPourH = document.querySelectorAll('.heure-prevision-valeur')


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

        resultatsApi= data;

        temps.innerHTML = resultatsApi.current.weather[0].description
        temperature.innerHTML = `${Math.trunc(resultatsApi.current.temp)}°`
        localisation.innerHTML = resultatsApi.timezone

        let heureActuelle = new Date().getHours();
        for(let i =0; i<heure.length; i++){
            let heureIncr = heureActuelle + i * 3

            if(heureIncr>24){
                heure[i].innerHTML = `${heureIncr -24} h`
            }else if(heureIncr === 24){
                heure[i].innerHTML = "00 h"
            }else{
                heure[i].innerHTML = `${heureIncr} h`
            }
        }

        for(let j=0; j<tempsPourH.length; j++){
            tempsPourH[j].innerHTML = `${Math.trunc(resultatsApi.hourly[j *3].temp)} °`
        }
    })
}