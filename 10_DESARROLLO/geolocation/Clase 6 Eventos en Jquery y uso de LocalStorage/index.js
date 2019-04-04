window.addEventListener('load', init, false);

var API_WORLDTIME_KEY = "d6a4075ceb419113c64885d9086d5";
var API_WORLDTIME = "https://api.worldweatheronline.com/free/v2/tz.ashx?format=json&key=" + API_WORLDTIME_KEY + "&q=";
var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
var IMG_WEATHER = "http://openweathermap.org/img/w/";

var today = new Date();
var timeNow = today.toLocaleTimeString();

var $body = $("body");
var $loader = $(".loader");
var nombreNuevaCiudad = $("[data-input='cityAdd']");
var buttonAdd = $("[data-button='add']");
var buttonLoad = $("[data-saved-cities]");

var cities = [];
var cityWeather = {};
cityWeather.zone;
cityWeather.icon;
cityWeather.temp;
cityWeather.temp_max;
cityWeather.temp_min;
cityWeather.main;

buttonAdd.on("click", addNewCity);

nombreNuevaCiudad.on("keypress", function (event) {
    if (event.which == 13) {
        addNewCity(event);
    }
});

/*
 * seleccionamos el boton escuche evento click le pasamos una funcion callback addNewCity * */
buttonLoad.on("click", loadSavedCities);

/* nos ubica con la geolocalizacion de HTML5
 * controlla si el objeto geolocation existe en tu navegador
 * @param getCoords Peticion al API pasandole la URL y nuestra cordenadas
 * @param errorFound */
if (navigator.geolocation) {
    debugger;
    navigator.geolocation.getCurrentPosition(getCoords, errorFound);
} else {
    alert("Por favor, actualiza tu navegador");
}

function errorFound(error) {
    alert("Un error ocurrió: " + error.code);
    // 0: Error desconocido
    // 1: Permiso denegado
    // 2: Posición no está disponible
    // 3: Timeout
};

/*
 * conexion al API:
 * obtenemos nuestras cordenadas y se le pasamos al api
 * getJSON le pasamos una funcion callback getCurrentWeather que tendra la respuesta del API
 * @param position recore las cordenadas
 * */
function getCoords(position) {
    debugger;
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log("Tu posición es: " + lat + "," + lon);
    $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon, getCurrentWeather);
};

/* devuelve el tiempo corriente obtenida dela respuesta getJSON
 * data contendra el objeto devuelto x getJSON
 * @param data recore el objeto
 * */
function getCurrentWeather(data) {
    cityWeather.zone = data.name;
    cityWeather.icon = IMG_WEATHER + data.weather[0].icon + ".png";
    cityWeather.temp = data.main.temp - 273.15;
    cityWeather.temp_max = data.main.temp_max - 273.15;
    cityWeather.temp_min = data.main.temp_min - 273.15;
    cityWeather.main = data.weather[0].main;

    renderTemplate(cityWeather);
};

function activateTemplate(id) {
    var t = document.querySelector(id);
    return document.importNode(t.content, true);
};

function renderTemplate(cityWeather, localtime) {
    var clone = activateTemplate("#template--city");

    var timeToShow;
    if (localtime) {
        timeToShow = localtime.split(" ")[1];
    } else {
        timeToShow = timeNow;
    }

    clone.querySelector("[data-time]").innerHTML = timeToShow;
    clone.querySelector("[data-city]").innerHTML = cityWeather.zone;
    clone.querySelector("[data-icon]").src = cityWeather.icon;
    clone.querySelector("[data-temp='max']").innerHTML = cityWeather.temp_max.toFixed(1);
    clone.querySelector("[data-temp='min']").innerHTML = cityWeather.temp_min.toFixed(1);
    clone.querySelector("[data-temp='current']").innerHTML = cityWeather.temp.toFixed(1);

    $loader.hide();
    $body.append(clone);
}

/*
 * conexion peticion al API:
 * recogemos el valor que hemos escrito en el input se lo pasamos al API
 * hacemos callback para recibir los datos en la funcion get_tiempoNewCity()
 * @param event le quita la funcionalidad al boton tipo submit
 * */
function addNewCity(event) {
    event.preventDefault();
    $.getJSON(API_WEATHER_URL + "q=" + nombreNuevaCiudad.val(), getWeatherCity);
}

/*
 * devuelve el tiempo de la nueva ciudad
 * data contendra el objeto devuelto x getJSON
 * @param data recore el objeto
 * */
function getWeatherCity(data) {

    $.getJSON(API_WORLDTIME + nombreNuevaCiudad.val(), function (response) {

        nombreNuevaCiudad.val("");

        cityWeather = {};
        cityWeather.zone = data.name;
        cityWeather.icon = IMG_WEATHER + data.weather[0].icon + ".png";
        cityWeather.temp = data.main.temp - 273.15;
        cityWeather.temp_min = data.main.temp_min - 273.15;
        cityWeather.temp_max = data.main.temp_max - 273.15;

        renderTemplate(cityWeather, response.data.time_zone[0].localtime);

        cities.push(cityWeather);
        localStorage.setItem("cities", JSON.stringify(cities));
    });

}

function loadSavedCities(event) {
    event.preventDefault();

    var cities = JSON.parse(localStorage.getItem("cities"));
    cities.forEach(function (city) {
        renderTemplate(city);
    });
}


/**/


function dibujarMapa() {
    var opcionesMapa = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    mapa = new google.maps.Map(document.getElementById('google_canvas'), opcionesMapa);

    //getCurrentPosition riceve 2 param
    navigator.geolocation.getCurrentPosition(function (posicion) {
        var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
        var geolocalizacion2 = new google.maps.LatLng(45.0735876, 7.6719156);
        var geolocalizacion3 = new google.maps.LatLng(45.0357465, 7.6473673);

        var marcador = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion,
            visible: true
        });

        var marcador2 = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion2,
            visible: true
        });

        var marcador3 = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion3,
            visible: true
        });

        marcador_tiempo_real = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion,
            visible: true
        });

        mapa.setCenter(geolocalizacion);//centramos la mapa
        //watchPosition escucha la nueva posicion riceve 3 param
        navigator.geolocation.watchPosition(actualizarPosicion, function (error) {
            console.log(error);
        }, {maximumAge: 0});
    }, function (error) {
        console.log(error);
    });
}

