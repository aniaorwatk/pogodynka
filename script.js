const API_KEY = "de822aba6532905c457709ee2d384701";
const cityName = document.getElementById("CityName");
const cityCountry = document.getElementById("CityCountry");
const  cityTemp= document.getElementById("CityTemp");
const cityWind=document.getElementById("CityWind");
const citydescription= document.getElementById ("CityDescription");
const cityFeelLikes= document.getElementById ("CityFeelsLike");
const cityTempMin=document.getElementById("CityTempMin")
const cityTempMax=document.getElementById("CityTempMax")
const citypressure=document.getElementById("CityPressure")
const searchBtn=document.getElementById("SearchBtn");
const citySearch =document.getElementById("CitySearch");
const errorMessage=document.getElementById("ErrorMessage");
const showLocationBtn=document.getElementById("ShowLocationBtn");
const weatherIcon=document.getElementById("CityWeatherIcon");
const cityData=document.getElementById("CityData");

const convertToCelsius = (a)=>{
    return Math.round(a-273.15)+" °C";
}
const convertToKm =(b)=>{
    return Math.round (b*1.609344)+ " km/h";
}

 const weatherInfo =(info) => {
     console.log("Pogoda na dziś", info);
     cityName.textContent = info.name;
     cityCountry.textContent = info.sys.country;
     cityTemp.textContent =convertToCelsius(info.main.temp);
     cityFeelLikes.textContent=convertToCelsius(info.main.feels_like);
     cityWind.textContent=convertToKm(info.wind.speed);
     citydescription.textContent=info.weather[0].description;
     cityTempMin.textContent=convertToCelsius(info.main.temp_min);
     cityTempMax.textContent=convertToCelsius(info.main.temp_max);
     citypressure.textContent=(info.main.pressure)+" hPa";
// cityData.textContent =new Date ().toLocaleDateString();
     weatherIcon.src = `http://openweathermap.org/img/wn/${info.weather[0].icon}.png`;
errorMessage.textContent ="";
 };

 const getWeatherBySearch =(city) => {
  
     const URL =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pl`;
     fetch(URL)
     .then((res)=> res.json())
     .then((res)=> weatherInfo(res))
     .catch((err)=> errMsg(err));
 };

 const errMsg =(err) =>{
     return (errorMessage.textContent = "Podane Miasto nie istnieje");
 }

const getWeatherByLocation = (coords) =>{
    console.log(coords);
    const URL = `http://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&lang=pl`;
   fetch(URL)
   .then((res)=>res.json())
   .then((res)=>weatherInfo(res))
   .catch((err)=>console.log(err));
};

const getByLocation =() => {
    return navigator.geolocation.getCurrentPosition((position)=> getWeatherByLocation(position.coords));
};

getByLocation();

const getSearchResult = () => {
    if(citySearch.value !==""){
        return getWeatherBySearch(citySearch.value);   
    }else{
        console.log("Nic nie wpisano");
    }  
};
searchBtn.addEventListener("click", getSearchResult);
showLocationBtn.addEventListener("click", getByLocation);