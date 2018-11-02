/* web3 client/server safe wrapper script by Stephen Grider https://github.com/StephenGrider/EthereumCasts */
/* eslint-disable */
import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/56666a488f594a31bd283bfec1fab0f8', // TODO: change this to be read from .env, possible reset key?
  );
  web3 = new Web3(provider);
}

export default web3;
