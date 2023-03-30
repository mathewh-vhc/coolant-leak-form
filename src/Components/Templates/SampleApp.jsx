import React, { Component } from 'react';
import { MenuTabBar } from 'vhp-component-library';

/**
 * Starter class for an application. Contains a set of containers with a MenuBar allowing you to swap between tabs.
 * MenuBar style can be customized, and containers can be added to the Container to add pages to your app
 * Clone and modify this file whenever you want to create a new app that can sit inside App.js or the dock.
 */
export class SampleApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            active: true,
            Containers:[
                <div style={{top:"180px", position:"absolute"}}>Page 1</div>,
                <div style={{top:"180px", position:"absolute"}}>Page 2</div>,
                <div style={{top:"180px", position:"absolute"}}>Page 3</div>
            ],
            currentTab:0
        }
        
        this.SetTab = this.SetTab.bind(this)
    }
    
    /**
     * Changes the state of the menu's current tab
     * Each time you define a menu bar in a component, include this function
     * @param {Number} TabID 
     */
    SetTab(TabID){
        this.setState({
            currentTab:TabID
        })
    }

    render() {
        return(
            <>
                <MenuTabBar 
                    tabs = {["Page 1", "Page 2", "Page 3"]}
                    SetTab = {this.SetTab}
                    MenuStyle = "top-bar"
                />
                {this.state.Containers[this.state.currentTab]}
            </>
        );
    }
}