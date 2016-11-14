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
    let latlon = 'll=' + String(lat) + ',' + String(lon)
//  TODO: WARNING WARNING ---- DO NOT FORGET TO HIDE THESE IN A CONFIG FILE
    
    let dataCatcher = []

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
