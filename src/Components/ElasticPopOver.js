import React, { Component } from "react";
import { EuiPopover, EuiButtonToggle, EuiButtonIcon } from "@elastic/eui";

export default class ElasticPopOver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      field: [],
    };
  }

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  hideOrShow(fields) {
    let { hideOrShowField } = this.props;
    let arr = this.state.field;
    if (arr[0].hasOwnProperty(fields)) {
      let val = arr[0][fields];
      if (val === true) arr[0][fields] = false;
      else arr[0][fields] = true;
    }
    this.setState({
      field: arr,
    });
    hideOrShowField(fields, arr[0][fields]);
  }

  onButtonClick = () => {
    this.setState({
      isOpen: true,
    });
  };

  componentDidMount() {
    const { column } = this.props;
    let val = true;
    let obj = {};
    column.map((ele) => {
      obj[ele.field] = val;
    });
    this.setState({
      field: [obj],
    });
  }

  render() {
    const { column } = this.props;
    let arr = this.state.field;
    return (
      <div>
        <EuiPopover
          ownFocus
          button={
            <EuiButtonIcon
              iconType="gear"
              onClick={this.onButtonClick}
            ></EuiButtonIcon>
          }
          isOpen={this.state.isOpen}
          closePopover={this.closePopover}
        >
          {column.map((ele) => {
            let val = false;
            if (arr[0]) {
              val = arr[0][ele.field];
            }
            return (
              <div style={{ display: "flex" }}>
                <p>{ele.headerName}</p>
                <EuiButtonToggle
                  iconType={val ? "eye" : "eyeClosed"}
                  onChange={() => this.hideOrShow(ele.field)}
                  isSelected={this.state.isEye}
                  isEmpty
                  isIconOnly
                />
              </div>
            );
          })}
        </EuiPopover>
      </div>
    );
  }
}
