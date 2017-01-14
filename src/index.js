import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import AppRoutes from '@src/routes';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const rootEl = document.getElementById('root');



ReactDOM.render(
  <AppContainer>
    <AppRoutes />
  </AppContainer>,
  rootEl);


if (module.hot) {
  module.hot.accept('@src/routes', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('@src/routes').default;
    ReactDOM.render(
      <AppContainer>
        <AppRoutes />
      </AppContainer>,
      rootEl);
  });
}
