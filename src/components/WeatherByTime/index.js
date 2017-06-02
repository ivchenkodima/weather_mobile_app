import React, { Component } from 'react';
import './style.css';

import Row from '../Row'

class WeatherByTime extends Component{
  render() {
    let content = (!!this.props.data) ? this.props.data.map((item, index) => <Row key={index} data={item}/>) : 'No data';
    return (
      <div className="forecast">
        {content}
      </div>
    );
  }
}

export default WeatherByTime;
