import React, { Component } from 'react';
import cx from 'classnames';
import _ from 'lodash';
import elasticsearch from 'elasticsearch';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MaterialTheme from './assets/styles/material-theme';


import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import Settings from 'material-ui/svg-icons/content/filter-list';
import MovieraLogo from './assets/img/moviera_logo.png';

import ControlPanel from './components/control-panel';
import Results from './components/results';


require('./assets/styles/main.scss');


const client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace',
});

export default class Moviera extends Component {

  constructor(props) {
    super(props);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    this.state = {
      hideControls: true,
      page: 0,
      reset: true,
      genre: 'all',
      sortBy: 'imdbRating',
      select: 'all',
      showLoader: true,
      years: {
        min: 2009,
        max: currentYear,
        selectMin: currentYear,
        selectMax: currentYear,
      },
    };
  }

  componentDidMount = () => {
    document.title = 'Moviera | Aykut Simsek';
    window.addEventListener('scroll', this.handleScroll);
    this.updateMovies(this.state);
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.showLoader) {
      this.updateMovies(nextState);
    }
    // return !_.isEqual(this.props, nextProps) || nextState.showLoader || !_.isEqual(this.state.movies, nextState.movies) ;
    return true;
  }

  updateMovies = (state) => {
    const { page, reset, q, genre, sortBy, select, years: { selectMin, selectMax } } = state;
    const numResults = 15;
    const terms = [['type', 'movie']];

    if (genre !== 'all') {
      terms.push(['genres', genre]);
    }

    if (select !== 'all') {
      terms.push(['platform', select]);
    }

    client
      .search({
        q: q || undefined,
        sort: [
          `${sortBy}:desc`,
          'released:desc',
          'imdbRating:desc',
        ],
        body: {
          query: {
            bool: {
              filter: [
                {
                  range: {
                    released: {
                      gte: `${selectMin > 2009 ? selectMin : 1970}-01-01`,
                      lte: `${selectMax}-12-31`,
                    },
                  },
                },
              ].concat(
                terms.map(t => ({ term: { [t[0]]: t[1] } })),
              ),
            },
          },
        },
        size: numResults,
        from: reset ? 0 : numResults * page,
      })
      .then((body) => {
        if (reset) {
          window.scrollTo(0, 0);
        }
        this.setState({
          movies: reset ? _.get(body, 'hits.hits') : _.uniqBy(this.state.movies.concat(_.get(body, 'hits.hits')), '_id'),
          reset: false,
          showLoader: false,
        });
      });
  }

  updateState = obj => this.setState(_.merge(obj, { showLoader: true, reset: true }))

  handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      this.setState({
        page: this.state.page + 1,
        showLoader: true,
      });
    }
  }

  handleTouchTap = () => {
    this.setState({ hideControls: !this.state.hideControls });
  }

  render() {
    const { movies = [], showLoader, hideControls } = this.state;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(MaterialTheme)}>
        <div className={cx('moviera', hideControls && 'hideControls')}>
          <AppBar
            title={
              <div className="logoContainer">
                <img className="logo" src={MovieraLogo} alt="Moviera Logo" title="Moviera Logo" />
              </div>
            }
            className="header"
            // iconElementRight={!this.state.mql.matches? <IconButton tooltip="Filter" touch={true} onTouchTap={this.handleTouchTap} ><Settings /></IconButton>:null}
            iconElementRight={<IconButton className="toggleButton" tooltip="Filter" touch onTouchTap={this.handleTouchTap} style={{ marginRight: 15 }} ><Settings /></IconButton>}
            showMenuIconButton={false}
          />
          <div className="control-panel">
            <ControlPanel {...this.state} updateState={this.updateState} handleTouchTap={this.handleTouchTap} />
          </div>
          <div className="results">
            <Results movies={movies} />
            { showLoader ? <CircularProgress size={40} className="circular-loader" /> : null}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
