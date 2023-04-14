import React, { Component } from 'react';

import {Card, FloatContainer, CardContent, Image} from 'vhp-component-library'

import { SetProperty } from '../../bin/vhp-tools';
import './Styles/CoolantLeakForm.css'
import { AcknowledgementForm } from './Containers/AcknowledgementForm';
import { AuthorizationForm } from './Containers/AuthorizationForm';
import { Core } from 'vhp-api';

export class CoolantLeakForm extends Component {
    constructor(props) {
        super(props)

		this.state = {
			r22add:false,
			addRefrig:false,
			scheduleLeak:false,
			contactLater:false,
			comfortConsult:false,
			noAction:false,
			currentKey:"",
			technician:"",
			customerName:this.props.CustN||"",
			address:this.props.address||"",
			city:this.props.city||"",
			zip:this.props.zip||"",
			date:"",
			api:undefined
		}

		this.SetProperty = SetProperty.bind(this)
		this.ToggleR22 = this.ToggleR22.bind(this)
		this.ToggleAddRefrig = this.ToggleAddRefrig.bind(this)
		this.ToggleScheduleLeak = this.ToggleScheduleLeak.bind(this)
		this.ToggleContactLater = this.ToggleContactLater.bind(this)
		this.ToggleComfortConsult = this.ToggleComfortConsult.bind(this)
		this.ToggleNoAction = this.ToggleNoAction.bind(this)

		this.SubmitForm = this.SubmitForm.bind(this)
    }

	componentDidMount() {
		console.log("MOUNTED")
		if (this.props.dev == false) {
			this.setState({
				api:new Core({host:"http://192.168.0.58:5000/", auth:{user:"VOGCH", pswrd:"vogel123"}, sync:false, dev:{comments:true}})
			},()=>{
				console.log("ping")
				this.state.api.Ping().then(ping=>{
					console.log(ping, "from ping")
				})
			})
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentKey != this.state.currentKey) {
			this.setState({
				[prevState.currentKey]:false
			})
		}
	}

	ToggleR22(value) {this.setState({r22add:value})}
	ToggleAddRefrig(value) {this.setState({addRefrig:value, currentKey:"addRefrig"})}
	ToggleScheduleLeak(value) {this.setState({scheduleLeak:value, currentKey:"scheduleLeak"})}
	ToggleContactLater(value) {this.setState({contactLater:value, currentKey:"contactLater"})}
	ToggleComfortConsult(value) {this.setState({comfortConsult:value, currentKey:"comfortConsult"})}
	ToggleNoAction(value) {this.setState({noAction:value, currentKey:"noAction"})}

	SubmitForm() {
		console.log("Submitting!")
		//Get the image of the signature
		const canvas = document.getElementById('sig-box');
		const img = canvas.toDataURL('image/png');

		//Submit the form data
		let data = {
			r22add:this.state.r22add,
			addRefrig:this.state.addRefrig,
			scheduleLeak:this.state.scheduleLeak,
			contactLater:this.state.contactLater,
			comfortConsult:this.state.comfortConsult,
			noAction:this.state.noAction,
			technician:this.state.technician,
			customerName:this.state.customerName,
			address:this.state.address,
			city:this.state.city,
			zip:this.state.zip,
			date:this.state.date,
			signature:img
		}

		//Save to API
		//call this.state.api here
	}

	/*
	*/

    render() {
        return(
			<FloatContainer containerClass = "overlay">
				<div id = "print-title">
					<Image src = "https://www.vogelheating.com/images/logos/Logo.2205190834550.png" id = "vogel-logo"/>
					<div id = "print-title-header">Refrigerant Leak Notification</div>
				</div>
				<Card
					titlebar = {true}
					title = "Refrigerant Leak Notification Form"
					id = "refrig-form"
				>
					<CardContent cardContentClass = "flex-two-thirds">
						<AcknowledgementForm 
							ToggleAddRefrig={this.ToggleAddRefrig}
							ToggleScheduleLeak={this.ToggleScheduleLeak}
							ToggleContactLater={this.ToggleContactLater}
							ToggleComfortConsult={this.ToggleComfortConsult}
							ToggleNoAction={this.ToggleNoAction}
							ToggleR22={this.ToggleR22}
							{...this.state}
						/>
						<AuthorizationForm 
							SetProperty = {this.SetProperty}
							SubmitForm = {this.SubmitForm}
							{...this.state}
						/>
					</CardContent>
				</Card>
			</FloatContainer>
        );
    }
}