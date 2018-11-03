import web3 from './web3';
import goalieFactory from './build/GoalieFactory.json';

const GoalieFactory = new web3.eth.Contract(
  JSON.parse(goalieFactory.interface),
  '0xC3911C7177e59F60159CCEfd380aB902C8eA9d84',
);

export default GoalieFactory;
