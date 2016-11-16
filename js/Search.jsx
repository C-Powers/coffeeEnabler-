const React = require('react')
const requestYelp = require('./oauthScript.js')
const fetch = require('isomorphic-fetch')
const fetchJsonp = require('fetch-jsonp')
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
    let latlon = /*'ll='*/String(lat) + ',' + String(lon)
//  TODO: WARNING WARNING ---- DO NOT FORGET TO HIDE THESE IN A CONFIG FILE

    let dataCatcher = []

    console.log('latlon,  ' , latlon)
    const parameters = {
      term: 'coffee',
      ll: latlon,
    }

    fetch(requestYelp(parameters), {
    })
    .then(response => response.json())
    .then(data => console.log('NEW FETCH DATA: -----', data))
    .catch(e => console.log('error: ', e))
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
