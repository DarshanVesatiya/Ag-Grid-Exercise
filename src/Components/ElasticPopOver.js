import React, { Component } from "react";
import {
  EuiPopover,
  EuiButtonToggle,
  EuiFlexGroup,
  EuiButtonIcon,
  EuiFlexItem,
} from "@elastic/eui";

export default class ElasticPopOver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      fields: [],
    };
  }

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  hideOrShow(field) {
    let { hideOrShowField } = this.props;
    let arr = this.state.fields;
    if (arr[0].hasOwnProperty(field)) {
      let val = arr[0][field];
      if (val === true) arr[0][field] = false;
      else arr[0][field] = true;
    }
    this.setState({
      field: arr,
    });
    hideOrShowField(field, arr[0][field]);
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
      fields: [obj],
    });
  }

  render() {
    const { column } = this.props;
    let arr = this.state.fields;
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
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiButtonToggle
                    iconType={val ? "eye" : "eyeClosed"}
                    onChange={() => this.hideOrShow(ele.field)}
                    isSelected={this.state.isEye}
                    isEmpty
                    isIconOnly
                  />
                </EuiFlexItem>
                <EuiFlexItem>
                  <h1>{ele.headerName}</h1>
                </EuiFlexItem>
              </EuiFlexGroup>
            );
          })}
        </EuiPopover>
      </div>
    );
  }
}
