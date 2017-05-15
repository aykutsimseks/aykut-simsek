import React, { Component } from 'react';

import { capitalize } from 'lodash';
import moment from 'moment';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Dialog from 'material-ui/Dialog';

import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import ForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import CalendarIcon from 'material-ui/svg-icons/action/date-range';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';

import WorldMap from './world-map/world-map';

const aboutModal = (modalState, toggle) => (
  <Dialog
    modal={false}
    open={modalState}
    onRequestClose={() => { toggle(false); }}
  >
    <div className="info-modal">
      <div className="row">Crafted with ❤ by <a href="/" rel="noopener noreferrer">Aykut Simsek</a> | 2016</div>
    </div>
  </Dialog>
);

export default class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
    };

    this.formatDateDisplay = this.formatDateDisplay.bind(this);
    this.nthDay = this.nthDay.bind(this);
    this.getLocaleText = this.getLocaleText.bind(this);
  }

  getLocaleText = (key) => {
    let text = {};

    if (this.props.locale === 'tr') {
      text = {
        country: this.props.country_tr,
        place: this.props.place_tr,
        story: this.props.story_tr,
        day: 'gün',
      };
    } else {
      text = {
        country: this.props.country,
        place: this.props.place,
        story: this.props.story,
        day: 'day',
      };
    }

    return text[key];
  }

  toggleModal = (bool) => {
    this.setState({ modalState: bool });
  };

  nthDay = () => {
    moment.locale(this.props.locale);
    const m1 = moment.utc(this.props.start_date, 'YYYY-MM-DD');
    const m2 = moment.utc('2015-02-01', 'YYYY-MM-DD');
    const dateDiff = m1.diff(m2, 'days');
    return (<div>{capitalize(this.getLocaleText('day'))}<div style={{ fontSize: 18 }}>{dateDiff}</div></div>);
  }

  formatDateDisplay= () => {
    let dateInterval = '';
    moment.locale(this.props.locale);
    const m1 = moment.utc(this.props.start_date, 'YYYY-MM-DD');
    const m2 = moment.utc(this.props.end_date, 'YYYY-MM-DD');
    const dateDiff = m2.diff(m1, 'days');

    if (dateDiff) {
      const duration = `${dateDiff + 1} ${this.getLocaleText('day')}${this.props.locale === 'en-US' && dateDiff > 0 ? 's' : ''}`;
      if (m1.month() === m2.month()) {
        dateInterval = `${m1.format('D')} - ${m2.format('D MMMM')}`;
      } else {
        dateInterval = `${m1.format('D MMMM')} - ${m2.format('D MMMM')}`;
      }
      return `${dateInterval} (${duration})`;
    }

    dateInterval = `${m1.format('D MMMM')}`;
    return `${dateInterval}`;
  }

  render() {
    return (
      <div>
        <div className="header-bar">
          <div className="title">
            { this.getLocaleText('place') + (this.props.country ? `, ${this.getLocaleText('country')}` : '') }
          </div>
          <div className="dates">
            <CalendarIcon style={{ color: '#fff', height: 18, width: 18, marginBottom: -4, marginLeft: -1 }} /> { this.formatDateDisplay() }
          </div>
          { this.props.index && <div className="nth-day">{ this.nthDay() }</div> }
        </div>
        <div className="main-content">
          { this.props.index ?
            <div className="instagram-embed">
              <iframe
                className="instagram-media instagram-media-rendered"
                id="instagram-embed"
                allowTransparency="true"
                scrolling="no"
                width={320}
                height={400}
                frameBorder={0}
                src={`https://instagram.com/p/${this.props.instagram_image_id}/embed/?v=1`}
              />
            </div>
            :
            <WorldMap/>
          }
          <div className="story">
            <div dangerouslySetInnerHTML={{ __html: this.getLocaleText('story').replace(/(#\w+)/g, "<span class='hastag' >$1</span>") }} />
          </div>
        </div>
        <div className="bottom-navigation">
          <BottomNavigation>
            <BottomNavigationItem
              className="bottom-navigation-item"
              icon={<BackIcon />}
              onTouchTap={() => { this.props.updateState(this.props.index - 1); }}
            />
            <BottomNavigationItem
              className="bottom-navigation-item"
              icon={<InfoIcon style={{ width: 18, margin: 'auto' }} />}
              onTouchTap={() => { this.toggleModal(true); }}
              label={`${this.props.index + 1} / 106`}
            />
            { aboutModal(this.state.modalState, this.toggleModal) }
            <BottomNavigationItem
              className="bottom-navigation-item"
              icon={<ForwardIcon />}
              onTouchTap={() => { this.props.updateState(this.props.index + 1); }}
            />
          </BottomNavigation>
        </div>
      </div>
    );
  }
}
