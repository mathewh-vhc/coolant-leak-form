import React, {Component} from 'react';
import { ImageButton } from 'vhp-component-library';

/* Tool Bar
    Holds descriptions and functionality for the App as well as the current task
*/

export class ToolBar extends Component{
  	constructor(props){
		super(props);
  	}

	render(){
		return(
		<>
			<div id='titlebar-cont' className='titlebar'>
			<div id='titlebar-cont-left'>
				<ImageButton 
					src = 'https://www.vhpportal.com/repo/assets/icons/V-Mark-red.png'
					ClickFunction = {this.props.ChangeApp}
					data = {0}
					id = 'titlebar-button-home'
					buttonClass = "titlebar-button-action"
				/>
				{this.props.toggleMore&&<div id='titlebar-moretools-quick'>
					<ImageButton 
						src = 'https://www.vhpportal.com/repo/assets/icons/menu-burger.png'
						ClickFunction = {this.props.ToggleMoreActions}
						id = 'titlebar-button-more'
						buttonClass = "titlebar-button-action"
					/>
					{this.props.MoreActions}
				</div>}
				{this.props.QuickActions}
			</div>
			<div id="titlebar-title"></div>
			<div id="titlebar-cont-right">
				{this.props.ToggleUserForm&&<ImageButton
					src="https://www.vhpportal.com/repo/assets/icons/user.png"
					id="user-form-button"
					ClickFunction = {this.props.ToggleUserForm}
					buttonClass = "titlebar-button-action"
				/>}
			</div>
			</div>
		</>
		)
	}
}
