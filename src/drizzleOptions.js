import Goalie from './../build/contracts/Goalie.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    Goalie,
  ],
  events: {
    Goalie: ['GoalApproved', 'NewGoal'],
  },
  polls: {
    accounts: 15000
  }
}

export default drizzleOptions