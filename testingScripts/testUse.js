const requestYelp = require('./oauthScript.js')


const defaultParameters = {
  location: 'San+Diego',
  sort: '2'
}

fetch(requestYelp(defaultParameters), {method: "GET"})
.then(function (response) {
  return response.json()
}).then(function (data) {
  console.log("NEW FETCH DATA: -----", data.region)
}).catch(function (error) {
  console.log("error: ", error)
})
