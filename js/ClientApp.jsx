const React = require('react')
const ReactDOM = require('react-dom')
const Other = require('./Other')

const App = React.createClass({
  render () {
    return (
      <Other
        title={"hello, I am a template. Git clone and do some fun stuff!"}
        color={"purple"}
      />
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
