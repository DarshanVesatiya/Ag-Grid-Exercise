import React, { Component } from "react";
import {
  EuiComboBox,
  EuiModal,
  EuiModalBody,
  EuiOverlayMask,
  EuiButtonIcon,
} from "@elastic/eui";

export default class ElasticComboBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [
        {
          label: "Titan",
          "data-test-subj": "titanOption",
        },
        {
          label: "Enceladus",
        },
        {
          label: "Mimas",
        },
        {
          label: "Dione",
        },
        {
          label: "Iapetus",
        },
        {
          label: "Phoebe",
        },
        {
          label: "Rhea",
        },
        {
          label:
            "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
        },
        {
          label: "Tethys",
        },
        {
          label: "Hyperion",
        },
      ],
      selectedOptions: [],
      setSelected: [],
      isModalVisible: false,
      setModalVisible: false,
    };
  }

  closeModal = () => {
    this.setState({
      setModalVisible: false,
    });
  };

  showModal = () => {
    this.setState({
      setModalVisible: true,
    });
  };

  onChange = (selectedOptions) => {
    this.setState({
      setSelected: selectedOptions,
    });
  };

  onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    let normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.

    if (
      flattenedOptions.findIndex(
        (option) => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      this.setState({
        options: [...this.state.options, newOption],
      });
    }

    // Select the option.
    this.setState({
      setSelected: [...this.state.selectedOptions, newOption],
    });
  };

  componentDidMount() {
    let { options } = this.state;
    this.setState({
      selectedOptions: [options[2], options[4]],
      setSelected: [options[2], options[4]],
    });
  }

  render() {
    const comboBox = (
      <div>
        <EuiComboBox
          options={this.state.options}
          selectedOptions={this.state.selectedOptions}
          onChange={this.onChange}
          onCreateOption={this.onCreateOption}
        ></EuiComboBox>
      </div>
    );

    let modal;
    if (this.state.setModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeModal} style={{ width: "800px" }}>
            <EuiModalBody>{comboBox}</EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      );
    }
    return (
      <div>
        {comboBox}
        <EuiButtonIcon iconType="pen" onClick={this.showModal}></EuiButtonIcon>
        {modal}
      </div>
    );
  }
}
