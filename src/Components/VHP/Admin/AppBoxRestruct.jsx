import React, { Component } from 'react';
import { ToolBar } from './ToolBar';
import {LogIO} from './UserForm/UserLogIO';

import {MergeObject} from '../../../bin/vhp-tools';
import { DockApp } from '../../../DockApp';
import { Core } from 'vhp-api';

/**
 * A restructured AppBox, designed to give more flexibility and enable easier testing and development. Strips
 * the original AppBox down to its most essential functions and flags
 */
export class AppBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            config:{
				tb:{
					active:props.config.tb.active||false,
					QuickActions:[],
					MoreActions:[]
				},
				user:{
					active:props.config.user.active||false,
					name:'',
					pswrd:'',
					loggedIn:false,
					userInfo:{}
				},
                dock:{
                    active:props.config.dock.active||false,
                    apps:props.config.dock.apps||[]
                }
			},
            settings:{
                dev:props.config.settings.dev||false
            },
            currentApp:0,
            API:undefined,
            toggleMore:false
        }

        //API BINDS
        this.CreateCore = this.CreateCore.bind(this)

        //LOGIN BINDS
        this.DisplayUserLogIO = this.DisplayUserLogIO.bind(this);
        this.LogUserOut = this.LogUserOut.bind(this);
        this.SetUserInfo = this.SetUserInfo.bind(this);
        this.ToggleUserForm = this.ToggleUserForm.bind(this)
        this.ValidateLogin = this.ValidateLogin.bind(this);

        //TITLEBAR BINDS
        this.ToggleMoreActions = this.ToggleMoreActions.bind(this)

        //APPLICATION BINDS
        this.ChangeApp = this.ChangeApp.bind(this);
        this.DisplayDefaultApp = this.DisplayDefaultApp.bind(this);
    }

    ///////////STARTUP

    /**
     * On component mount, determine if the app is running in dev mode or not.
     * Dev mode disables the API and user settings
     */
    componentDidMount() {
        if (this.state.settings.dev == false) {
            //USER MODE SETUP\
            this.CreateCore(false)
        } else {
            //DEV MODE SETUP    
        }
    }

    CreateCore(autologin = false) {
        this.setState({
            API:new Core({dev:true})
        },()=>{
            if (autologin) {
                this.ValidateLogin({//validate passed config
                    name:this.state.config.user.name,
                    password:this.state.config.user.pswrd
                }, true);
            }
        })
    }

    ///////////USER LOG FUNCTIONS

    /**
	 * Deliver user login form component
	 * @returns Login-component
	 */
	DisplayUserLogIO(){
		if (this.state.config.user.active) {
			return (
				<LogIO
					user={this.state.config.user}
					userInfo = {this.state.userInfo}
					ValidateLogin={this.ValidateLogin}
					ToggleUserForm = {this.ToggleUserForm}
					SetUserInfo = {this.SetUserInfo}
					LogUserOut = {this.LogUserOut}
					LoginFailed = {this.state.LoginFailed}
				/>
			)
		} else {
			return (
				false
			)
		}
	}

	/**
	 * Takes the state provided by the UserInfo form and updates this.state.
	 * @param {Object} data | user info data to update
	 */
	SetUserInfo(data) {
		let retval = MergeObject(this.state, 'userInfo', data)
		this.setState(retval, () =>
    	this.ToggleUserForm());
	}

    /**
	 * Displays or hides the login form. We could likely combine this with ValidateLogin, as we would
	 * want the user info before displaying the form anyway
	 */
	ToggleUserForm() {
        console.log(this.state.config.user)
		this.setState(MergeObject(this.state,'user',{active:!this.state.config.user.active,loggedIn:true}))
	}

    /**
     * Logs a user out and recreates the API object when not in dev mode
     */
    LogUserOut(){
		this.setState(MergeObject(this.state,'user',{loggedIn:false, active:true}))
        if (this.state.settings.dev == false) {
            this.CreateCore(false)
        }
	}

	/**
	 * Validates whether a users credentials are correct
	 * @param {*} data | user object passed to function from input form
     * @param {Boolean} autologin | ???
	 */
	ValidateLogin(data, autologin=false) {
        if (this.state.settings.dev == true) {
            this.setState(MergeObject(this.state,'user',
                {active:false,loggedIn:true}
            ));
            return true
        }
		this.state.API.Login({
			user:data.name,
			pswrd:data.password
		}).then(
			answr=>{
                console.log("LOGIN:",answr)
				if(answr == true){// GOOD
					this.setState(MergeObject(this.state,'user',
                        {active:false,loggedIn:true, name:data.name, pswrd:data.password}
                    ));
					this.setState({
						LoginFailed:"false"
					})
					return true
				} else {
					if (!autologin) {
						this.setState({
							LoginFailed:"true"
						})
					}
				}
			}
		)
		return false
 	}

    ///////////TITLE BAR FUNCTIONS

    MapActions(actions) {
        let returnActions = []
		for (let action in actions) {
			returnActions.push(
				<ImageButton
					key = {actions[action].key}
					id = {actions[action].id}
					buttonClass = "titlebar-button-action"
					ClickFunction = {this.ToggleMore}
					data = {actions[action].ClickFunction}
					src = {actions[action].src}
					title = {actions[action].title}
				/>
			)
		}

		return returnActions
    }

    ToggleMoreActions() {
        console.log("toggling more actions")
        if (this.state.config.tb.active == true) {
            this.setState({toggleMore:!this.state.toggleMore})
        }
    }

    SetMoreActions(actions) {
        if (this.state.config.tb.active == true) {
            let newConfig = JSON.parse(JSON.stringify(this.state.config))
		    newConfig.tb.MoreActions = this.MapActions(actions)
		    this.setState({config:newConfig})
        }
    }

    SetQuickActions(actions) {
        if (this.state.config.tb.active == true) {
            let newConfig = JSON.parse(JSON.stringify(this.state.config))
		    newConfig.tb.QuickActions = this.MapActions(actions)
		    this.setState({config:newConfig})
        }
    }

    ///////////APPLICATION FUNCTIONS

    /**
	 * Opens a specified app
	 * @param {Number} appID | index of app to open
	 */
	ChangeApp(appID=0) {
        console.log("changing to", appID)
		this.setState({
			currentApp:appID
		})
	}

    /**
     * Determines conditions under which default app will render.
     * @returns default application to display
     */
    DisplayDefaultApp() {
        if (this.state.config.user.loggedIn == true || this.state.config.user.active == false) {
            return this.props.children
        }
    }

    render() {
        return(
            <>
                {this.state.config.tb.active&&
                    <ToolBar 
                        user = {this.state.config.user}
                        MoreActions = {this.state.config.tb.MoreActions}
                        QuickActions = {this.state.config.tb.QuickActions}
                        ToggleMoreActions = {this.ToggleMoreActions}
                        ToggleUserForm = {this.ToggleUserForm}
                        ChangeApp = {this.ChangeApp}
                        toggleMore = {this.state.toggleMore}
                    />
                }
                {this.state.config.user.active&&this.DisplayUserLogIO()}
                {this.state.config.dock.active&&
                    <DockApp
                        user = {this.state.config.user} 
                        ChangeApp = {this.ChangeApp} 
                        currentApp = {this.state.currentApp}
                        dev = {this.state.settings.dev}
                    />
                }
                {!this.state.config.dock.active&&this.DisplayDefaultApp()}
            </>
        )
  	}
}