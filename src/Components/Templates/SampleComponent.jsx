import React, { Component } from 'react';

export class SampleComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: true
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * Click event handler
     * Can optionally pass data using props.data
     */
    handleClick(e){
        console.log("Click!")
        this.props.ClickFunction(this.props.data)
    }

    /**
     * Change event handler
     * Can optionally pass data using props.data
     */
    handleChange(e){
        console.log("Change!")
        this.props.ChangeFunction(this.props.data)
    }

    render() {
        return(
            <div>
                
            </div>
        );
    }
}