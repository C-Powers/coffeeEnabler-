const React = require('react')
const { string } = React.PropTypes

const Search = React.createClass({
  propTypes: {
    color: string,
    title: string
  },
  getInitialState () {
    return {
      position: 'unknown'
    }
  },
  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        this.setState({position})
      },
      (error) => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },
  render () {
    const style = {color: this.props.color}
    return (
      <div>
        <h1 style={style}>
          {this.props.title}
        </h1>
      </div>
    )
  }
})

module.exports = Search
