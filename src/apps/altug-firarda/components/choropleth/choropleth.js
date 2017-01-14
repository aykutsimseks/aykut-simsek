import React, { Component } from 'react';
import _ from 'lodash';

var d3 = require('d3');
var topojson = require('topojson');
import MapChoropleth from 'react-d3-map-choropleth/lib/mapChoropleth';

// import geojson from './data/countries.json';
// import csvData from 'dsv?delimiter=,!./data/visited.csv';


import geojson from 'json!./data/states.json';
import csvData from 'dsv?delimiter=\t!./data/unemployment.tsv';

require('./d3.geo.projection.v0.min.js');

const width = 320;
const height = 190;


// const dataMesh = topojson.mesh(geojson, geojson.objects.land, (a, b) => a !== b);
// const dataPolygon = topojson.feature(geojson, geojson.objects.land).features;

// data should be a MultiLineString
const dataMesh = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
/// data should be polygon
const dataPolygon = topojson.feature(topodata, topodata.objects.counties).features;


// console.log(csvData)

delete csvData['columns'];
_.each(csvData, (d, i) => {
  d.id = Number(d.id);
  d.value = Number(d.value);
});
console.log(csvData);

_.each(dataPolygon, (d, i) => {
  d.id = i;
})
console.log(dataPolygon);
// domain
// const domain = {
//   scale: 'quantize',
//   domain: [undefined, null, 1, 2, 3, 4],
//   range: ["#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"],
// };



var domain = {
  scale: 'quantize',
  domain: [0, .15],
  range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
};
var domainValue = function(d) { return +d.rate; };
var domainKey = function(d) {return +d.id};
var mapKey = function(d) {return +d.id};

var scale = 1280;
var translate = [width / 2, height / 2];
var projection = 'albersUsa';

var tooltipContent = function(d) {return d.properties;}


export default class Choropleth extends Component {
  render() {
    return (
      <MapChoropleth
        width={width}
        height={height}

        dataMesh={dataMesh}
        dataPolygon={dataPolygon}

        // scale={70}
        // center={[5, 15]}
        // translate={[width / 2, height / 2]}
        // projection={'kavrayskiy7'}


        // domain={domain}
        // domainData={csvData}
        // domainValue={d => +d.value}
        // domainKey={d => +d.id}
        // mapKey={d => 'id'}

        // tooltipContent={d => [_.get(d, 'properties.name') + " " + _.get(d, 'properties.id')]}
        // showTooltip

        scale= {scale}
        domain= {domain}
        domainData= {unemploy}
        domainValue= {domainValue}
        domainKey= {domainKey}
        mapKey = {mapKey}
        translate= {translate}
        projection= {projection}
        showGraticule= {true}
        tooltipContent= {tooltipContent}
        showTooltip= {true}
      />
    );
  }
}
