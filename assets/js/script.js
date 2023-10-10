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
  cityInput = $("#cityInput").val();
  if (cityInput) {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&&units=imperial&appid=e061405c4316ec1d131b1d349216f1f6`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.endsWith("12:00:00")) {
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

function searchHistory(params) {
  var storedData = localStorage.getItem("save");
  historyArr = JSON.parse(storedData);
  if (cityInput) {
    if (historyArr.length <= 5) {
      historyArr.pop();
    }

    historyArr.unshift(cityInput);

    for (let i = 0; i < historyArr.length; i++) {
      historyBttn = $(
        `<button type="button" class="list-group-item list-group-item-action">${historyArr[i]}</button>`
      );
      historyList.append(historyBttn);
      
    }
  }
}

function forcastWeather() {}

$("#search").on("click", cityWeather);
