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
      shops: [],
      err: ''
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
    /*
      Here is where we fetch the yelp data by passing our
      keys into the requestYelp function.
      It deals with Yelp's oauth,
      and creates the right callback url.
    */
    fetch(requestYelp(parameters), {
    })
    .then(response => response.json())
    .then(data => this.setState({shops: data.businesses}))
    .catch(e => {
      console.log('error: ', e)
      this.setState({err: 'We had an issue referencing Yelp\'s API. Refresh to try again.'})
    })
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
      (error) => {
        this.setState({err: 'We could not find your position. Error: ' + error.message})
        console.log(error)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },
  render () {
    return (
      <div className="text-center">
        <div className="header-info">
          <h1 className="title">
            Coffee Stops
          </h1>
          <img id="yelp-tag" src="https://s3-media2.fl.yelpcdn.com/assets/srv0/developer_pages/95212dafe621/assets/img/yelp-2c.png"></img>
        </div>
        <div>
        </div>
        <div className="shop-content">
          <div> <p>{this.state.err}</p> </div>
          {this.state.shops
            .map((shop) => (
              <Display data={shop} key={shop.phone} />
            ))}
        </div>
      </div>
    )
  }
})

module.exports = Search
