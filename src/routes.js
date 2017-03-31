import React, { Component } from 'react';
import { Route, Router, browserHistory } from 'react-router';

import App from '@src/App';
import Homepage from '@src/apps/homepage';
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


// Webpack 2 code Splitting
// function errorLoading(error) {
//   throw new Error(`Dynamic page loading failed: ${error}`);
// }

// // Loading modules!
// function loadRoute(cb) {
//   return module => cb(null, module.default);
// }

// const routes = {
//   path: '/', // at index '/', the <Core /> component will be loaded
//   component: App,
//   indexRoute: {
//     getComponent(location, cb) {
//       System.import('@src/apps/homepage/homepage')
//         .then(loadRoute(cb))
//         .catch(errorLoading);
//     },
//   },
//   childRoutes: [
//     {
//       path: 'altug-firarda',
//       getComponent(location, cb) {
//         System.import('@src/apps/altug-firarda')
//           .then(loadRoute(cb, false))
//           .catch(errorLoading);
//       },
//     },
//     {
//       path: 'moviera',
//       getComponent(location, cb) {
//         System.import('@src/apps/moviera')
//           .then(loadRoute(cb))
//           .catch(errorLoading);
//       },
//     },
//   ],
// };

export default class AppRoutes extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        { routes }
      </Router>
    );
  }
}
