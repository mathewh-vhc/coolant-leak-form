import React, {Component} from 'react';

import {LogIO} from './UserForm/UserLogIO';
import {ToolBar} from './ToolBar';
import { UserData } from '../../../Data/UserData'

import {MergeObject} from '../../../bin/vhp-tools';
import { Core } from 'vhp-api';

/* APP BOX

  The App Box can supply every Compont / functionality used by every / most / some
  apps. It is included as an extension of an App.

  TODO:
  <ToolBar/>
  <UserView/> (log in/out/settings)
  <DropNote/>
  <
*/
/* VHP APP
  Will be the extension for every app created. In it will be options for the app
  to use as well as be the controller.
*/
export class VHPapp extends Component{
	constructor(props){
    	super(props);
    	//tools to seperate the state from App's
    	//things in the tool box are public to the rest of the App
		//TODO: Remove duplicate state, either in Tool Bar or here
  		this.state = {
			config:{
				tb:{
					active:true,
					qacts:props.config.tb.qacts||{},
					macts:props.config.tb.macts||{}
				},
				user:{
					active:true,
					name:'',
					pswrd:'',
					loggedIn:false,
					userInfo:UserData
				}
			},
			settings:{

			},
			currentApp:0,
			LoginFailed:false,
			API:undefined
		}

    	this.ValidateLogin = this.ValidateLogin.bind(this)
		this.ToggleUserForm = this.ToggleUserForm.bind(this)
		this.SetUserInfo = this.SetUserInfo.bind(this)
		this.LogUserOut = this.LogUserOut.bind(this)
		this.ChangeApp = this.ChangeApp.bind(this)
		this.GetApps = this.GetApps.bind(this)

		this.API = undefined
	}

	componentDidUpdate(prevState) {
		
	}

	componentDidMount(){
		this.setState({
			API:new Core({dev:{comments:true}})
		},()=>{
			console.log(this.state.API.auth)
			this.state.API.Ping(true).then(answr=>console.log(answr))
			let loginValidated = false;
			if (localStorage.getItem("username") != "") {
				loginValidated = this.ValidateLogin({//validate passed config
					name:localStorage.getItem("username"),
					password:localStorage.getItem("password")
				}, true);
			}
			if (!loginValidated) {
				this.ValidateLogin({//validate passed config
					name:this.state.config.user.name,
					password:this.state.config.user.pswrd
				}, true);
			}
		})
		//this.API = new VAPI({user:"", pswrd:""})
	}

	/**
	 * Returns a list of allowed apps based on the user's allowed applications.
	 * TODO: A way to get a list of all apps outside this file, and search by AppName
	 * Ideally, we'll simply move to links and have no need to worry about dynamically
	 * loading components in.
	 */
	GetApps() {
		return([
			{
				text:"App Name",
				component:<div>This is an app!</div>,
				id:"sample-app-dock-app"
			}
		])
	}

	/**
	 * Opens a specified app
	 * @param {Number} appID | index of app to open
	 */
	ChangeApp(appID) {
		this.setState({
			currentApp:appID
		})
	}

	/**
	 * Deliver tool bar using provided configuration
	 * @returns Tool Bar Component
	 */
	toolBar() {
		return (
			<ToolBar
				{...this.props.config.tb}
				user = {this.state.config.user}
				ToggleUserForm = {this.ToggleUserForm}
				ChangeApp = {this.ChangeApp}
			/>
		)
	}

	/**
	 * Deliver user login form component
	 * @returns Login-component
	 */
	userLogIO(){
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

	LogUserOut(){
		this.setState(MergeObject(this.state,'user',{loggedIn:false, active:true}))
		localStorage.setItem("username", "");
		localStorage.setItem("password", "")
	}

	/**
	 * Takes the state provided by the UserInfo form and updates this.state.
	 * TODO: Add user info to this.state user object
	 * @param {UserInfo} data
	 */
	SetUserInfo(data) {
		let retval = MergeObject(this.state, 'userInfo', data)
		this.setState(retval, () =>
    	this.ToggleUserForm());
	}

	/**
	 * Validates whether a users credentials are correct
	 * TODO: State for login failing - instead of true/false, could have multiple states and add a listener
	 * in order to notify the user if their credentials are incorrect. Could also do separate state entirel
	 * @param {*} data : data passed to function
	 */
	ValidateLogin(data, autologin=false) {
		this.state.API.Login({
			user:data.name,
			pswrd:data.password
		}).then(
			answr=>{
				console.log("ANSWER", answr)
				if(answr.success == true){// GOOD
					this.setState(MergeObject(this.state,'user',{active:false,loggedIn:true, name:data.name, pswrd:data.password}));//update config
					//can send back user information as well
					console.log("LLOGIN SUCCEEEDED")
					this.setState({
						LoginFailed:false
					})
					return true
				} else {
					console.log("LLOGIN FAILEED")
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

	/**
	 * Displays or hides the login form. We could likely combine this with ValidateLogin, as we would
	 * want the user info before displaying the form anyway
	 */
	ToggleUserForm() {
		this.setState(MergeObject(this.state,'user',{active:!this.state.config.user.active,loggedIn:true}))
	}


  	/**
	 * Deliver the tool bar
	 * @returns Toolbar component
	 */
  	deliverTools(){
    	return(
      		<>
        		{this.state.config.tb.active&&this.toolBar()}
      		</>
    	)
  	}
}
