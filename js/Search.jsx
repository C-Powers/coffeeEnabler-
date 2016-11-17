const React = require('react')
const requestYelp = require('./oauthScript.js')
const fetch = require('isomorphic-fetch')
const Display = require('./Display')

const Search = React.createClass({
  propTypes: {
  },
  getInitialState () {
    return {
      position: "It'll take a moment to find where you are... but we will",
      shops: {}
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
    let latlon = String(lat) + ',' + String(lon)

    console.log('latlon,  ', latlon)
    const parameters = {
      term: 'coffee',
      ll: latlon
    }

    fetch(requestYelp(parameters), {
    })
    .then(response => response.json())
    .then(data => this.setState({shops: data}))
    .catch(e => console.log('error: ', e))
  },
  render () {
    return (
      <div className="">
        <div>
          <div className="title text-center">
            Coffee Stop
          </div>
          <button className="runButt btn btn-primary text-center" onClick={this.fetchData} >
          Press me
          </button>
        </div>
        <div className="shops-display">
          <Display data={this.state.shops} />
        </div>
      </div>
    )
  }
})

/*
{this.state.shops
  .map((shop) => (
    <Display data={shop} key={shop.name} />
  ))}
*/

module.exports = Search
