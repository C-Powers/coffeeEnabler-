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
      shops: []
    }
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
    .then(data => this.setState({shops: data.businesses}))
    .catch(e => console.log('error: ', e))
  },
  componentDidMount () {
    /*
    Grab the user's coordinates to pass into our
    fetchData() function. After coordinates are aquired,
    we then call fetchData()
    */
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position: position.coords})
        console.log(position.coords)
        this.fetchData()
      },
      (error) => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },
  render () {
    return (
      <div className="text-center">
        <div>
          <h1 className="title">
            Coffee Stop
          </h1>
        </div>
        <div className="shop-content">
        {this.state.shops
          .map((shop) => (
            <Display data={shop} key={shop.phone} />
          ))}
        </div>
      </div>
    )
  }
})

/*
  <div className="shops-display">
    <Display data={this.state.shops} />
  </div>
*/

module.exports = Search
