import React, { useEffect, useState} from 'react';
import '@progress/kendo-theme-material/dist/all.css';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Popup } from "@progress/kendo-react-popup";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartLegend,
  ChartTooltip,
} from "@progress/kendo-react-charts";
import employees from "../../employees.json";
import './App.scss';
import "hammerjs";
import ChartWrap from '../ChartWrap/ChartWrap';
import AddEmployees from '../AddEmployees/AddEmployees';

function App() {
  
  const GenderCell = (props:any) => {
    return (
      <td>{props.dataItem[props.field].slice(0,1)}</td>
    )
  }

  const [result, setResult] = useState(employees);
  const dataAdded = (data:any) => {
    setResult((employees:any) => ([ ...employees, data ]));
    setShow(!show);
  }

  function getData (result:any) {
    let jobTitle = [{category: 'QA', value:0}, {category:'Developer', value:0}]; 
  
    function filterByJobTitle(item:any) {
      if (item.jobTitle === "QA") {
        jobTitle[0].value++
      } else if (item.jobTitle === "Developer") {
        jobTitle[1].value++
      }
    }
  
    result.forEach(filterByJobTitle)
  
    return jobTitle;
  }

  function getData2 (result:any) {
    let jobTitle = [{category: 'Male', value:0}, {category:'Female', value:0}]; 
  
    function filterByJobTitle(item:any) {
      if (item.gender === "Male") {
        jobTitle[0].value++
      } else if (item.gender === "Female") {
        jobTitle[1].value++
      }
    }
  
    result.forEach(filterByJobTitle)
  
    return jobTitle;
  }
  
  let jobTitleChartData = getData(result);
  let genderChartData = getData2(result);

  const labelContent = (props:any) => {
    return `${props.dataItem.category} ${props.dataItem.value}` ;
  }

  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const onClick = () => {
    setShow(!show);
  };

  return (
    <div className="App">
      <h1 className='title'>Corporate Empoloyees</h1>
    <button ref={btnRef} onClick={onClick} className="btn-add-employees">
          Add Employee
    </button>


      <Popup anchor={btnRef.current} show={show} popupClass={"popup-content"}>
        <AddEmployees onSubmit={dataAdded}></AddEmployees>
      </Popup>

      <Grid
        style={{height: "550px"}} 
        data={result}  
        sortable={true}
      >
        <GridColumn field="name" title="Name" />
        <GridColumn field="jobTitle" title="Job Title" />
        <GridColumn field="tenure" title="Tenure" />
        <GridColumn field="gender" title="Gender" cell={GenderCell} />
      </Grid>

      <ChartWrap title={"Employees by Job Title"}>
        <Chart>
          <ChartLegend position="bottom" />
          <ChartSeries>
            <ChartSeriesItem type="pie" data={jobTitleChartData} field="value" categoryField="false" labels={{ visible: true, content: labelContent }} />
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
              color= {(point:any) => { return point?.category === "Male" ? "lightsteelblue" : "pink" }}
            />
          </ChartSeries>
          <ChartTooltip/>
        </Chart>
      </ChartWrap>
    </div>
  );
}

export default App;
