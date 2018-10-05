import React, { Component } from 'react'
import { Link } from 'react-router'

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="pure-menu pure-menu-horizontal">
          <Link to="/" className="pure-menu-heading pure-menu-link">Goalie</Link>
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link to="/goals" className="pure-menu-link">My goals</Link></li>
            <li className="pure-menu-item"><Link to="/friends"  className="pure-menu-link">Friends</Link></li>
            <li className="pure-menu-item"><Link to="/beneficiary"  className="pure-menu-link">Beneficiary</Link></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App
