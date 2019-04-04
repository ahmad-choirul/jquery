//funcion autoejecutable se suele llamar clousure
//cuando el archivo se ha cargado se va autoejecutar

(function ()
{

    var API_WORLDTIME_KEY = "f22cf8821056d003ec99548c6415d";
    var API_WORLDTIME = "https://api.worldweatheronline.com/free/v2/tz.ashx?format=json&key=" + API_WORLDTIME_KEY + "&q=";
    var API_WEATHER_KEY = "4622b50d93b51e6ab1a2889f534e766b";
    //los parametros por URL con ? y se separan con &
    var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
    var IMG_WEATHER = "http://openweathermap.org/img/w/";//url de la imagen

    var today = new Date();
    var timeNow = today.toLocaleTimeString();

    var $body = $("body");
    var $loader = $(".loader");
    var nombreNuevaciudad = $("[data-input='cityAdd']");
    var buttonAdd = $("[data-button='add']");
    var buttonload = $("[data-saved-cities]");

    var cities = [];
    /*objeto que tendra los varios atributos*/
    var cityWeather = {};
    cityWeather.zone;
    cityWeather.icon;
    cityWeather.temp;
    cityWeather.temp_max;
    cityWeather.temp_min;
    cityWeather.main;


    /*
     * controllamos si el objeto geolocation existe en tu navegador
     * @param getCoords Peticion al API pasandole la URL y nuestra cordenadas
     * @param errorFound  mostramos mensaje de error*/
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(getCoords, errorFound);
    else
        alert("por favor, actualiza tu navegador que no soporta la geolocalizacion")

    function errorFound()
    {
        alert("un error ocurrio; " + error.code);
        //0:error descocnocido 1:permiso denegado 2:posicion no esta disponible 3:Timeout
    }

    /*
     * conexion al API:
     * obtenemos nuestras cordenadas y se le pasamos al api
     * @param position recore las cordenadas
     * */
    function getCoords(position)
    {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        console.log("Tu posición es: " + lat + "," + lon);
        //$.getJSON (pasamos la url, getCurrentWeather funcion que procesa los datos recibidos de
        $.getJSON(API_WEATHER_URL + "lat=" + lat + "&lon=" + lon, getCurrentWeather);
    };


    /* devuelve el tiempo corriente obtenida dela respuesta getJSON
     * @param data recore el objeto devuelto x getJSON
     * */
    function getCurrentWeather(data)
    {
        console.log(data);
        cityWeather.zone = data.name;
        cityWeather.icon = IMG_WEATHER + data.weather[0].icon + ".png";
        cityWeather.temp = data.main.temp - 273.15;
        cityWeather.temp_max = data.main.temp_max - 273.15;
        cityWeather.temp_min = data.main.temp_min - 273.15;
        cityWeather.main = data.weather[0].main;
        renderTemplate(cityWeather);
    };


    /*
     * seleccionamos el boton escuche evento click le pasamos una funcion callback addNewCity * */
    $(buttonAdd).on("click", addNewCity);
    $(nombreNuevaciudad).on("keypress", function (event)
    {
        if (event.which == 13)
            addNewCity(event);

    });


    $(buttonload).on("click", loadsavecities);
    function loadsavecities()
    {
        event.preventDefault();

        function renderCities(cities)
        {
            cities.forEach(function (city)
            {
                renderTemplate(city);
            });
        };
        var cities = JSON.parse(localStorage.getItem("cities"));
        renderCities(cities);
    }

    /*
     * conexion peticion al API:
     * recogemos el valor que hemos escrito en el input se lo pasamos al API
     * hacemos callback para recibir los datos en la funcion get_tiempoNewCity()
     * @param event le quita la funcionalidad al boton tipo submit
     * */
    function addNewCity(event)
    {
        event.preventDefault();
        $.getJSON(API_WEATHER_URL + "q=" + $(nombreNuevaciudad).val(), get_tiempoNewCity);
    }

    /*
     * devuelve el tiempo de la nueva ciudad
     * data contendra el objeto devuelto x getJSON
     * @param data recore el objeto
     * */
    function get_tiempoNewCity(data)
    {
        $.getJSON(API_WORLDTIME + $(nombreNuevaciudad).val(), function (response)
        {

            $(nombreNuevaciudad).val("");

            cityWeather = {};
            cityWeather.zone = data.name;//nos da la ciudad
            cityWeather.icon = IMG_WEATHER + data.weather[0].icon + ".png";//nos devuelve el icono
            cityWeather.temp = data.main.temp - 273.15;
            cityWeather.temp_max = data.main.temp_max - 273.15;
            cityWeather.temp_min = data.main.temp_min - 273.15;
            cityWeather.main = data.weather[0].main;//

            renderTemplate(cityWeather, response.data.time_zone[0].localtime);
            //guardamos la cuidad en el array
            cities.push(cityWeather)
            localStorage.setItem("cities", JSON.stringify(cities));
        });
    }

    /*
     * activa el template para que sea reutilizable le pasamos un parametro
     * document.querySelector(id) seleccionamos
     * document.importNode(obj_template.content, true);  creamos el nodo dentro del query selector
     * @param id para que sea reutilizable
     */
    function activateTemplate(id)
    {
        var obj_template = document.querySelector(id);
        return document.importNode(obj_template.content, true);
    }


    /* le pasamos a clone el template que queremos activar
     * seleccionamos  cada elemento y lo estampamos dentro del template
     * @param cityWeather objeto que contiene el valor de los tributos
     * */
    function renderTemplate(cityWeather, localtime)
    {
        //#template--city nombre del template en html y sus hijos jquery seleciona con el atributo data
        var clone = activateTemplate("#template--city");
        var timeToShow;
        if (localtime)
        {
            timeToShow = localtime.split(" ")[1];
        } else
        {
            timeToShow = timeNow;
        }
        clone.querySelector("[data-time]").innerHTML = timeToShow;
        clone.querySelector("[data-city]").innerHTML = cityWeather.zone;//la ciudad
        clone.querySelector("[data-icon]").src = cityWeather.icon;// le pasamos al src la ruta de la imagen
        clone.querySelector("[data-temp='max']").innerHTML = cityWeather.temp_max.toFixed(1);//toFixed reducimos el numero de decimales
        clone.querySelector("[data-temp='min']").innerHTML = cityWeather.temp_min.toFixed(1);
        clone.querySelector("[data-temp='current']").innerHTML = cityWeather.temp.toFixed(1);

        $($loader).hide();//esconde el loader
        $($body).append(clone);//le pegamos al final de la pagina el objeto clone
    }

})();






