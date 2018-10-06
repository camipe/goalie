/* web3 client/server safe wrapper script by Stephen Grider https://github.com/StephenGrider/EthereumCasts */
/* eslint-disable */

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q',
  );
  web3 = new Web3(provider);
}

export default web3;
