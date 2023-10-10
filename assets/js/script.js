var cityInput = $("#cityInput").val();
var historyList = $("#history");

var historyArr = [];

function cityGeo() {
  cityInput = $("#cityInput").val();
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=e061405c4316ec1d131b1d349216f1f6`
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

function cityWeather() {
  if (cityInput) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&&units=imperial&appid=e061405c4316ec1d131b1d349216f1f6`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var date = data.list[0].dt_txt.split(" ");
        $("#weather0H2").text(`${date[0]}`)
        
        $("#weather0t").text(`Temp:${data.list[0].main.temp}°F`)
        
        $("#weather0w").text(` Wind:${data.list[0].wind.speed}MPH`)

        $("#weather0h").text( ` Humidity:${data.list[0].main.humidity}`)
        var x =1;
        for (let i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.endsWith("12:00:00")) {
            date = data.list[i].dt_txt.split(" ");
            
            $(`#weather${x}H5`).text(`${date[0]}`)

            

            $(`#weather${x}H5`)
        
            $(`#weather${x}t`).text(`Temp:${data.list[i].main.temp}°F`)
            
            $(`#weather${x}w`).text(` Wind:${data.list[i].wind.speed}MPH`)
    
            $(`#weather${x}h`).text( `Humidity:${data.list[i].main.humidity}%`)
            x+=1;

            console.log(data.list[i].dt_txt);
            console.log(data.list[i].main.temp);
            console.log(data.list[i].main.humidity);
            console.log(data.list[i].weather[0].main);
            console.log(data.list[i].wind.speed);
            console.log(i);
          }
        }
      });
    cityInput = $("#cityInput").val("");
  }
}

function searchHistory() {
  var storedData = localStorage.getItem("searchHistory");
  historyArr = JSON.parse(storedData);
  if (cityInput) {
    if (historyArr === null) {
      historyArr = [];
    }
    //add to array
    historyArr.unshift(cityInput);
    // Trim array
    if (historyArr.length > 5) {
      historyArr.pop();
      console.log("pop");
    }
    historyList.html("");

    for (let i = 0; i < historyArr.length; i++) {
      historyBttn = $(
        `<button type="button" class="list-group-item list-group-item-action">${historyArr[i]}</button>`
      );
      historyList.append(historyBttn);
    }
    var jsonString = JSON.stringify(historyArr);
    localStorage.setItem("searchHistory", jsonString);
  }
}

function loadHistory() {
  var storedData = localStorage.getItem("searchHistory");
  historyArr = JSON.parse(storedData); 
  if (historyArr != null) {console.log(historyArr.length);
    for (let i = 0; i < historyArr.length; i++) {
      historyBttn = $(
        `<button type="button" class="list-group-item list-group-item-action">${historyArr[i]}</button>`
      );
      historyList.append(historyBttn);
    }
  }
}

function forcastWeather() {
  cityInput = $("#cityInput").val();
  searchHistory();
  cityWeather();
}


loadHistory();
$("#search").on("click", forcastWeather);
