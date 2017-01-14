import React, { Component } from 'react';
import _ from 'lodash';

export default class Legend extends Component {
  render() {
    const selected = _.findLastIndex(this.props.items, item => (this.props.index >= item.min && this.props.index <= item.max));

    return (
      <ul className="legend">
        {
          _.map(this.props.items, (item, i) =>
            <li
              className={`legend-item ${(i === selected) ? 'active' : ''} ${!this.props.index ? 'visible' : ''}`}
              key={item.place}
              onTouchTap={() => this.props.updateState(item.min)}
            >
              { this.props.colors[i] && <div className="bullet" style={{ background: this.props.colors[i] }} /> }
              <span className="text">{item.place}</span>
            </li>
          )
        }
      </ul>
    );
  }
}

