const React = require('react')
const { object } = React.PropTypes

const Display = React.createClass({
  propTypes: {
    data: object
  },
  render () {
    return (
      <div>
        <div><pre>{JSON.stringify(this.props.data, null, 2)}</pre></div>
      </div>
    )
  }
})

module.exports = Display
