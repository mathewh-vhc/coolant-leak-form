import React, { Component } from 'react';
import {Card, CardContent, InputForm, BasicHeader, Checkbox, Paragraph} from 'vhp-component-library'
import { coolantform } from '../Data/CoolantLeakText';

export class AcknowledgementForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Card
				titlebar = {true}
				title = "Notification Acknowledgement"
				id = "refrig-form-info"
				cardClass = "form-card"
			>
				<CardContent cardContentClass="flex-half-n-half">
					<div id='form-info-main'>
						<BasicHeader text = "Your system is low on refrigerant." id = "refrigerant-header"/>
						<div className='paragraph-cont'>
							<b>These are some of the things you need to know. </b> 
							An air conditioning or heat pump system is totally sealed. You should never have to add 
							refrigerant unless you have a leak.
						</div>
						<Paragraph data = {coolantform.paragraphs[0]}/>
						<Paragraph data = {coolantform.paragraphs[1]}/>
						<Paragraph data = {coolantform.paragraphs[2]} id = "wide-paragraph"/>
						<CardContent>
							<InputForm 
								formdata = {[
									{
										inputType:"Checkbox",
										title:"Please add refrigerant to my system.",
										ClickFunction:this.props.ToggleAddRefrig,
										value:this.props.addRefrig,
										formItemClass:"choices-checkbox"
									},
									{
										inputType:"Checkbox",
										title:"Please schedule my leak search as soon as possible.",
										ClickFunction:this.props.ToggleScheduleLeak,
										value:this.props.scheduleLeak,
										formItemClass:"choices-checkbox"
									},
									{
										inputType:"Checkbox",
										title:"Please contact me later to schedule a leak search.",
										ClickFunction:this.props.ToggleContactLater,
										value:this.props.contactLater,
										formItemClass:"choices-checkbox"
									},
									{
										inputType:"Checkbox",
										title:"Please have a Comfort Consultant contact me regarding a new system.",
										ClickFunction:this.props.ToggleComfortConsult,
										value:this.props.comfortConsult,
										formItemClass:"choices-checkbox"
									},
									{
										inputType:"Checkbox",
										title:"No further action at this time, I will take my chances.",
										ClickFunction:this.props.ToggleNoAction,
										value:this.props.noAction,
										formItemClass:"choices-checkbox"
									}
								]}
							/>
						</CardContent>
					</div>
					<Card id = "special-considerations">
						<CardContent>
							<Paragraph data = {coolantform.paragraphs[3]} id = "side-card-paragraph"/>
							<div className='form-info-item' id = "r-22-check">
								<div className='form-info-title'>Add refrigerant to my system.</div>
								<Checkbox 
									value = {this.props.r22add}
									ClickFunction = {this.props.ToggleR22}
								/>
							</div>
						</CardContent>
					</Card>
				</CardContent>
			</Card>
        );
    }
}