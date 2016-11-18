const React = require('react')
const { object } = React.PropTypes

const Display = React.createClass({
  propTypes: {
    data: object
  },
  render () {
    return (
      <div className="shops">
        <div className="shop-image">
          <img src={this.props.data.image_url} />
        </div>
        <div className="shop-data">
          <p className=""> <strong>
            <a href={this.props.data.url} target="_blank">
            {this.props.data.name}
            </a>
          </strong> </p>
          <p> {this.props.data.rating}/5 </p>
          <p> {this.props.data.display_phone} </p>
        </div>
      </div>
    )
  }
})
//  <div><pre>{JSON.stringify(this.props.data, null, 2)}</pre></div>
module.exports = Display
