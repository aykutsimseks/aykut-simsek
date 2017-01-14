import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Tabs, Tab } from 'material-ui/Tabs';

import AutoComplete from 'material-ui/AutoComplete';


import ReactPaginate from 'react-paginate';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import SearchIcon from 'material-ui/svg-icons/action/search';


export default class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
  }

  updateState(i) {
    this.props.updateState(i);
  }

  render() {
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
            >
              <MenuItem value={'all'} primaryText="All" />
              <MenuItem value={'action'} primaryText="Action" />
              <MenuItem value={'adventure'} primaryText="Adventure" />
            </SelectField>
          </div>

          <div className="row">
            Sort By
            <Tabs
              value={this.props.sortBy}
              onChange={value => this.props.updateState({ sortBy: value })}
            >
              <Tab value="rating" label="Rating" />
              <Tab value="date" label="Date" />
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
              dataSource={['Aykut', 'Simsek']}
              fullWidth
              maxSearchResults={5}
            />
            <SearchIcon style={{ height: 24, width: 24, pointerEvents: 'all', float: 'right', marginTop: -36, color: '#aaa' }} />
          </div>
        </div>
        <div className="bottom-navigation">
          <ReactPaginate
            previousLabel={<BackIcon />}
            nextLabel={<ForwardIcon />}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            //pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            //onPageChange={this.handlePageClick}
            containerClassName="pagination"
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
        </div>
      </div>
    );
  }
}
