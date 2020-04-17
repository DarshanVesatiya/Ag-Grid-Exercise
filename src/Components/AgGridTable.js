import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import ElasticButton from "./ElasticButton";
import ElasticComboBox from "./ElasticComboBox";
import ElasticPopOver from "./ElasticPopOver";
import ElasticPagination from "./ElasticPagination";
import { EuiFlexGroup, EuiFlexItem, EuiSpacer, EuiFieldSearch } from "@elastic/eui";

export default class AgGridTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "ID", field: "id" },
        { headerName: "Name", field: "employee_name" },
        { headerName: "Salary", field: "employee_salary" },
        { headerName: "Age", field: "employee_age" },
        {
          headerName: "Tags",
          field: "tags",
          cellRendererFramework: () => {
            return <ElasticComboBox />;
          },
        },
        {
          headerName: "Actions",
          field: "actions",
          cellRendererFramework: ElasticButton,
          cellRendererParams: {
            refs: this,
            callRef: this.callBack,
          },
        },{
            headerName:"temp",
            field:"temp"
        }
      ],
      defaultColDef: {
        resizable: true,
        editable: true,
        sortable: true,
        filter:true
      },
      rowData: [],
      gridApi: "",
      gridColumnAPi: "",
    };
  }

  componentDidMount() {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then((res) => res.json())
      .then((rowData) => this.setState({ rowData: rowData.data }));
  }

  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
      gridColumnAPi: params.columnApi,
    });
  };

  onFilterTextBoxChanged = () => {
    let { gridApi } = this.state;
    gridApi.setQuickFilter(document.getElementById("filter-text-box").value);
  };

  callBack = (index) => {
    let { rowData, gridApi } = this.state;
    rowData.splice(index, 1);
    this.setState({
      rowData: rowData,
    });
    gridApi.setRowData(rowData);
  };

  hideOrShow = (field, val) => {
    console.log(field, val);
    const { gridColumnAPi } = this.state;
    gridColumnAPi.setColumnVisible(field, val);
  };

  changePage = (page) => {
    let { gridApi } = this.state;
    gridApi.paginationSetPageSize(page);
  };

  render() {
    return (
      <>
        <EuiFlexGroup justifyContent="spaceBetween">
          <EuiFlexItem grow={false}>
            <EuiFieldSearch
              type="text"
              id="filter-text-box"
              placeholder="Search in table"
              onInput={this.onFilterTextBoxChanged}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <ElasticPopOver
              column={this.state.columnDefs}
              hideOrShowField={this.hideOrShow}
              style={{ float: "right" }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer />
        <div
          className="ag-theme-alpine-dark"
          style={{
            height: "400px",
            width: "100%",
            float: "center",
          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
            pagination={true}
            paginationAutoPageSize={true}
          ></AgGridReact>
          <ElasticPagination changePagination={this.changePage} />
        </div>
      </>
    );
  }
}
