import React from 'react';
import './ChartWrap.scss';

function ChartWrap(props:any) {
  return (
    <div className="chart-wrap">
        <div className="chart-wrap-helper-container">
            <h2 className="title">{props?.title}</h2>
            {props.children}
        </div>
    </div>
  );
}

export default ChartWrap;
