import web3 from './web3';
import goalieFactory from './build/GoalieFactory.json';

const GoalieFactory = new web3.eth.Contract(
  JSON.parse(goalieFactory.interface),
  '0xC57726B0c0241Cb7628537439e1E5710CE84Ca79',
);

export default GoalieFactory;
