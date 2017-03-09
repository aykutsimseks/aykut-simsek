import React, { Component } from 'react';

// import GBIcon from './img/gb.png';
// import TRIcon from './img/tr.png';
// <img className="flag" src={GBIcon} alt="English" title="English" />
// <img className="flag" src={TRIcon} alt="Türkçe" title="Türkçe" />
export default class LanguageSwitch extends Component {
  render() {
    return (
      <ul className="language-switch">
        <li
          className={`language-item ${this.props.lan === 'en-US' ? 'active' : ''}`}
          onTouchTap={() => this.props.handleChange('en-US')}
        >
          <span className="text">English</span>
          <span>EN</span>
        </li>
        <li
          className={`language-item ${this.props.lan === 'tr' ? 'active' : ''}`}
          onTouchTap={() => this.props.handleChange('tr')}
        >
          <span className="text">Türkçe</span>
          <span>TR</span>
        </li>
      </ul>
    );
  }
}

