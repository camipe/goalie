import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'

import Goal from "../../goal/Goal";

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <Goal></Goal>
          </div>

          {/* <div className="pure-u-1-1">
            <h2>Goals</h2>
            <p><strong>Stored Value</strong>: {this.Goalie.goals}</p>
            <br/><br/>
          </div> */}
        </div>
      </main>
    )
  }
  
}

export default Home
