/**
 * Created by jorge on 04/02/16.
 */
/*
 Nome dei Social che  arriva nell Channel (facebook, twitter, instagram, etc)
 se filtra in un array se  riempi solo dei primi social se esistono
 se stampa nel html y social che sono nel array
 * */

window.addEventListener('load',main,false);

function main()
{
    $.getJSON("jsonSocialAlfa.json", function (data)
    {
        var filtername = FilterNameToJson(data);
        var arrObj = createArrayObject(filtername, data)
        return printArray(arrObj);
    });
}


function FilterNameToJson(data)
{

    var nameSocial = [];
    $.each(data, function (index, value)
    {
        if ($.inArray(value.Channel, nameSocial) === -1)
            nameSocial.push(value.Channel);
    });

    console.log(nameSocial);
    return nameSocial;
}


function createArrayObject(filtername, data)
{
    var arrObj = [];
    $.each(filtername, function (index, value)
    {
        var datos = data.find(function (el)
        {
            return el.Channel == value;
        });
        arrObj.push(datos);
    });

    console.log(arrObj);
    return arrObj;

}



function printArray(arrObj)
{
    var imgSocial = ['../assets/images/big_iconfacebook.png', '../assets/images/big_icontwitter.png', '../assets/images/big_iconinstagram.png'];
    var clase = ['.grid__item--facebook', '.grid__item--twitter', '.grid__item--instagram'];

    for (var i = 0; i < arrObj.length; i++)
    {
        $(clase[i] + ' a').attr("href", arrObj[i].Link);
        $(clase[i] + ' a .grid__image img').attr("src", arrObj[i].Image);
        $(clase[i] + ' a div.social__title em').html(arrObj[i].Title);
        $(clase[i] + ' a div.grid__text').html(arrObj[i].Description);
        $(clase[i] + ' a .grid__image').attr("style", "background-image: url(" + arrObj[i].Image + ")");
        $(clase[i] + ' a .grid__image').removeClass("b-error").addClass("b-loaded");
        $(clase[i] + ' a div.social__title img').attr("src", imgSocial[i]);
    }
}







