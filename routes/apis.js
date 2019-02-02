"use strict";

const express = require('express');
const apiRoutes  = express.Router();
const yelpKey = "MC0O35OqLGjWFTBQMqtQX4xLFkHy_qkZhulf-KhNSw3uTHQMhbXEEdPuvDX67hnmhBR_WBR_yg0FkK8PWp-gMKdyXNAw0g7mdjf_HmzonkVOO7lMU-8aJRsBBR5VXHYx";
const yelp = require('yelp-fusion');
const imdbKey = "9b923ecc";
var imdb = require('omdb-client');

const VAN = 'vancouver, bc';
const yelpClient = yelp.client(yelpKey);

function searchYelp(searchString) {
  yelpClient.search({
    term:`${searchString}`,
    location: VAN
    })
    .then(response => {
      console.log(response.jsonBody.businesses.length);
      response.jsonBody.businesses.forEach( (element) => {

        let currentName = element.name.toLowerCase();
        if (currentName.includes(`${searchString.toLowerCase()}`)) {
         console.log(element.name + " matches!");
        } else {
          console.log(element.name + " doesn't match");
        }

      });
    })
    .catch(e => {
    console.log(e);
  });
}

module.exports = () => {

  apiRoutes.get('/:search', (request, response) => {
    let searchTerm = request.params.search;
    searchTerm = searchTerm.replace("to-do=", "");
    console.log(searchTerm);
    response.send(200);
    // searchYelp(searchTerm);
    // searchWikip(searchTerm);
  });

  return apiRoutes;
}

