import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from '@components/App';
import Homepage from '@src/apps/homepage/homepage';
import AltugFirarda from '@src/apps/altug-firarda';
import Moviera from '@src/apps/moviera';

const routes = (
  <Route component={App}>
    <Route path="/" component={Homepage} />
    <Route path="/altug-firarda" component={AltugFirarda} />
    <Route path="/altug-firarda/:pageId" component={AltugFirarda} />
    <Route path="/moviera" component={Moviera} />
  </Route>
);

export default class AppRoutes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        { routes }
      </Router>
    );
  }
}
