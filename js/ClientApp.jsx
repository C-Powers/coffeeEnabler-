const React = require('react')
const ReactDOM = require('react-dom')
const Search = require('./Search')

const App = React.createClass({
  render () {
    return (
      <Search />
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
