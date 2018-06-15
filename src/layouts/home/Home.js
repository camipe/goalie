import React, { Component } from 'react'
import logo from '../../logo.png'

import Goal from "../../goal/Goal";

class Home extends Component {
  constructor( props ) {
    super( props )

    // Apply background filters
    // document.getElementById( 'backgroundImage' ).setAttribute( 'style', '-webkit-filter: ' + C.BG_FILTER )

    this.state = {
      testGoal: {
        title: "Testing",
        description: "Just testing component",
        owner: "0xc8DaE4BEc5EAe38C25991C0f7eEb0f683eA4FF85",
        beneficiary: "0x247080353466978b5a3B27F8B74898a07607ddEc",
        amount: 123241231,
        deadline: 1529066379,
        nrOfFriends: 2,
        approvals: ["0x9d30613A0d005691237dccF99115c5b5c561E434"],
      }
    }
  }
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" />
            <Goal goal={this.state.testGoal}></Goal>
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
