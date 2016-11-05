const React = require('react')
const OAuthSimple = require('OAuthSimple')
const { string } = React.PropTypes

const Search = React.createClass({
  propTypes: {
    color: string,
    title: string
  },
  getInitialState () {
    return {
      position: "It'll take a moment to find where you are... but we will"
    }
  },
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: position.coords})
        console.log(position.coords)
      },
      (error) => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },
  fetchData () {
    let lat = this.state.position.latitude
    let lon = this.state.position.longitude
    let latlon = 'll = ' + String(lat) + ', ' + String(lon)
//  TODO: WARNING WARNING ---- DO NOT FORGET TO HIDE THESE IN A CONFIG FILE
    let consumerKey = '2uwwUfPbV_5gdDj-A4cBAw'
    let consumerSecret = 'MEmE9zorxdUCRcC4cmJ-SNgeSTs'
    let tokenSecret = 'FjGoPj8Gh12GsB2G3eZByDKlJUAY90kY'
    let token = '	sVGkNiS42d9eukYlNFhOmSzMOd8'

    let oauth = new OAuthSimple(consumerKey, tokenSecret)
    let request = oauth.sign({
      action: 'GET',
      path: 'https://api.yelp.com/v2/search',
      parameters: 'term=coffee&' + latlon,
      signatures: {
        api_key: consumerKey,
        shared_secret: consumerSecret,
        access_token: token,
        access_secret: tokenSecret
      },
    })

    let dataCatcher = []

    fetch(request.signed_url, {method: 'GET'}).then(function (response) {
      return response.json()
    }).then(function (data) {
      dataCatcher.push({
        ident: 'Results',
        data: data
      })
    }).catch(function (error) {
      console.log('ERROR:', error)
    })

    console.log("data catcher, ", dataCatcher)
  },
  render () {
    return (
      <div>
        <div><pre>{JSON.stringify(this.state.position, null, 2)}</pre></div>
        <button onClick={this.fetchData} >
        Press me
        </button>
      </div>
    )
  }
})

module.exports = Search
