import web3 from './web3';
import goalie from './build/Goalie.json';

const Goalie = address => new web3.eth.Contract(
  JSON.parse(goalie.interface),
  address,
);

export default Goalie;
