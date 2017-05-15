import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Tabs, Tab } from 'material-ui/Tabs';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { Range } from 'rc-slider';


require('../assets/styles/rc-slider.scss');

const genres = ['All', 'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'Romance', 'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'];

export default class ControlPanel extends Component {

  render() {
    const { years: { min, max, selectMin, selectMax }, handleTouchTap } = this.props;
    const marks = {};
    marks[selectMin] = { number: selectMin, label: selectMin > 2009 ? selectMin : 'pre 2010' };
    marks[selectMax] = { number: selectMax, label: selectMax };

    return (
      <div>
        <div className="main-content">
          <div className="row" style={{ marginTop: 0, marginBottom: -10 }} >
            <SelectField
              floatingLabelText="Genre"
              value={this.props.genre}
              fullWidth
              labelStyle={{ color: '#fff' }}
              onChange={(event, index, value) => this.props.updateState({ genre: value })}
              maxHeight={240}
            >
              {
                genres.map(g => <MenuItem value={g.toLowerCase()} primaryText={g} key={g} />)
              }
            </SelectField>
          </div>

          <div className="row">
            Sort By
            <Tabs
              value={this.props.sortBy}
              onChange={value => this.props.updateState({ sortBy: value })}
            >
              <Tab value="imdbRating" label="Rating" />
              <Tab value="released" label="Date" />
            </Tabs>
          </div>

          <div className="row">
            Select
            <Tabs
              value={this.props.select}
              onChange={value => this.props.updateState({ select: value })}
            >
              <Tab value="all" label="All" />
              <Tab value="netflix" label="Netflix" />
            </Tabs>
          </div>

          <div className="row" style={{ marginTop: -30 }} >
            <AutoComplete
              floatingLabelText="Search"
              filter={AutoComplete.fuzzyFilter}
              dataSource={[]}
              fullWidth
              maxSearchResults={5}
              inputStyle={{ color: 'white' }}
              value={this.props.q}
              onUpdateInput={value => this.props.updateState({ q: value })}
            />
            <SearchIcon style={{ height: 24, width: 24, pointerEvents: 'all', float: 'right', marginTop: -36, color: '#aaa' }} />
          </div>

          <div className="row" style={{ marginTop: 40 }}>
            <Range
              min={min}
              max={max}
              defaultValue={[selectMin, selectMax]}
              marks={marks}
              onAfterChange={(values) => {
                this.props.updateState({ years: { min, max, selectMin: values[0], selectMax: values[1] } });
              }}
            />
          </div>

          <div className="row toggleButton" style={{ textAlign: 'center' }}>
            <RaisedButton label="Done" primary onTouchTap={handleTouchTap} />
          </div>
        </div>
        <div className="row attribution">
          Crafted by <a href="/" rel="noopener noreferrer">Aykut Simsek</a> | 2016
        </div>
      </div>
    );
  }
}
