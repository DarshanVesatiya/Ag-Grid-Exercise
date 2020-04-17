import React, { Component } from "react";
import {
  EuiButtonEmpty,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiPopover,
} from "@elastic/eui";

export default class ElasticPagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      value: 50,
    };
  }

  onButtonClick = () => {
    this.setState({
      isPopoverOpen: true,
    });
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  changePage(key) {
    let { changePagination } = this.props;
    this.setState({
      value: key,
    });
    changePagination(key);
  }

  render() {
    const button = (
      <EuiButtonEmpty
        size="s"
        style={{color:'black'}}
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}
      >
        Rows per page: {this.state.value}
      </EuiButtonEmpty>
    );
    const items = [
      <EuiContextMenuItem
        key="2"
        icon="empty"
        onClick={() => {
          this.changePage(2);
        }}
      >
        2 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="5"
        icon="empty"
        onClick={() => {
          this.changePage(5);
        }}
      >
        5 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="10"
        icon="empty"
        onClick={() => {
          this.changePage(10);
        }}
      >
        10 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="20"
        icon="empty"
        onClick={() => {
          this.changePage(20);
        }}
      >
        20 rows
      </EuiContextMenuItem>,
      <EuiContextMenuItem
        key="50"
        icon="empty"
        onClick={() => {
          this.changePage(50);
        }}
      >
        50 rows
      </EuiContextMenuItem>,
    ];
    return (
      <div>
        <EuiPopover
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover}
          panelPaddingSize="none"
        >
          <EuiContextMenuPanel items={items} />
        </EuiPopover>
      </div>
    );
  }
}
