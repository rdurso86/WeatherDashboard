//let city = $("#city").val();
let citySearch = $("#citySearch");
let searchBtn = $("#searchBtn");
let searchedList = $("#searchedList");
let currentCity = $("#currentCity");
let fiveDay = $("#fiveDay");
let fiveTemp = $(".fiveTemp");
let fiveDate = $(".fiveDate");
let fiveHumid = $(".fiveHumid");
let cities = [];
let temp = $(".temp");
let humid = $(".humid");
let wind = $(".wind");
let uv = $(".uv");
let current = $("#current");
let day = moment().format("(l)");
console.log(day);
$("#today").html(day);

//let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253";


//i put this within the button click function, is this where it should be?
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     $(citySearch).text(JSON.stringify(response));
//     console.log(response);
// });



//trying to clear input field when text box is clicked into
// $("#city").on("focus", function () {
//     $(city).empty();
// });


function renderList() {
    $(searchedList).empty();

    for (var i = 0; i < cities.length; i++) {

        let c = $("<ul>");
        c.addClass("savedCity");
        c.attr("data-name", cities[i]);
        c.text(cities[i]);
        $(searchedList).append(c);
    }
};

$(searchBtn).on("click", function (event) {
    event.preventDefault();
    let city = $("#city").val().trim();
    cities.push(city);
    current.text(city);

    renderList();
    //how can i clear the text box?
    let queryURLone = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253";
    //let response = {"coord":{"lon":-1.09,"lat":50.8},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":35.11,"feels_like":28.11,"temp_min":30.99,"temp_max":39.99,"pressure":1034,"humidity":100},"visibility":10000,"wind":{"speed":6.93,"deg":200},"clouds":{"all":82},"dt":1580944935,"sys":{"type":1,"id":1499,"country":"GB","sunrise":1580888118,"sunset":1580922079},"timezone":0,"id":2639996,"name":"Portsmouth","cod":200}
    
    $.ajax({
        url: queryURLone,
        method: "GET"
    }).then(function (response) {
        $(temp).text (`Temperature: ` + (JSON.stringify(response.main.temp) + ` °F`));
        $(humid).text (`Humidity: ` + (JSON.stringify(response.main.humidity) + `%`));
        $(wind).text (`Wind Speed: ` + (JSON.stringify(response.wind.speed) + ` MPH`));

        let lat = response.coord.lat;
        let lon = response.coord.lon;
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=db7eebd821863071e9b6ab0753df6253&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }).then(function (response) {
            $(uv).text (`UV Index: ` + (JSON.stringify(response.value)));
        });
    
        $.ajax({
               url: "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253",
               method: "GET"
           }).then(function (response) {
               $(fiveTemp).text (`Temperature: ` + (JSON.stringify(response.list[6].main.temp) + ` °F`));
               $(fiveHumid).text (`Humidity: ` + (JSON.stringify(response.list[6].main.humidity) + `%`));
               $(fiveDate).text (`Date: ` + (response.list[6].dt_txt.slice(5, 10))) ;
       console.log(response.list[6].dt_txt.slice(5, 10));
           });
    
    
    });

    


});

renderList();