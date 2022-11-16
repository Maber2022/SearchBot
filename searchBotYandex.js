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

(function () {
    "use strict";

    let links = document.links;
    let searchInput = document.getElementById("text");
    let searchButton = document.getElementsByClassName(
        "mini-suggest__button"
    )[0];
    let link;
    let keywords = ["продажа авто", "авто продажа", "продажа бу авто"];
    let keyword = keywords[random(0, keywords.length)];

    if (location.hostname === "ya.ru") {
        let i = 0;
        let stepByStepInput = setInterval(() => {
            searchInput.value += keyword[i];
            i++;
            if (i == keyword.length) {
                clearInterval(stepByStepInput);
                searchButton.click();
            }
        }, 100);
    }
    if (location.hostname === "yandex.ru") {
        setTimeout(() => {
            searchLinkOnPage();
            goForNexPage();
        }, 2000);
    }
    function searchLinkOnPage() {
        for (let i = 0; i < links.length; i++) {
            if (links[i].href.includes("asdadadsadasd")) {
                link = links[i].href;
                goToNextPage = false;
                setTimeout(() => {
                    console.log("link found");
                    location.href = link;
                });
                break;
            } else {
                continue;
            }
        }
    }
    function random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function goForNexPage() {
        console.log("goForNexPage working");
        let pageNum = localStorage.getItem("pageNum");
        if (!pageNum || pageNum < 2) {
            localStorage.setItem("pageNum", 2);
        } else if (pageNum < 3) {
            localStorage.setItem("pageNum", 3);
        }
        pageNum = localStorage.getItem("pageNum");
        console.log("pageNum", pageNum);
        let nextPage = document.querySelector(
            `[aria-label="Страница ${pageNum}"]`
        );
        if (pageNum < 3) {
            setTimeout(() => {
                nextPage.click();
            }, 5000);
        } else {
            localStorage.setItem("pageNum", 1);
            location.href = "ya.ru";
        }
    }

    // location.href = link;
})();
