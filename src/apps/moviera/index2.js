import React, { Component } from 'react';
import _ from 'lodash';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialTheme from './assets/styles/material-theme';

import ControlPanel from './components/control-panel/control-panel';

require('./assets/styles/main.scss');

export default class Moviera extends Component {

  constructor(props) {
    super(props);

    this.state = {
      genre: 'all',
      sortBy: 'rating',
      select: 'all',
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState(obj) {
    console.log(obj)
    this.setState(obj);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
        <div className="moviera">
          <div className="control-panel">
            <ControlPanel {...this.state} updateState={this.updateState} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
