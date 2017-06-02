import React, { Component } from 'react';
import './style.css';

class Row extends Component{

  render() {
    let data = this.props.data,
        hours = new Date(data.DateTime).getHours(),
        icon = (data.WeatherIcon < 10) ? '0'+ data.WeatherIcon : data.WeatherIcon;
    return (
      <div className="item">
        <span className="time">{hours}<sup>00</sup></span>
        <span className="icon"><img src={`https://developer.accuweather.com/sites/default/files/${icon}-s.png`} /></span>
        <span className="phrase">{data.IconPhrase}</span>
        <span className="temperature">{data.Temperature.UnitType}°</span>
      </div>
    );
  }
}

export default Row;
