const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'index', pattern: '/', page: 'index' })
  .add({ name: 'goalieNew', pattern: '/new', page: 'goalies/GoalieForm' })
  .add({ name: 'goalieDetails', pattern: '/details/:address', page: 'goalies/GoalieDetails' });
