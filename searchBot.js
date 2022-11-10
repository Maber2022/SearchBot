// ==UserScript==
// @name         SearchBot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Let's go to auto.ru
// @author       Marina Panova
// @match        https://ya.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let links = document.links;
    let searchInput = document.getElementById("text");
    let searchButton = document.getElementsByClassName("mini-suggest__button")[0];
    let link;
    let keywords = ["продажа авто","авто продажа","продажа бу авто"];

    function random(min,max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    if(location.hostname ==="ya.ru"){
        searchInput.value= keywords[random(0,keywords.length)];
        searchButton.click();
    }
    if(location.hostname ==="yandex.ru") {

        for(let i =0;i<links.length;i++){
            if(links[i].href.includes("auto.ru")){
                link=links[i].href;
                break;
            }}
    }
    location.href=link;



})();