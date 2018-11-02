/* Deploy script by Stephen Grider https://github.com/StephenGrider/EthereumCasts
*  Modified by: Micael Persson
*/
/* eslint-disable */

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const goalieFactory = require('./build/GoalieFactory.json');

require('dotenv').config()

const provider = new HDWalletProvider(
  process.env.MNEMONIC,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_APIKEY}`
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  
  try {
    const result = await new web3.eth.Contract(
      JSON.parse(goalieFactory.interface)
    )
      .deploy({ data: '0x' + goalieFactory.bytecode })
      .send({ from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);
  } catch (error) {
    console.log(error);
  }
};
deploy();
