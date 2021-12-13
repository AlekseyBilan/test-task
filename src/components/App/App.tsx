import React, { useEffect, useState } from "react";
import { Popup } from "@progress/kendo-react-popup";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import ChartWrap from "../ChartWrap/ChartWrap";
import AddEmployees from "../AddEmployees/AddEmployees";
import GridWrap from "../Grid/GridWrap";
import "hammerjs";
import { Employeer, Employees } from "./types";
import "@progress/kendo-theme-material/dist/all.css";
import "./App.scss";

import employees from "../../employees.json"; //stab data

function App() {
  const [result, setResult] = useState(employees);
  const dataAdded = (data: Employeer) => {
    setResult((employees: Employees) => [...employees, data]);
    setShow(!show);
  };

  const getJobTitleChartData = (result: Employees) => {
    let jobTitle = [
      { category: "QA", value: 0 },
      { category: "Developer", value: 0 },
    ];
    const filterByJobTitle = (item: Employeer) => {
      if (item.jobTitle === "QA") {
        jobTitle[0].value++;
      } else if (item.jobTitle === "Developer") {
        jobTitle[1].value++;
      }
    };
    result.forEach(filterByJobTitle);
    return jobTitle;
  };

  const getGenderChartData = (result: Employees) => {
    let gender = [
      { category: "Male", value: 0 },
      { category: "Female", value: 0 },
    ];
    const filterByGender = (item: Employeer) => {
      if (item.gender === "Male") {
        gender[0].value++;
      } else if (item.gender === "Female") {
        gender[1].value++;
      }
    };
    result.forEach(filterByGender);
    return gender;
  };

  let jobTitleChartData = getJobTitleChartData(result);
  let genderChartData = getGenderChartData(result);

  const labelContent = (props: any) => {
    return `${props.dataItem.category} ${props.dataItem.value}`;
  };

  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setShow(false);
  }, []);
  const onClick = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <h1 className="title">Corporate Empoloyees</h1>
      <div className="btn-wrapper">
        <button ref={btnRef} onClick={onClick} className="btn btn-add-employees">
          Add Employee
        </button>
      </div>

      <Popup anchor={btnRef.current} show={show} popupClass={"popup-content"}>
        <AddEmployees onSubmit={dataAdded}></AddEmployees>
      </Popup>

      <GridWrap result={result} />

      <div className="charts-wrapper">
        <ChartWrap title={"Employees by Job Title"}>
          <Chart>
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem
                type="pie"
                data={jobTitleChartData}
                field="value"
                categoryField="false"
                labels={{ visible: true, content: labelContent }}
              />
            </ChartSeries>
          </Chart>
        </ChartWrap>
        <ChartWrap title={"Employees by Gender"}>
          <Chart>
            <ChartSeries>
              <ChartSeriesItem
                spacing={0}
                gap={0}
                categoryField="category"
                data={genderChartData}
                color={(point: any) => {
                  return point?.category === "Male" ? "lightsteelblue" : "pink";
                }}
              />
            </ChartSeries>
            <ChartTooltip />
          </Chart>
        </ChartWrap>
      </div>
    </div>
  );
}

export default App;
