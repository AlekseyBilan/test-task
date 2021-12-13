import React from "react";
import {
  Grid,
  GridColumn,
  GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { Employees } from "../App/types";

const initialSort: Array<SortDescriptor> = [{ field: "", dir: "asc" }];

const GridWrap = (props: { result: Employees }) => {
  const GenderCell = (props: any) => {
    return <td>{props.dataItem[props.field].slice(0, 1)}</td>;
  };
  const [sort, setSort] = React.useState(initialSort);

  return (
    <Grid
      style={{ height: "550px" }}
      data={orderBy(props.result, sort)}
      sortable={true}
      sort={sort}
      onSortChange={(e: GridSortChangeEvent) => {
        setSort(e.sort);
      }}
    >
      <GridColumn field="name" title="Name" />
      <GridColumn field="jobTitle" title="Job Title" />
      <GridColumn field="tenure" title="Tenure" />
      <GridColumn field="gender" title="Gender" cell={GenderCell} />
    </Grid>
  );
};

export default GridWrap;
