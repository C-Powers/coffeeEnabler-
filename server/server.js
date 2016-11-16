const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const morgan = require('morgan');

const requestYelp = require('../fetchTest.js');
const fetch = require('isomorphic-fetch');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

const defaultParameters = {
  location: 'San+Diego',
  sort: '2'
}

let yelpData =[]

fetch(requestYelp(defaultParameters))
  .then(response => response.json())
  .then(data => console.log('NEW FETCH DATA: -----', data.region))
  .catch(e => console.log('error: ', e))

app.listen(3000);
console.log('http://localhost:3000/');
