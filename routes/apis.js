"use strict";

const express = require('express');
const apiRoutes  = express.Router();
const yelpKey = "MC0O35OqLGjWFTBQMqtQX4xLFkHy_qkZhulf-KhNSw3uTHQMhbXEEdPuvDX67hnmhBR_WBR_yg0FkK8PWp-gMKdyXNAw0g7mdjf_HmzonkVOO7lMU-8aJRsBBR5VXHYx";
const yelp = require('yelp-fusion');

const VAN = 'vancouver, bc';
const yelpClient = yelp.client(yelpKey);

function searchYelp(searchString) {
  return new Promise((resolve, reject) => {
    yelpClient.search({
      term:`${searchString}`,
      location: VAN
      })
      .then(response => {
        let matches = 0;
        response.jsonBody.businesses.forEach( (element) => {
          let currentName = element.name.toLowerCase();
          if (currentName.includes(`${searchString.toLowerCase()}`)) {
            matches++;
          }
        });
        let result = false;
        if (matches >=1 && matches <=2) {
          result = true;
        }
        resolve(result);
      })
      .catch(e => {
        reject(e);
    });
  });
}

const wiki = require('node-wikipedia');

function searchWikip (searchString) {
  return new Promise((resolve, reject) => {
    wiki.page.data(searchString, { content: true }, (res) => {
      if (!res) {
        return reject('No response from Wikipedia API.');
      }
      const wikiInfobox = res.text['*'] // for movies, books
        .replace('<table', 'STRINGSPLITTER')
        .replace('</tbody></table>', 'STRINGSPLITTER')
        .split('STRINGSPLITTER')[1].toLowerCase();

      const wikiFirstPara = res.text['*'] // for food (and other)
        .replace('<p>', 'STRINGSPLITTER \n\n\n')
        .replace('</p><p>', 'STRINGSPLITTER \n\n\n')
        .split('STRINGSPLITTER')[1].toLowerCase();

      const wikiWholeBody = res.text['*'];

      let category;
      if (bookChecker(wikiInfobox)) {
        category = 1;
      }
      if (movieChecker(wikiInfobox)) {
        category = 2;
      }
      if (buyChecker(wikiFirstPara) && !personChecker(wikiInfobox)) {
        category = 3;
      }
      if (buyChecker(wikiWholeBody) && !personChecker(wikiInfobox)) {
        category = 3;
      }
      resolve(category);
    });
  });
}

// HELPERS
function bookChecker (wikiString) {
  return wikiString.toLowerCase().includes('publisher');
}
function movieChecker (wikiString) {
  return wikiString.toLowerCase().includes('starring');
}
function buyChecker (wikiString) {
  const termsArr = ['edible', 'furniture', 'garment', 'patent'];
  for (const term of termsArr) {
    if (wikiString.toLowerCase().includes(term)) {
      return true;
    }
  }
  return false;
}
function personChecker (wikiString) {
  return wikiString.toLowerCase().includes('born');
}

module.exports = () => {

    apiRoutes.get('/:search', (request, response) => {
      let searchTerm = request.params.search;
      searchTerm = searchTerm.replace("to-do=", "");
      console.log(searchTerm);

      searchYelp(searchTerm).then((data) => {
        if (data === true) {
          return console.log('this is a restaurant');
          // return response.json(data);
        }
        searchWikip(searchTerm).then((data) => {
          return console.log(`this is a category ${data}`);
          // return response.json(data.toJSON());
        }).catch((data) => console.log(data));
      }).catch((data) => console.log(data));
    });

  return apiRoutes;
}

