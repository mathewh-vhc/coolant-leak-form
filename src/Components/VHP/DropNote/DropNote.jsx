import React, { Component } from 'react';

/**
 * Drop Note component class which supports custom levels and a timeout function
 */
export class DropNote extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * On component update, set the timer.
     */
    componentDidUpdate() {
        if (this.props.timeout != 0 && this.props.timeout != undefined) {
            this.timer = setTimeout(() => this.props.CloseNote(), this.props.timeout);
        }
    }

    /**
     * On component unmount, remove the timer
     */
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    /**
     * Conditional render to allow DropNote to be hidden
     * @returns render object
     */
    render() {
        if (this.props.showNote == false) {
            return null
        } else {
            return(
                <>
                    <div className = "drop-note" id = {this.props.level}>
                        {this.props.text}
                        <div onClick = {this.props.CloseNote} className = "drop-note-close">X</div>
                    </div>
                </>
            );
        }
        
    }
}