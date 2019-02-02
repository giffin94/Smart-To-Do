"use strict";

const express = require('express');
const apiRoutes  = express.Router();
const yelpKey = "MC0O35OqLGjWFTBQMqtQX4xLFkHy_qkZhulf-KhNSw3uTHQMhbXEEdPuvDX67hnmhBR_WBR_yg0FkK8PWp-gMKdyXNAw0g7mdjf_HmzonkVOO7lMU-8aJRsBBR5VXHYx";
const yelp = require('yelp-fusion');

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

const wiki = require('node-wikipedia');
const wikiQuery = 'banana';

function searchWikip (searchString) {
  wiki.page.data(query, { content: true }, (res) => {
      const wikiInfobox = res.text['*'] // for movies, books
        .replace('<table class=', 'STRINGSPLITTER')
        .replace('</tbody></table>', 'STRINGSPLITTER')
        .split('STRINGSPLITTER')[1].toLowerCase();

      const wikiFirstPara = res.text['*'] // for food (and other)
        .replace('<p>', 'STRINGSPLITTER \n\n\n')
        .replace('</p><p>', 'STRINGSPLITTER \n\n\n')
        .split('STRINGSPLITTER')[1].toLowerCase();

      console.log('TO READ', wikiInfobox.includes('publisher'));
      console.log('TO WATCH', wikiInfobox.includes('starring'));
      console.log('TO EAT', wikiFirstPara.includes('food') || wikiFirstPara.includes('edible'));
      // console.log(wikiInfobox);
      console.log(wikiFirstPara);
  });
}

module.exports = () => {

  apiRoutes.get('/:search', (request, response) => {
    let searchTerm = request.params.search;
    searchTerm = searchTerm.replace("to-do=", "");
    console.log(searchTerm);
    // searchYelp(searchTerm);
    response.send(200);
    // searchWikip(searchTerm);
  });

  return apiRoutes;
}

