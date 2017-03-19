import React, { Component } from 'react';
import { map, findLastIndex } from 'lodash';

export default class Legend extends Component {
  render() {
    const selected = findLastIndex(this.props.items, item => (this.props.index >= item.min && this.props.index <= item.max));

    return (
      <ul className="legend">
        {
          map(this.props.items, (item, i) =>
            <li
              className={`legend-item ${(i === selected) ? 'active' : ''} ${!this.props.index ? 'visible' : ''}`}
              key={item.place}
              onTouchTap={() => this.props.updateState(item.min)}
            >
              { this.props.colors[i] && <div className="bullet" style={{ background: this.props.colors[i] }} /> }
              <span className="text">{item.place}</span>
            </li>,
          )
        }
      </ul>
    );
  }
}

