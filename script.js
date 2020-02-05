let city = $("#city");
let citySearch = $("#citySearch");
let searchBtn = $("#searchBtn");
let searchedList = $("#searchedList");
let currentCity = $("#currentCity");
let fiveDay = $("#fiveDay");
let cities = [];

let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=db7eebd821863071e9b6ab0753df6253";

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    $(citySearch).text(JSON.stringify(response));
    console.log(response);
});

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
    renderList();
    //how can i clear the text box?
});


renderList();