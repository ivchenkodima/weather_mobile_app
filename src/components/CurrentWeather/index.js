import React, { Component } from 'react';
import './style.css';


class CurrentWeather extends Component{
  render() {

    return (
      <div className="current-weather">
        {this.props.children}
      </div>
    );
  }
}

export default CurrentWeather;
