import React, { Component } from 'react'
import {
    EuiButtonIcon,
} from '@elastic/eui';
  
export default class ElasticButton extends Component {
    
    delete = () =>{
        let { node, callRef } = this.props
        callRef(node.id)
    }

    render() {
        return (
            <>
            <EuiButtonIcon iconType="eye" />
            <EuiButtonIcon iconType="pencil" />
            <EuiButtonIcon iconType="trash" onClick={this.delete} />
            </>
        )
    }
}
