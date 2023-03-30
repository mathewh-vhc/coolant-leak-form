import React, { Component } from 'react';
import { TextButton } from 'vhp-component-library';

class Dock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='dock'>
                <TextButton
                    text="Open Application"
                    id="spiff-app-open"
                    buttonClass="dock-app-button"
                    ClickFunction = {this.props.ChangeApp}
                    data={1}
                />
            </div>
        )
    }
}

/**
 * Dock app class
 * @todo | define a way to dynamically load a dock based on the user settings
 * @todo | create custom feed style components that serve a user relevant info based on their role and daily work
 * @todo | test buttons linking out to components in current or new window
 * @todo | test home returning to feed application
 */
export class DockApp extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.user)
        this.state = {
            active: true,
            Apps:[
				<div>Application!</div>,
            ]
        }
        
        this.DisplayApp = this.DisplayApp.bind(this)
    }
    /* Testing for api
    componentDidMount() {
        console.log("Dock Mount")
        let core = new Core({    auth:{user:'',pswrd:''},    dev:true});
        let core1 = new Core({    auth:{user:'',pswrd:''},    dev:true});
        let core2 = new Core({    auth:{user:'',pswrd:''},    dev:true});
        core.Ping(true).then(ansr=>console.log('Ping core> ',ansr));
        core.Login({user:'VOGCH',pswrd:'vogel123'}).then(ansr=>{console.log('Login >',ansr)});
        core1.Ping(true).then(ansr=>console.log('Ping core1> ',ansr));
        core2.Ping(true).then(ansr=>console.log('Ping core2> ',ansr));
    }*/

    DisplayApp() {
        if (this.props.currentApp == 0) {
            return(<Dock ChangeApp = {this.props.ChangeApp}/>)
        } else {
            return(this.state.Apps[this.props.currentApp - 1])
        }
    }

    render() {
        return(
            <>
                {this.DisplayApp()}
            </>  
        );
    }
}