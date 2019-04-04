(function ()
{

    /*Conectando con API Externa*/
    var API_WORLDTIME_KEY = "d6a4075ceb419113c64885d9086d5";
    var API_WORLDTIME = "https://api.worldweatheronline.com/free/v2/tz.ashx?format=json&key=" + API_WORLDTIME_KEY + "&q=";
    var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";
    var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
    var IMG_WEATHER = "http://openweathermap.org/img/w/";
    var today = new Date();
    var timeNow = today.toLocaleTimeString();  // la ora en formato 12:55:45 PM
    var nombreNuevaCiudad = $("[data-input='cityAdd']");
    var cities = [];


    /*geolocalizamos nuestra posicion Inyectando Datos en nuestro template*/
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(getCoords, errorFound);
    } else
    {
        alert("Por favor, actualiza tu navegador");
    }

    function errorFound(error)
    {
        alert("Un error ocurrió: " + error.code);
    }

    function getCoords(position)
    {
        $.getJSON(API_WEATHER_URL + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, getCurrentWeather);
    }

    function getCurrentWeather(data)
    {
        var cityWeather = {
            zone: data.name,
            country: data.sys.country,
            temp: data.main.temp - 273.15,
            temp_max: data.main.temp_max - 273.15,
            temp_min: data.main.temp_min - 273.15,
            icon: IMG_WEATHER + data.weather[0].icon + ".png"
        }
        renderTemplate(cityWeather);
    }


    /*Añadiendo más ciudades a nuestra app con el evento click y keypress*/
    $("[data-button='add']").on("click", addNewCity);
    nombreNuevaCiudad.on("keypress", function (event)
    {
        if (event.which == 13)
        {   // escucha el teclado enter
            addNewCity(event);
        }
    });
    function addNewCity(event)
    {
        event.preventDefault();

        $.getJSON(API_WEATHER_URL + "q=" + nombreNuevaCiudad.val(), getWeatherNewCity);
    }


    function getWeatherNewCity(data)
    {   //carga una nueva ciudad
        $.getJSON(API_WORLDTIME + nombreNuevaCiudad.val(), function (response)
        {
            nombreNuevaCiudad.val("");  //clean del value
            var cityWeather = {
                zone: data.name,
                country: data.sys.country,
                icon: IMG_WEATHER + data.weather[0].icon + ".png",
                temp: data.main.temp - 273.15,
                temp_min: data.main.temp_min - 273.15,
                temp_max: data.main.temp_max - 273.15
            };
            renderTemplate(cityWeather, response.data.time_zone[0].localtime);
            cities.push(cityWeather);
            localStorage.setItem("cities", JSON.stringify(cities));  //guardamos en localStorage el array
        });
    }


    /*Recuperando datos en LocalStorage*/
    $("[data-saved-cities]").on("click", loadSavedCities);
    function loadSavedCities(e)
    {
        e.preventDefault();

        function renderCities(cities)
        {
            cities.forEach(function (city)
            {
                var cityLoad = city;
                renderTemplate(cityLoad);
            });
        };

        function removeItems()
        {
            var citiesToDelete = $(".card");
            if (citiesToDelete.length > 1)
            {
                for (var i = 1; i < citiesToDelete.length; i++)
                {
                    citiesToDelete[i].remove();
                }
            }
        };

        removeItems();
        var cities = JSON.parse(localStorage.getItem('cities'));
        renderCities(cities);

        // Detecta eventos de click en cada ciudad
        $(".card").on("click", function (e)
        {
            var i = $(".card").index(this);
            var result = window.confirm("¿Deseas eliminar la ciudad salvada?");

            // Elimina la ciudad de localStorage
            if (result)
            {
                var cards = $(".card");
                cards[i].remove();
            }
            cities.splice(i, 1);
            console.log(cities);
            localStorage.setItem('cities', JSON.stringify(cities));
        });
    }


    /*Inyectando Datos en nuestro template */
    function activateTemplate(id)
    {   //activa template
        var t = document.querySelector(id);
        return document.importNode(t.content, true);
    }

    function renderTemplate(cityWeather, localtime)
    {   //renderiza template
        var clone = activateTemplate("#template--city");
        var timeToShow;
        if (localtime)
        {
            timeToShow = localtime.split(" ")[1]; //split convierte en array cada elemento x espacio, devuelve elemento [1]
        } else
        {
            timeToShow = timeNow;
        }    //stampa tu ora
        clone.querySelector("[data-time]").innerHTML = timeToShow;
        clone.querySelector("[data-city]").innerHTML = cityWeather.zone;
        clone.querySelector("[data-country]").innerHTML = cityWeather.country;
        clone.querySelector("[data-icon]").src = cityWeather.icon;
        clone.querySelector("[data-temp='max']").innerHTML = cityWeather.temp_max.toFixed(1);
        clone.querySelector("[data-temp='min']").innerHTML = cityWeather.temp_min.toFixed(1);
        clone.querySelector("[data-temp='current']").innerHTML = cityWeather.temp.toFixed(1);
        $(".loader").hide();
        $("body").append(clone);
        dibujarMapa();
    }

})();


/*geolocalizacion con google map*/
function dibujarMapa()
{
    var marcador_tiempo_real, mapa;
    var opcionesMapa = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    mapa = new google.maps.Map(document.getElementById('google_canvas'), opcionesMapa);

    //getCurrentPosition riceve 2 @param
    navigator.geolocation.getCurrentPosition(function (posicion)
    {
        var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);

        marcador_tiempo_real = new google.maps.Marker({
            map: mapa,
            position: geolocalizacion,
            visible: true
        });

        mapa.setCenter(geolocalizacion);//centramos la mapa
        //watchPosition escucha la nueva posicion riceve 3 param

    }, function (error)
    {
        console.log(error);
    });

}








