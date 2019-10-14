"use strict";
let counts = [];
let closest = 0;
let gender = "";

function emptyCounts() {
  counts = [];
}

// if gender matches then push closest height to an array

function getClosestHeight(responseJson) {
  console.log(height);
  emptyCounts();
  for (let i = 0; i < 10; i++) {
    if (responseJson.results[i].gender === gender) {
      counts.push(responseJson.results[i].height);
      closest = counts.reduce(function(prev, curr) {
        return Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev;
      });
    }
  }
  console.log(counts);
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

// get api
function getPeople() {
  if (name > 100) {
    fetch("https://swapi.co/api/people/")
      .then(response => response.json())
      .then(responseJson => renderResults(responseJson));
  } else if (name > 105) {
    fetch("https://swapi.co/api/people/?page=2")
      .then(response => response.json())
      .then(responseJson => renderResults(responseJson));
  } else if (name > 110) {
    fetch("https://swapi.co/api/people/?page=3")
      .then(response => response.json())
      .then(responseJson => renderResults(responseJson));
  } else if (name > 115) {
    fetch("https://swapi.co/api/people/?page=4")
      .then(response => response.json())
      .then(responseJson => renderResults(responseJson));
  } else if (name > 120) {
    fetch("https://swapi.co/api/people/?page=5")
      .then(response => response.json())
      .then(responseJson => renderResults(responseJson));
  } else {
    fetch("https://swapi.co/api/people/?page=6")
      .then(response => response.json())
      .then(responseJson => renderResults(responseJson));
  }
}
function check() {
  console.log(responseJson.results);
}

//render results to the screen
function renderResults(responseJson) {
  $("main").empty();
  getClosestHeight(responseJson);
  for (let i = 0; i < responseJson.results.length; i++)
    if (closest === responseJson.results[i].height) {
      console.log(responseJson.results[i].name);
      $("main").append(
        `<div class="container">
        <h1> ${responseJson.results[i].name}:</h1>
        <p>height: ${responseJson.results[i].height} </p>
        <p>weight: ${responseJson.results[i].mass} </p>
        <p>${responseJson.results[i].skin_color} skin</p>
        <p>${responseJson.results[i].eye_color} eyes</p>
        <p>${responseJson.results[i].hair_color} hair</p>
        <a target="blank" href="http://www.starwars.com/search?q=${responseJson.results[i].name}">find out more about your character here</a>`
      );
    } else {
      if (parseInt(closest) < 96) {
        $("main").append(`<h1>You're a little person</h1>`);
      }
    }
}

// watch for summit
let feet = 0.0;
let inches = 0.0;
let height = 0;
let name = "";
function watchForm() {
  $("form").submit(event => {
    feet = $("#feetTall").val();
    inches = $("#inchesTall").val() / 10;
    height = Math.round(((feet / 1 + inches) * 12) / 0.394);
    name = $("#name")
      .val()
      .charCodeAt(0);
    console.log(name);
    console.log(height);
    genderCheck();
    event.preventDefault();
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
