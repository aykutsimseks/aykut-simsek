import React, { Component } from 'react';
import { includes } from 'lodash';

// require('./leaflet.label.js');


const visited = ['Turkey', 'United Arab Emirates', 'India', 'Sri Lanka', 'Maldives', 'Singapore', 'Indonesia', 'Malaysia', 'Australia', 'Thailand', 'Laos', 'Vietnam', 'Cambodia', 'Japan', 'China', 'Macau', 'Hong Kong', 'United States of America', 'Mexico', 'Cuba', 'Germany'];
const visitedOther = ['Canada', 'Austria', 'Belgium', 'Bulgaria', 'Czech Republic', 'Finland', 'France', 'Germany', 'Greece', 'Italy', 'Liechtenstein', 'Monaco', 'Netherlands', 'Russia', 'Spain', 'Switzerland', 'United Kingdom', 'Vatican City'];


let clicked = null;

const renderPolygons = () => {
    const map = L.map('mini-world-map', {
      attributionControl: false,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    L.geoJson(world, {
      style: {
        clickable: true,
        color: 'rgba(0,0,0,1)',
        cursor: 'pointer',
        fillColor: 'rgb(240, 240, 240)',
        fillOpacity: 1,
        opacity: 0.3,
        weight: 1.0,
      },

      onEachFeature: (feature, layer) => {
        const name = feature.properties.name;

        // layer.bindLabel(feature.properties.name, { direction: 'auto' });

        if (includes(visited, name)) {
          layer.setStyle({ fillColor: 'rgba(51, 122, 183, 1)' });
        } else if (includes(visitedOther, name)) {
          layer.setStyle({ fillColor: 'rgba(177, 207, 233, 1)' });
        }

        // layer.on('mouseover', function () {
        //   this.setStyle({ fillOpacity: 0.75 })
        // });

        // layer.on('mouseover', function () {
        //   this.setStyle({ fillOpacity: 1 })
        // });

        layer.on('click', function () {
          if (clicked === this) {
            clicked = null;
            map.setView(new L.LatLng(25, 5), 0.34);
          } else {
            clicked = this;
            map.fitBounds(this.getBounds());
          }
        });
      },
    }).addTo(map);

    // map.on('click', this.onMapClick);

    map.setView(new L.LatLng(25, 5), 0.34);
};

const world = require('./countries.geo.json');
// const fs = require('fs');

// let world = null;

// // Write the callback function
// function handleFile(err, data) {
//   if (err) throw err;
//   world = JSON.parse(data);
//   // You can now play with your datas
//   renderPolygons();
// }

// // Read the file and send to the callback
// fs.readFile('./countries.geo.json', handleFile);

export default class WorldMap extends Component {

  componentDidMount() {
    if (world) {
      renderPolygons();
    }
  }

  shouldComponentUpdate = () => false

  onMapClick = () => {
    // Do some wonderful map things...
  }

  render() {
    return (
      <div>
        <div id="mini-world-map" style={{ width: '100%', height: '180px' }} />
      </div>
    );
  }
}
