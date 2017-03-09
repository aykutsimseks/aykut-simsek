import React, { Component } from 'react';
import L from 'leaflet';
import _ from 'lodash';
import { Map, TileLayer, Marker, CircleMarker, Polyline, ZoomControl } from 'react-leaflet';
import Legend from './legend';

import LocationIcon from '../assets/img/location.png';

require('../assets/js/vendor/leaflet.awesome-markers.js');
require('../assets/styles/vendor/font-awesome/css/font-awesome.min.css');
require('../assets/styles/vendor/leaflet.css');

const markerIcon = L.icon({
  iconUrl: LocationIcon,
  iconSize: [24, 34],
  iconAnchor: [12, 32],
});

const pointOptions = {
  color: '#990000',
  weight: 0,
  fillOpacity: 1,
  opacity: 1,
  radius: 5,
};

const pathOptions = {
  color: '#990000',
  weight: 2,
  dashArray: [4, 5],
  smoothFactor: 0,
};

const colors = [
  'rgb(76,132,191)',
  'rgb(76,167,86)',
  'rgb(233,93,12)',
  'rgb(113,35,111)',
  'rgb(249,185,5)',
  'rgb(213,65,36)',
  'rgb(207,178,226)',
  'rgb(236,134,19)',
  'rgb(189,189,189)',
  'rgb(166,206,227)',
  'rgb(31,120,180)',
  'rgb(178,223,138)',
  'rgb(51,160,44)',
  'rgb(251,154,153)',
  'rgb(227,26,28)',
  'rgb(253,191,111)',
  'rgb(255,127,0)',
  'rgb(202,178,214)',
  'rgb(106,61,154)',
  'rgb(255,255,153)',
  'rgb(177,89,40)',
];

export default class MapPanel extends Component {

  generateMarkers() {
    const positions = this.props.positions;
    const transportMarkers = [];
    positions.forEach((s) => {
      s.forEach((current, j) => {
        if (j) {
          const prev = s[j - 1];
          transportMarkers.push({ loc: [(current.lat + prev.lat) / 2, (current.lng + prev.lng) / 2], icon: j > 1 ? this.props.departed_by : this.props.arrived_by });
        }
      });
    });
    return transportMarkers;
  }


  render() {
    const position = [Number(this.props.lat), Number(this.props.lon)];
    const positions = this.props.positions;
    const transportMarkers = this.generateMarkers();
    const places = _.chain(this.props.route)
      .groupBy(this.props.locale === 'tr' ? 'country_tr' : 'country')
      .map((d, i) => ({ place: i, min: Math.min.apply(null, _.map(d, 'idx')), max: Math.max.apply(null, _.map(d, 'idx')) }))
      .flatten()
      .value();

    return (
      <div>
        <Map center={position} zoom={Number(this.props.zoom)} zoomControl={false} dragging scroolWheelZoom animate>
          <TileLayer
            url="http://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
          />
          { this.props.index && <Marker position={position} icon={markerIcon} /> }
          <Polyline positions={positions} {...pathOptions} />
          <ZoomControl position="bottomright" />
          {
            /*
            (
              this.props.showTransportMarkers ?
              _.slice(this.props.route, Math.max(this.props.index - 2, 0), this.props.index + 1)
              :
              this.props.route
            )
            */
            this.props.route
            .map((p, i) => {
              const colorIndex = _.findIndex(places, ['place', _.get(p, this.props.locale === 'tr' ? 'country_tr' : 'country')]);
              const color = colors[colorIndex];
              // const radius = this.props.showTransportMarkers ? 4 : 4;
              return p.lat && p.lon && <CircleMarker key={`circle-marker-${i}`} {...pointOptions} center={new L.LatLng(p.lat, p.lon)} color={color} radius={4} />;
            })
          }
          {
            this.props.showTransportMarkers &&
            transportMarkers.map((m, i) => {
              const transportMarker = L.AwesomeMarkers.icon({
                icon: m.icon,
                prefix: 'fa',
                iconColor: '#990000',
                iconSize: [24, 34],
                iconAnchor: [12, 19],
              });
              return <Marker key={`transport-icon-${i}`} position={m.loc} icon={transportMarker} />;
            })
          }
          <Legend items={_.concat([{ place: 'Altug Firarda', min: 0, max: this.props.route.length }], places)} index={this.props.index} colors={_.concat(['rgba(0,0,0,.2)'], colors)} updateState={this.props.updateState} />
        </Map>
      </div>
    );
  }
}

