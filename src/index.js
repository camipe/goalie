import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { DrizzleProvider } from 'drizzle-react'

// Layouts
import App from './App'
import MyGoals from './layouts/myGoals/MyGoals'
import FriendGoals from './layouts/friendGoals/FriendGoals'
import BeneficiaryGoals from './layouts/beneficiaryGoals/BeneficiaryGoals'
import HomeContainer from './layouts/home/HomeContainer'
import { LoadingContainer } from 'drizzle-react-components'

import store from './store'
import drizzleOptions from './drizzleOptions'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <DrizzleProvider options={drizzleOptions} store={store}>
      <LoadingContainer>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={HomeContainer} />
            <Route path="goals" component={MyGoals} />
            <Route path="friends" component={FriendGoals} />
            <Route path="beneficiary" component={BeneficiaryGoals} />
          </Route>
        </Router>
      </LoadingContainer>
    </DrizzleProvider>
  ),
  document.getElementById('root')
);
