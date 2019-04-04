/**
 * Created by jorge on 04/02/16.
 */
/*
 Social che arriva di un API (facebook twitter instagram)
 se identifica quale sono i social  e se filtra
 si crea un array se  riempi solo dei primi social se esistono
 se stampa nel html y social che sono nel array
 * */


var arSocial = ['Facebook', 'Twitter', 'Instagram'];// array con parametri da filtrare
var socialArr = [];//array da riempire con i primi social

window.addEventListener('load', init);

function init()
{

    $.getJSON("jsonSocialAlfa.json", function (data)
    {


        if (data)
        { //filtro  ogni social
            var objFace = data.filter(function (el)
            {
                return el.Channel == arSocial[0];
            });
            var objTiw = data.filter(function (el)
            {
                return el.Channel == arSocial[1];
            });
            var objInsta = data.filter(function (el)
            {
                return el.Channel == arSocial[2];
            });
        }


        /*ciclo e controllo se la lunghezza dell  array e asegno ogni social se essiste*/
        for (var i = 0; socialArr.length < 3; i++)
        {
            if (objFace[i])
                socialArr.push(objFace[i]);

            if (objTiw[i])
                socialArr.push(objTiw[i]);

            if (objInsta[i])
                socialArr.push(objInsta[i]);

        }

        // console.log(socialArr);

        var obj_social = new Social_obj();
        obj_social.stampa(socialArr);


    });
}


function Social_obj()
{
}

Social_obj.prototype.stampa = function (param)
{

    for (var i = 0; i < param.length; i++)
    {
        //la condizione e legata al primo elemento dell array
        if (param[i] === param[0])
        {
            var face = param[i];
            $('article.grid__item--facebook a').attr("href", face.Link);
            $('article.grid__item--facebook a .grid__image img').attr("src", face.Image);
            $('article.grid__item--facebook a div.social__title em').html(face.Title);
            $('article.grid__item--facebook a div.grid__text').html(face.Description);
            $('article.grid__item--facebook a .grid__image').attr("style", "background-image: url(" + face.Image + ")");
            $('article.grid__item--facebook a .grid__image').removeClass("b-error").addClass("b-loaded");
            if (face.Channel == "Facebook")
            {
                $('article.grid__item--facebook a div.social__title img').attr("src", "../assets/images/big_iconfacebook.png");
            }
            if (face.Channel == "Twitter")
            {
                $('article.grid__item--facebook a div.social__title img').attr("src", "../assets/images/big_icontwitter.png");
            }
            if (face.Channel == "Instagram")
            {
                $('article.grid__item--facebook a div.social__title img').attr("src", "../assets/images/big_iconinstagram.png");
            }

        }

        if (param[i] === param[1])
        {
            var twit = param[i];
            $('article.grid__item--twitter a').attr("href", twit.Link);
            $('article.grid__item--twitter a .grid__image img').attr("src", twit.Image);
            $('article.grid__item--twitter a div.social__title em').html(twit.Title);
            $('article.grid__item--twitter div.grid__text').html(twit.Description);
            $('article.grid__item--twitter a .grid__image').attr("style", "background-image: url(" + twit.Image + ")");
            $('article.grid__item--twitter a .grid__image').removeClass("b-error").addClass("b-loaded");
            if (twit.Channel == "Facebook")
            {
                $('article.grid__item--twitter a div.social__title img').attr("src", "../assets/images/big_iconfacebook.png");
            }
            if (twit.Channel == "Twitter")
            {
                $('article.grid__item--twitter a div.social__title img').attr("src", "../assets/images/big_icontwitter.png");
            }
            if (twit.Channel == "Instagram")
            {
                $('article.grid__item--twitter a div.social__title img').attr("src", "../assets/images/big_iconinstagram.png");
            }
        }

        if (param[i] === param[2])
        {
            var insta = param[i];
            $('article.grid__item--instagram a').attr("href", insta.Link);
            $('article.grid__item--instagram a .grid__image img').attr("src", insta.Image);
            $('article.grid__item--instagram a div.social__title em').html(insta.Title);
            $('article.grid__item--instagram a .grid__image').attr("style", "background-image: url(" + insta.Image + ")");
            $('article.grid__item--instagram a .grid__image').removeClass("b-error").addClass("b-loaded");
            if (insta.Channel == "Facebook")
            {
                $('article.grid__item--instagram a div.social__title img').attr("src", "../assets/images/big_iconfacebook.png");
            }
            if (insta.Channel == "Twitter")
            {
                $('article.grid__item--instagram a div.social__title img').attr("src", "../assets/images/big_icontwitter.png");
            }
            if (insta.Channel == "Instagram")
            {
                $('article.grid__item--instagram a div.social__title img').attr("src", "../assets/images/big_iconinstagram.png");
            }
        }
    }
}
