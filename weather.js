//  API Key  884c877ee8984887bd4144108232202
// A new API key d3be45ab81944db78cfb907c42d4848e

// Get Elements
var serBtn = document.getElementById("search")
var foreCast = document.getElementById("forecast")



// Variables
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var box;
var foreBox;



// functions
async function Search(city) {
    var response = await fetch(` http://api.weatherapi.com/v1/forecast.json?key=884c877ee8984887bd4144108232202&q=${city}&days=3`);
    var result = await response.json()
    console.log(result);
    displayCurr(result.location, result.current)
    displayFore(result.forecast.forecastday)
}



function displayCurr(location, current) {
    var newDate = new Date(current.last_updated)
    box = `
    <div class="today forecast">
    <div class="forecast-header" id="today">
        <div class="day">${days[newDate.getDay()]}</div>
        <div class=" date">${newDate.getDate() + months[newDate.getMonth()]}</div>
    </div>
    <div class="forecast-content" id="current">
        <div class="location">${location.name}</div>
        <div class="degree">
            <div class="num">${current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
                <img src="https:${current.condition.icon}" alt="" width=90>
            </div>
        </div>
        <div class="custom">${current.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">20%</span><span><img src="images/icon-wind.png" alt="">
                18km/h
        </span>
        <span><img src="images/icon-compass.png" alt="">
            East
        </span>
    </div>
</div>
    `
    foreCast.innerHTML = box
}

function displayFore(city) {
    for (var i = 1; i < city.length; i++) {
        foreBox += `
        <div class="forecast">
        <div class="forecast-header">
            <div class="day">${days[new Date(city[i].date.replace(" ", "T")).getDay()]}</div>
        </div>
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="https:${city[i].day.condition.icon}" alt="" width=48>
            </div>
            <div class="degree">
                ${city[i].day.maxtemp_c}<sup>o</sup>C
            </div> 
            <small>${city[i].day.mintemp_c}<sup>o</sup></small>
             <div class="custom">${city[i].day.condition.text}</div>
        </div>
    </div>
        `
    }
    foreCast.innerHTML += foreBox
}


//Event
serBtn.addEventListener("keyup", city => {
    Search(city.target.value)
});


