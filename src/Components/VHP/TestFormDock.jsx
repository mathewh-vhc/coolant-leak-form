import React, { Component } from 'react';
import { AppContainer, CardContent, Card, Paragraph, TextButton } from 'vhp-component-library';

export class TestFormDock extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <AppContainer>
				<CardContent id = "test-dock-cont">
					<Card
						titlebar = {true}
						title = "Available Forms"
						id = "dock-card-forms"
					>
						<div className='dock-form-card'>
							<Paragraph 
								data = {{
									heading:"Spiral Duct Order Form",
									paragraph:["A form for inputting spiral duct orders."]
								}}
							/>
							<div className='dock-form-card-controls'>
								<TextButton 
									text = "Open Form"
								/>
							</div>
						</div>
						<div className='dock-form-card'>
							<Paragraph 
								data = {{
									heading:"",
									paragraph:["A form for inputting spiral duct orders."]
								}}
							/>
							<div className='dock-form-card-controls'>
								<TextButton 
									text = "Open Form"
								/>
							</div>
						</div>
					</Card>
				</CardContent>
			</AppContainer>
        );
    }
}