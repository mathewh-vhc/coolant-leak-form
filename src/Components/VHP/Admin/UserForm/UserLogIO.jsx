import React, {Component} from 'react';
import { UserInfo } from './UserInfo';
import { LoginForm } from './LoginForm';

export class LogIO extends Component{
	constructor(props){
		super(props);
  	}

  	render(){
		if (this.props.user.loggedIn == true) {
			return (<UserInfo 
					user={this.props.user}
					ToggleUserForm = {this.props.ToggleUserForm}
					SetUserInfo = {this.props.SetUserInfo}
					LogUserOut = {this.props.LogUserOut}
				/>
			)
		} else {
			return( <LoginForm 
					user = {this.props.user}
					ValidateLogin = {this.props.ValidateLogin}
					LoginFailed = {this.props.LoginFailed}
				/>
			)
		}
  	}
}