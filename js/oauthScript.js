//  https://arian.io/how-to-use-yelps-api-with-node/
const oauthSignature = require('oauth-signature')
let n = require('nonce')()
const qs = require('querystring')
let _ = require('lodash')
const yelpKeys = require('../secrets')

let requestYelp = function (setParameters) {
  const httpMethod = 'GET'
  const url = 'http://api.yelp.com/v2/search'

/*
  const defaultParameters = {
    location: 'San+Diego',
    sort: '2'
  }
*/
  const requiredParameters = {
    oauth_consumer_key: yelpKeys.oauth_consumer_key,
    oauth_token: yelpKeys.oauth_token,
    oauth_nonce: n(),
    oauth_timestamp: n().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  }

  /* All parameters need to be ordered by importance*/
  let parameters = _.assign(/*  defaultParameters,*/ setParameters, requiredParameters)

  /* Secret keys are used to create a request specific signature*/
  const consumerSecret = yelpKeys.consumerSecret
  const tokenSecret = yelpKeys.tokenSecret

  /* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
  /* Note: This signature is only good for 300 seconds after the oauth_timestamp */

  let signature = oauthSignature.generate(
    httpMethod,
    url,
    parameters,
    consumerSecret,
    tokenSecret,
    {encodeSignature: false}
  )
  //  console.log('signature', signature)

  /* add signature to the list of parameters */
  parameters.oauth_signature = signature

  //   turn parameters arguement to a query string
  let paramURL = qs.stringify(parameters)

  //  add query string to url
  let apiURL = url + '?' + paramURL
  console.log(apiURL)
  return apiURL
}

module.exports = requestYelp
