import React, { Component } from 'react';
import { TechnicianInformation, CustomerInformation } from 'vhp-forms-library';
import { Card, CardContent, BasicHeader, TextButton, CanvasPad } from 'vhp-component-library';

export class AuthorizationForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
			<Card
				titlebar = {true}
				title = "Authorization"
				id = "refrig-form-actions"
				cardClass = "form-card"
			>
				<CardContent>
					<BasicHeader text = "Your Information" headerClass = "notif-card-header"/>
					<CustomerInformation 
						SetProperty = {this.props.SetProperty}
						customerName = {this.props.customerName}
						address = {this.props.address}
						city = {this.props.city}
						zip = {this.props.zip}
						date = {this.props.date}
					/>
				</CardContent>
				<CardContent>
					<BasicHeader text = "Technician Information" headerClass = "notif-card-header"/>
					<TechnicianInformation 
						technician = {this.props.technician}
						SetProperty = {this.props.SetProperty}
					/>
				</CardContent>
				<CardContent cardContentClass = "signature-cont">
					<BasicHeader text = "Your Signature" headerClass = "notif-card-header"/>
					<div id = "acknowledgement-text">
						By signing below, you acknowledge approval for the specified actions, and 
						acknowledge that simply adding refrigerant is not a system repair and 
						therefore carries no warranty.
					</div>
					<CanvasPad id = "sig-box"/>
					<TextButton 
						id = "submit-form"
						text = "Submit"
						ClickFunction = {this.props.SubmitForm}
					/>
				</CardContent>
			</Card>
        );
    }
}