import React, { Component } from 'react';

import GBIcon from './img/gb.png';
import TRIcon from './img/tr.png';


export default class LanguageSwitch extends Component {
  render() {
    return (
      <ul className="language-switch">
        <li
          className={`language-item ${this.props.lan === 'en' ? 'active' : ''}`}
          onTouchTap={() => this.props.handleChange('en')}
        >
          <span className="text">English</span>
          <img className="flag" src={GBIcon} alt="English" title="English" />
        </li>
        <li
          className={`language-item ${this.props.lan === 'tr' ? 'active' : ''}`}
          onTouchTap={() => this.props.handleChange('tr')}
        >
          <span className="text">Türkçe</span>
          <img className="flag" src={TRIcon} alt="Türkçe" title="Türkçe" />
        </li>
      </ul>
    );
  }
}

