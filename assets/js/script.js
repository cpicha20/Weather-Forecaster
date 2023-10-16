$(function () {
  loadHistory();
  

  $(".historyBtn").on("click", function () {
   
   cityInput= $(this).text();
    cityWeather();
     console.log($(this).text());
     
  });

  $("#search").on("click", forcastWeather);
});


var cityInput = $("#cityInput").val();
var historyList = $("#history");
var historyArr = [];

//retrieve city geocoordinates 
function cityGeo() {
  cityInput = $("#cityInput").val();
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=e061405c4316ec1d131b1d349216f1f6`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat.toFixed(2);

      var lon = data[0].lon.toFixed(2);

      const array = [lat, lon];
      console.log(array);
      return array;
    });
}

// Call weather API to retrieve weather data
function cityWeather() {
  if (cityInput) {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&&units=imperial&appid=e061405c4316ec1d131b1d349216f1f6`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        //Format date text
        var date = data.list[0].dt_txt.split(" ");
        date[0]=date[0].replace(/-/g,"/");

        //main weather display 
        $("#weather0H2").text(`${data.city.name} ${date[0]}`);
        icon = $(
          `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png">`
        );
        $("#weather0H2").append(icon);

        $("#weather0t").text(`Temp: ${data.list[0].main.temp}°F`);

        $("#weather0w").text(` Wind: ${data.list[0].wind.speed}MPH`);

        $("#weather0h").text(` Humidity: ${data.list[0].main.humidity}`);
        
        //5day forcast display
        var x = 1;
        for (let i = 8; i <= data.list.length; i+=8) {
            if (i==40) {
              i-=1;
            }
            date = data.list[i].dt_txt.split(" ");
            date[0]=date[0].replace(/-/g,"/");
            $(`#weather${x}H5`).text(`${date[0]}`);

            icon = $(
              `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">`
            );
            $(`#weather${x}H5`).append(icon);

            $(`#weather${x}t`).text(`Temp: ${data.list[i].main.temp}°F`);

            $(`#weather${x}w`).text(` Wind: ${data.list[i].wind.speed}MPH`);

            $(`#weather${x}h`).text(`Humidity: ${data.list[i].main.humidity}%`);
            x += 1;
   
        }
      });
    cityInput = $("#cityInput").val("");
  }
}

//Add new search entrys as buttons to the page
function searchHistory() {
  var storedData = localStorage.getItem("searchHistory");
  historyArr = JSON.parse(storedData);
  if (cityInput) {
    if (historyArr === null) {
      historyArr = [];
    }
  
    //add to array
    if (!historyArr.includes(cityInput)) {
      historyArr.unshift(cityInput);
    }
    // Trim array
    if (historyArr.length > 8) {
      historyArr.pop();
      console.log("pop");
    }

    historyList.html("");

    for (let i = 0; i < historyArr.length; i++) {
      historyBttn = $(
        `<button type="button" class="historyBtn list-group-item list-group-item-action text-white bg-primary text-center bg-gradient">${historyArr[i]}</button>`
      );
      historyList.append(historyBttn);

     
    } 
    //create new on click function for new buttons
      $(".historyBtn").on("click", function () {
   
        cityInput= $(this).text();
         cityWeather();
          console.log($(this).text());
          
       });
    var jsonString = JSON.stringify(historyArr);
    localStorage.setItem("searchHistory", jsonString);
  }
}

//Load local storage
function loadHistory() {
  var storedData = localStorage.getItem("searchHistory");
  historyArr = JSON.parse(storedData);
  if (historyArr != null) {
    console.log(historyArr.length);
    for (let i = 0; i < historyArr.length; i++) {
      historyBttn = $(
        `<button type="button" class="historyBtn list-group-item list-group-item-action text-white text-center bg-primary bg-gradient">${historyArr[i]}</button>`
      );
      historyList.append(historyBttn);
    }
  }
}

//init function
function forcastWeather() {

  cityInput = $("#cityInput").val();
  searchHistory();
  cityWeather();
  console.log("here");
}


