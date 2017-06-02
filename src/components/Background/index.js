import React, { Component } from 'react';
import './style.css';

class Background extends Component{
  render() {
    let partOfDay,
        hour = new Date().getHours();
    if (hour >= 12 && hour < 19) partOfDay = 'day';
    else if (hour >= 19 && hour < 22) partOfDay = 'evening';
    else if (hour >= 22 || hour < 4) partOfDay = 'night';
    else if (hour >= 4  && hour < 12) partOfDay = 'morning';
    return (
      <div className={'background ' + partOfDay}>
      </div>
    );
  }
}

export default Background;
