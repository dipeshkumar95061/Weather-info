
const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

const imageiconbody=document.getElementById("img");

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date1');
//const timezone = document.getElementById('time-zone');
//const countryEl = document.getElementById('country');
const currentWeatherItemsEl = document.getElementById('current-weather-items');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);



// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
        document.querySelector('.current-info .others').style.display = "block";
    }

});


// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);

   
}


// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    console.log(weather.weather[0].icon);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

   // <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"></img>

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    let {humidity, pressure} = weather.main;
    let { sunrise, sunset} = weather.sys;
    let {speed} = weather.wind;


    imageiconbody.innerHTML = `
    <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png">
    `
    currentWeatherItemsEl.innerHTML = 
     `<div class="weather-item">
         <div>Humidity</div>
         <div>${humidity}%</div>
      </div>
      <div class="weather-item">
          <div>Pressure</div>
          <div>${pressure}pa</div>
       </div>
       <div class="weather-item">
           <div>Wind Speed</div>
            <div>${speed}km/h</div>
         </div>

       <div class="weather-item">
          <div>Sunrise</div>
          <div>${window.moment(sunrise * 1000).format('HH:mm A')}</div>
       </div>
       <div class="weather-item">
           <div>Sunset</div>
           <div>${window.moment(sunset*1000).format('HH:mm A')}</div>
        </div>
        <div class="weather-item">
            <div> <a href="./forecast.html">5 Days Weather Forecast</a></div> 
        </div>
 `;

 
 


      


    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
       // document.getElementById( "http://openweathermap.org/img/wn/01d.png");
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/haze.webp')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } else if(weatherType.textContent == 'Smoke') {
    
        document.body.style.backgroundImage = "url('images/smoke.jpg')";
        
    } 

   
    

}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}




