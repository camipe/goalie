const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'index', pattern: '/', page: 'index' })
  .add({ name: 'goalieNew', pattern: '/new', page: 'goalies/GoalieNew' })
  .add({ name: 'goalieDetails', pattern: '/details/:address', page: 'goalies/GoalieDetails' });
