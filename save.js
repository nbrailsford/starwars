"use strict";
let counts = [];
let closest = 0;
let gender = "";

function emptyCounts() {
  counts = [];
}

// if gender matches then push closest height to an array

function getClosestHeight(responseJson) {
  console.log(responseJson.results);
  console.log(gender);
  emptyCounts();
  for (let i = 0; i < 9; i++) {
    if (responseJson.results[i].gender === gender) {
      counts.push(responseJson.results[i].height);
      closest = counts.reduce(function(prev, curr) {
        return Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev;
      });
    }
  }
  console.log(counts);
  console.log(closest);
}

// assign gender
function genderCheck() {
  if (document.getElementById("male").checked === true) {
    gender = "male";
  } else if (document.getElementById("female").checked === true) {
    gender = "female";
  } else if (document.getElementById("other").checked === true) {
    gender = "n/a";
  }
}
const url = "https://swapi.co/api/people/?page=";

let num = "";
console.log(url + num);
function getNum() {
  if (nameVal < 100) {
    num = "1";
  } else if (nameVal <= 105) {
    num = "2";
  } else if (nameVal <= 110) {
    num = "3";
  } else if (nameVal <= 115) {
    num = "4";
  } else if (nameVal <= 115) {
    num = "5";
  } else if (nameVal <= 120) {
    num = "6";
  } else {
    num = "7";
  }
}
// get api
function getPeople() {
  fetch(url + num)
    .then(response => response.json())
    .then(responseJson => renderResults(responseJson));
}
function check() {
  console.log(responseJson.results);
}

//render results to the screen
function renderResults(responseJson) {
  $("#mainScreen").hide();

  getClosestHeight(responseJson);
  for (let i = 0; i < responseJson.results.length; i++)
    if (closest === responseJson.results[i].height) {
      $("main").append(
        `<div class="container">
          <div class="contrast">
            <section class="star-wars">
              <div class="crawl">
                <h1 class="title"> ${responseJson.results[i].name}:</h1>
                <p>height: ${responseJson.results[i].height} cm </p>
                <p>weight: ${responseJson.results[i].mass} kilos</p>
                <p>${responseJson.results[i].skin_color} skin</p>
                <p>${responseJson.results[i].eye_color} eyes</p>
                <p>${responseJson.results[i].hair_color} hair</p>
                </div>
              </div>
            </section> 
           </div>      
        </div>
        <a id="info" target="blank" href="http://www.starwars.com/search?q=${responseJson.results[i].name}">More Info</a>
        <button id="re-start"onClick="document.location.reload(false)">Start Over</button>`
      );
      console.log(
        `//www.starwars.com/search?q=${responseJson.results[i].name}`
      );
      break;
    } else {
      if (parseInt(closest) < 96) {
        $("main").append(
          `<h1>No Matches! try another name</h1><button id="re-start"onClick="document.location.reload(true)">refresh</button>`
        );
        break;
      }
    }
  $("#info").hide();
  setTimeout(buttonTimer, 20000);
}

let feet = 0.0;
let inches = 0.0;
let height = 0;
let name = "";
let nameVal = 0;
// watch for summit
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    $("main").empty();
    $("main").height("100vh");
    genderCheck();
    changeBackground();
    feet = $("#feetTall").val();
    inches = $("#inchesTall").val() / 10;
    height = Math.round(((feet / 1 + inches) * 12) / 0.394);
    name = $("#names")
      .val()
      .toLowerCase();
    nameVal = name.charCodeAt(0);
    getNum();
    getPeople();
  });
}

// hide start screen and show main screen
function start() {
  $("#start").click(event => {
    $("#mainScreen").show();
    $("#startScreen").hide();
  });
  watchForm();
}

$(function() {
  $("#mainScreen").hide();
  console.log("App loaded! Waiting for submit!");
  start();
});

function changeBackground() {
  if (gender === "male") {
    $("body").css("background-image", "url(images/starwars.jpg)");
    $("body").css("color", "whitesmoke");
  } else if (gender === "female") {
    $("body").css("background-image", "url(images/starwars2.jpg)");
    $(".star-wars").css("color", "black");
  } else {
    $("body").css("background-image", "url(images/stars.jpg)");
    $("body").css("color", "whitesmoke");
  }
}

let na = "Abba";
console.log(na.charCodeAt(0));

function buttonTimer() {
  $("#info").show();
}
