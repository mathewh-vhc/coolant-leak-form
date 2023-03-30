import React, {Component} from 'react';
import { TextButton } from 'vhp-component-library'
import { Card } from 'vhp-component-library';
import { InputForm } from 'vhp-component-library'
import { CardContent } from 'vhp-component-library'
import { BasicHeader } from 'vhp-component-library';
import { Image } from 'vhp-component-library';
import { FloatContainer } from 'vhp-component-library';

export class LoginForm extends Component{
	constructor(props){
		super(props);

		this.state={
    		name:this.props.user.name,
      		pswrd:this.props.user.pswrd
    	}

		this.SetUsername = this.SetUsername.bind(this)
		this.SetPassword = this.SetPassword.bind(this)
  	}

	SetUsername(Input) {
		this.setState({
			name:Input
		})
	}

	SetPassword(Input) {
		this.setState({
			pswrd:Input
		})
	}

  	render(){
    	return(
			<FloatContainer containerClass = "overlay">
				<Card titlebar={true} title="VOGEL LOGIN" id = "login-box">
					<CardContent id="login-info">
						<Image 
							src="https://www.vhpportal.com/repo/assets/icons/V-Mark-red.png" 
							imageClass = "login-logo"
						/>
						<CardContent  id = "login-cont">
							<CardContent cardContentClass = "login-failed-cont">
								<div id = "login-failed-text" className={this.props.LoginFailed}>Username or password incorrect</div>
							</CardContent>
							<BasicHeader text="LOG IN" headerClass="login-title"/>
							<CardContent  id = "login-form">
								<InputForm 
									formdata = {[
										{
											value:this.state.name,
											title:'Username',
											inputType:"TextInput",
											ChangeFunction:this.SetUsername
										},
										{
											value:this.state.pswrd,
											title:'Password',
											inputType:"TextInput",
											ChangeFunction:this.SetPassword,
											type:'password'
										}
									]}
								/>
							</CardContent>
							
						</CardContent>
						<TextButton
							text="SUBMIT"
							buttonClass = "login-submit"
							ClickFunction = {this.props.ValidateLogin}
							data = {{name:this.state.name, password: this.state.pswrd}}
						/>
					</CardContent>
				</Card>
			</FloatContainer>
       		
    	)
  	}
}