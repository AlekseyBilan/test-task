import React, { ReactElement, useMemo } from "react";
import { Employees } from "../App/types";
import "./ChartWrap.scss";

function ChartWrap(props: {result:Employees, title:string, children:ReactElement}) {
  const Chart = useMemo( () => { 
    return (
      <div className="chart-wrap">
        <div className="chart-wrap-helper-container">
          <h2 className="title">{props?.title}</h2>
          {props.children}
        </div>
      </div>
    )
  }, [props.result]);

  return (
    <>
      {Chart}
    </>
  );
}

export default ChartWrap;
