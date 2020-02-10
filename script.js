//let city = $("#city").val();
let citySearch = $("#citySearch");
let searchBtn = $("#searchBtn");
let searchedList = $("#searchedList");
let currentCity = $("#currentCity");
let fiveDay = $("#fiveDay");

let fiveTemp1 = $(".fiveTemp1");
let fiveDate1 = $(".fiveDate1");
let fiveHumid1 = $(".fiveHumid1");
let fiveImage1 = $(".fiveImage1");

let fiveTemp2 = $(".fiveTemp2");
let fiveDate2 = $(".fiveDate2");
let fiveHumid2 = $(".fiveHumid2");
let fiveImage2 = $(".fiveImage2");


let fiveTemp3 = $(".fiveTemp3");
let fiveDate3 = $(".fiveDate3");
let fiveHumid3 = $(".fiveHumid3");
let fiveImage3 = $(".fiveImage3");


let fiveTemp4 = $(".fiveTemp4");
let fiveDate4 = $(".fiveDate4");
let fiveHumid4 = $(".fiveHumid4");
let fiveImage4 = $(".fiveImage4");


let fiveTemp5 = $(".fiveTemp5");
let fiveDate5 = $(".fiveDate5");
let fiveHumid5 = $(".fiveHumid5");
let fiveImage5 = $(".fiveImage5");

let currentImage = $(".currentImage");

let cities = [];
let temp = $(".temp");
let humid = $(".humid");
let wind = $(".wind");
let uv = $(".uv");
let current = $("#current");
let day = moment().format("(l)");
console.log(day);
$("#today").html(day);

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
    let city = $("#city").val().trim().toUpperCase();
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
        $(temp).text(`Temperature: ` + (JSON.stringify(response.main.temp) + ` °F`));
        $(humid).text(`Humidity: ` + (JSON.stringify(response.main.humidity) + `%`));
        $(wind).text(`Wind Speed: ` + (JSON.stringify(response.wind.speed) + ` MPH`));

        let imageIcon = (response.weather[0].icon);
        let imageUrl = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png"
        $(currentImage).attr('src', imageUrl);

        let lat = response.coord.lat;
        let lon = response.coord.lon;

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=db7eebd821863071e9b6ab0753df6253&lat=" + lat + "&lon=" + lon,
            method: "GET"
        }).then(function (response) {
            $(uv).text(`UV Index: ` + (JSON.stringify(response.value)));
        });

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253",
            method: "GET"
        }).then(function (response) {
            $(fiveTemp1).text(`Temp: ` + (JSON.stringify(response.list[6].main.temp) + ` °F`));
            $(fiveHumid1).text(`Humidity: ` + (JSON.stringify(response.list[6].main.humidity) + `%`));
            $(fiveDate1).text(`Date: ` + (response.list[6].dt_txt.slice(5, 10)));

            let imageIcon = (response.list[6].weather[0].icon);
            var imageUrl = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png"
            $(fiveImage1).attr('src', imageUrl);
        });

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253",
            method: "GET"
        }).then(function (response) {
            $(fiveTemp2).text(`Temp: ` + (JSON.stringify(response.list[14].main.temp) + ` °F`));
            $(fiveHumid2).text(`Humidity: ` + (JSON.stringify(response.list[14].main.humidity) + `%`));
            $(fiveDate2).text(`Date: ` + (response.list[14].dt_txt.slice(5, 10)));

            let imageIcon = (response.list[14].weather[0].icon);
            var imageUrl = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png"
            $(fiveImage2).attr('src', imageUrl);
        });

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253",
            method: "GET"
        }).then(function (response) {
            $(fiveTemp3).text(`Temp: ` + (JSON.stringify(response.list[22].main.temp) + ` °F`));
            $(fiveHumid3).text(`Humidity: ` + (JSON.stringify(response.list[22].main.humidity) + `%`));
            $(fiveDate3).text(`Date: ` + (response.list[22].dt_txt.slice(5, 10)));

            let imageIcon = (response.list[22].weather[0].icon);
            var imageUrl = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png"
            $(fiveImage3).attr('src', imageUrl);
        });

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253",
            method: "GET"
        }).then(function (response) {
            $(fiveTemp4).text(`Temp: ` + (JSON.stringify(response.list[30].main.temp) + ` °F`));
            $(fiveHumid4).text(`Humidity: ` + (JSON.stringify(response.list[30].main.humidity) + `%`));
            $(fiveDate4).text(`Date: ` + (response.list[30].dt_txt.slice(5, 10)));

            let imageIcon = (response.list[30].weather[0].icon);
            var imageUrl = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png"
            $(fiveImage4).attr('src', imageUrl);
        });

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253",
            method: "GET"
        }).then(function (response) {
            $(fiveTemp5).text(`Temp: ` + (JSON.stringify(response.list[38].main.temp) + ` °F`));
            $(fiveHumid5).text(`Humidity: ` + (JSON.stringify(response.list[38].main.humidity) + `%`));
            $(fiveDate5).text(`Date: ` + (response.list[38].dt_txt.slice(5, 10)));

            let imageIcon = (response.list[38].weather[0].icon);
            var imageUrl = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png"
            $(fiveImage5).attr('src', imageUrl);
        });


    });




});

renderList();