// Source
// https://github.com/searchkit/searchkit-demo/tree/master/src/app/src
// http://docs.searchkit.co/stable/

import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import SearchIcon from 'material-ui/svg-icons/action/search';

import {
  SearchBox,
  HitsStats,
  RefinementListFilter,
  Pagination,
  ResetFilters,
  ImmutableQuery,
  SelectedFilters,
  HierarchicalMenuFilter,
  SortingSelector,
  SearchkitProvider,
  SearchkitManager,
  ItemHistogramList,
  NoHits,
  RangeFilter,
  InitialLoader,
  ViewSwitcherToggle,
  Toggle,
  ViewSwitcherHits,
  Layout, LayoutBody, LayoutResults,
  SideBar, TopBar,
  ActionBar, ActionBarRow,
} from 'searchkit';


import './assets/styles/searchkit.scss';
import './assets/styles/main.scss';
import MaterialTheme from './assets/styles/material-theme';

import { MovieHitsGridItem, MovieHitsListItem } from './ResultComponents';


export default class Moviera extends Component {

  constructor() {
    super();
    // const host = 'http://demo.searchkit.co/api/movies';
    const host = '/api/movies';


    this.searchkit = new SearchkitManager(host);
    this.searchkit.query = this.searchkit.query.addQuery({
      range: {
        year: { gte: 1990, lt: 2017 },
      },
      filter: {
        categories: 'Movies',
      },
    });

    // let query = new ImmutableQuery();
    // let newQuery = query.addQuery({
    //   range: {
    //     year: { gte: 2000, lt: 2017 },
    //   },
    // });

    // this.searchkit.addDefaultQuery((query)=> { return newQuery } )


    // console.log(this);
    // this.searchkit.translateFunction = (key) => {
    //   return { 'pagination.next': <ForwardIcon />, 'pagination.previous': <BackIcon /> }[key];
    // };
  }

  searchkit: SearchkitManager

  render() {
    console.log(this.searchkit.query);
    return (

      <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
        <SearchkitProvider searchkit={this.searchkit}>
          <Layout className="moviera" size="l">
            <TopBar>
              <div className="my-logo">Searchkit Acme co</div>
              <SearchBox
                translations={{ 'searchbox.placeholder': 'Search Movies' }}
                queryOptions={{ minimum_should_match: '70%' }}
                autofocus
                searchOnChange
                queryFields={['actors^1', 'type^2', 'languages', 'title^5', 'genres^2', 'plot']}
              />
            </TopBar>

            <LayoutBody>

              <SideBar>
                <HierarchicalMenuFilter fields={['type.raw', 'genres.raw']} title="Categories" id="categories" />
                <RangeFilter min={0} max={100} field="metaScore" id="metascore" title="Metascore" showHistogram />
                <RangeFilter min={0} max={10} field="imdbRating" id="imdbRating" title="IMDB Rating" showHistogram />
                <RangeFilter min={1990} max={2017} minValue={2000} maxValue={2015} field="year" id="year" title="Year" showHistogram />
                <RefinementListFilter id="actors" title="Actors" field="actors.raw" operator="OR" size={10} listComponent={ItemHistogramList} />
              </SideBar>

              <LayoutResults>

                <ActionBar>
                  <ActionBarRow>
                    <HitsStats translations={{ 'hitstats.results_found': '{hitCount} results found' }} />
                    <ViewSwitcherToggle />
                    <SortingSelector
                      listComponent={Toggle}
                      options={[
                        {
                          label: 'Relevance',
                          fields: [
                            { field: '_score', options: { order: 'desc' } },
                            { field: 'released', options: { order: 'desc' } },
                          ],
                        },
                        { label: 'Score', field: 'imdbRating', order: 'desc' },
                        { label: 'Release', field: 'released', order: 'desc', defaultOption: true },
                      ]}
                    />
                  </ActionBarRow>
                  <ActionBarRow>
                    <SelectedFilters />
                    <ResetFilters />
                  </ActionBarRow>
                </ActionBar>

                <ViewSwitcherHits
                  hitsPerPage={12} highlightFields={['title', 'plot']}
                  sourceFilter={['plot', 'title', 'poster', 'imdbId', 'imdbRating', 'year']}
                  hitComponents={[
                    { key: 'grid', title: 'Grid', itemComponent: MovieHitsGridItem, defaultOption: true },
                    { key: 'list', title: 'List', itemComponent: MovieHitsListItem },
                  ]}
                  scrollTo="body"
                />

                <NoHits suggestionsField="title" />
                <InitialLoader />
                <Pagination showNumbers />
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </MuiThemeProvider>
    );
  }
}
