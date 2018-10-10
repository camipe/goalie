import web3 from './web3';
import goalieFactory from './build/GoalieFactory.json';

const GoalieFactory = new web3.eth.Contract(
  JSON.parse(goalieFactory.interface),
  '0x69F179E17319529AD5b8832d8dBcB9BB179f39D2',
);

export default GoalieFactory;
