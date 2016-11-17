const React = require('react')
const { object } = React.PropTypes

const Display = React.createClass({
  propTypes: {
    data: object
  },
  render () {
    return (
      <div className="shops">
        <p> {this.props.data.name} </p>
        <p> {this.props.data.rating}/5 </p>
        <p> {this.props.data.phone} </p>
      </div>
    )
  }
})
//  <div><pre>{JSON.stringify(this.props.data, null, 2)}</pre></div>
module.exports = Display
