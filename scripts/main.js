


const keyApi = "5c5308034d77a39e46ac52d2d8b185e1";
let resultatsApi;
const temps = document.querySelector('.temps')
const temperature = document.querySelector('.temperature')
const localisation = document.querySelector('.localisation')
const heure = document.querySelectorAll('.heure-nom-prevision')
const tempsPourH = document.querySelectorAll('.heure-prevision-valeur')
const joursDiv = document.querySelectorAll('.jour-prevision-nom')
const tempjoursDiv = document.querySelectorAll('.jour-prevision-temps')
const imgIcone = document.querySelector('.logo-meteo')
// const chargementContainer = document.querySelector('.overlay-icone-chargement')


//gestion du temps

const jourSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]

let Auj = new Date();
let options = {weekday: 'long'}

let today = Auj.toLocaleDateString('fr-FR', options);


today = today.charAt(0).toUpperCase() + today.slice(1)

const tabjour = jourSemaine.slice(jourSemaine.indexOf(today,)).concat(jourSemaine.slice(0, jourSemaine.indexOf(today)));


//-------------------------


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
        for(let k=0; k<tabjour.length; k++){
            joursDiv[k].innerHTML = tabjour[k].slice(0,3)
        }

        for(let m=0; m<7; m++){
            tempjoursDiv[m].innerHTML = `${Math.trunc(resultatsApi.daily[m + 1].temp.day)} °`
        }

        if(heureActuelle>=6 && heureActuelle<21){
            imgIcone.src =`ressources/jour/${resultatsApi.current.weather[0].icon}.svg`
        }else{
            imgIcone.src =`ressources/nuit/${resultatsApi.current.weather[0].icon}.svg`

        }

        // chargementContainer.classList.add('disparition')
    })
}