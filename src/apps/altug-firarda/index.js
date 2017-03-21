import React, { Component } from 'react';
import { get, map, extend } from 'lodash';
import L from 'leaflet';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialTheme from './assets/styles/material-theme';

import ControlPanel from './components/control-panel';
import MapPanel from './components/map';
import LanguageSwitch from './components/language-switch/language-switch';

import TripJSON from './assets/altug-firarda.json';

const route = get(TripJSON, ['route']);
map(route, (e, i) => { extend(e, { idx: i + 1 }); });

const dateLineIndex = 85;

require('./assets/styles/main.scss');


export default class AltugFirarda extends Component {

  static getRoute(index) {
    let location;
    let positions;
    if (index) {
      location = get(route, index - 1);
      location.departed_by = get(route, [index, 'arrived_by']);

      positions = [
        route.slice(
          Math.max(index - 2, 0),
          Math.min(index + 1, route.length),
        )
        .map(p => new L.LatLng(p.lat, p.lon, 0, true)),
      ];

      if (index === dateLineIndex + 1) {
        positions[0][2].lng = Number(positions[0][2].lng) + 360;
        positions.push(positions[0]);
        positions[1][2].lng = Number(positions[0][2].lng) + 360;
      } else if (index === dateLineIndex + 2) {
        positions[0][0].lng = Number(positions[0][0].lng) - 360;
        positions.push(positions[0]);
        positions[1][0].lng = Number(positions[0][0].lng) - 360;
      }
    } else {
      location = get(TripJSON, 'summary');
      positions = [
        route
        .map(p => new L.LatLng(p.lat, p.lon, 0, true)),
      ];

      const p1 = positions[0].slice(0, dateLineIndex + 1);
      p1.push(new L.LatLng(p1[dateLineIndex].lat, p1[dateLineIndex].lng + 360, true));
      const p2 = positions[0].slice(dateLineIndex + 1);
      p2.unshift(new L.LatLng(p2[0].lat, p2[0].lng - 360, true));
      positions = [p1, p2];
    }
    return {
      ...location,
      positions,
    };
  }

  static getState(i) {
    let index = i;
    if (index > TripJSON.route.length) {
      index = 0;
    } else if (index < 0) {
      index = TripJSON.route.length;
    }

    return { index, ...AltugFirarda.getRoute(index) };
  }

  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);

    const index = Number(this.props.params.pageId - 1) || 0;

    let browserLanguage = 'en-US';
    if (navigator.browserLanguage) {
      browserLanguage = navigator.browserLanguage;
      // en-US
    } else if (navigator.language) {
      browserLanguage = navigator.language;
      // en-US
    }

    let locationLanguage = get(props, 'location.query.l');
    if (locationLanguage && locationLanguage.startsWith('en')) {
      locationLanguage = 'en-US';
    }

    this.state = {
      locale: locationLanguage || browserLanguage || 'tr',
      route,
      ...AltugFirarda.getState(index),
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.title = 'Altug Firarda';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(event) {
    const keyCode = event.keyCode;
    switch (keyCode) {
      case 37:
        this.updateState(this.state.index - 1);
        break;

      case 39:
        this.updateState(this.state.index + 1);
        break;

      default:
        break;
    }
  }

  updateState(i) {
    this.setState(AltugFirarda.getState(i));
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
        <div className="altug-firarda">
          <div className="control-panel">
            <ControlPanel {...this.state} updateState={this.updateState} />
          </div>
          <div className="map-panel">
            <MapPanel {...this.state} updateState={this.updateState} showTransportMarkers={this.state.index} />
            <div className="cover" />
          </div>
          <LanguageSwitch lan={this.state.locale} handleChange={value => this.setState({ locale: value })} />
        </div>
      </MuiThemeProvider>
    );
  }
}
