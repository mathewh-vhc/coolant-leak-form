import React, { Component } from 'react';
import { DropNote } from './DropNote';

export class DropNoteContainer extends Component {
    constructor(props) {
        super(props);
        /**
         * Declare global state variables for access across components here.
         */
        this.state = {
            DropNoteProps:{
                showNote: false,
                text: '',
                level: 'yellow',
                timeout: 0
            }
        }
        /**
         * Bind functions here for access in child components.
         */
        this.UpdateDropNote = this.UpdateDropNote.bind(this)
        this.CloseNote = this.CloseNote.bind(this);
    };

    /////////DROP NOTE FUNCTIONS/////////////////
    /**
     * Closes a note by modifying its showNote and timeout state.
     */
    CloseNote(){
        this.setState(state => ({
            DropNoteProps:{
                showNote:false,
                timeout:0
            }
        }));
    }

    /**
     * Updates a notes state using the provided values
     */
    UpdateDropNote(level="yellow", text, timer=null) {
        this.setState({
            DropNoteProps:{
                showNote:true,
                text:text,
                timeout:timer,
                level:level
            }
        });
    }
    /////////////END FUNCTIONS///////////////////

    ////////////////RENDER///////////////////////
    render() {
        return(
            <div className = "container" id = "drop-note-container">
                <DropNote 
                    text = {this.state.DropNoteProps.text}
                    level = {this.state.DropNoteProps.level}
                    timeout = {this.state.DropNoteProps.timeout}
                    showNote = {this.state.DropNoteProps.showNote}
                    CloseNote = {this.CloseNote}
                />
            </div>
        )
    }
}