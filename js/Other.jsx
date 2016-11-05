const React = require('react')
const { string } = React.PropTypes

const MyTitle = React.createClass({
  propTypes: {
    color: string,
    title: string
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

module.exports = MyTitle
