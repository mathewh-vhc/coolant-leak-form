import React, {Component} from 'react';
import { Card } from 'vhp-component-library';
import { CardTitlebar } from 'vhp-component-library';
import { CardContent } from 'vhp-component-library';
import { InputForm } from 'vhp-component-library';
import { FloatContainer } from 'vhp-component-library';
import { ActionRow } from 'vhp-component-library';

export class UserInfo extends Component{
	constructor(props){
		super(props);

        this.state = {
            interests: props.user.userInfo.interests,
            skills: props.user.userInfo.skills,
            birthday:props.user.userInfo.birthday,
            emoji:props.user.userInfo.emoji,
            confirmDialogueActive:false,
            logoutDialogueActive:false
        }

        //Create a copy of state so you can track changes
        this.savedState = {
            interests: props.user.userInfo.interests,
            skills: props.user.userInfo.skills,
            birthday:props.user.userInfo.birthday,
            emoji:props.user.userInfo.emoji,
            confirmDialogueActive:this.state.confirmDialogueActive,
            logoutDialogueActive:this.state.logoutDialogueActive
        }

        this.SetInterests = this.SetInterests.bind(this)
        this.SetSkills = this.SetSkills.bind(this)
        this.SetBirthday = this.SetBirthday.bind(this)
        this.SetEmoji = this.SetEmoji.bind(this)

        this.ConfirmSaveDialogue = this.ConfirmSaveDialogue.bind(this)
        this.CloseDialogue = this.CloseDialogue.bind(this)
        this.SaveAndClose = this.SaveAndClose.bind(this)
  	}

    /**
     * Input state setters 
     */
    SetInterests(Input) {this.setState({interests:Input})}

    SetSkills(Input) {this.setState({skills:Input})}

    SetBirthday(Input) {this.setState({birthday:Input})}

    SetEmoji(Input) {this.setState({emoji:Input})}

    /**
     * Dialogue box which confirms if the user wishes to save before running function
     */
    ConfirmSaveDialogue(data) {
        let StateChanged = false;
        for (let key in this.state) {
            if (this.state[key] != this.savedState[key]) {
                console.log("State changed at", this.state[key], this.savedState[key], key)
                StateChanged = true;
                break;
            }
        }

        //Open the dialogue
        if (StateChanged) {
            this.setState({
                [data.key]: true
            })
        } else {
            data.function()
        }
    }

    //Close the dialogue
    CloseDialogue(key) {this.setState({[key]: false})}

    /**
     * Save the user info, then close all dialogues
     */
    SaveAndClose() {
        let data = {
            interests: this.state.interests,
            skills: this.state.skills,
            birthday:this.state.birthday,
            emoji:this.state.emoji,
        }
        this.props.SetUserInfo(data);
    }

  	render(){
    	return(
       		<FloatContainer>
                <Card 
                    cardClass = "card" 
                    id="user-info-card" 
                    title = "User Information" 
                    titlebar = {true} 
                    actions = {{minimize: null, close:this.ConfirmSaveDialogue}}
                    data = {{minimize:null, close:{key: "confirmDialogueActive", function:this.props.ToggleUserForm}}}
                    >
                    <CardContent id = "user-card-content">
                        <CardContent id="basic-user-info">
                            <div id = "user-fullname">
                                {this.props.user.userInfo.firstname + ' ' + this.props.user.userInfo.lastname}
                            </div>
                            <div className="user-info-item">
                                <div id = "user-username">
                                    {this.props.user.userInfo.username}
                                </div>
                                <div style={{fontWeight: 600}}> - </div>
                                <div id = "user-usertitle">
                                    {this.props.user.userInfo.title}
                                </div>
                            </div>
                        </CardContent>
                        <CardContent id="job-info">
                            <CardTitlebar title = "Job Information" cardTitlebarClass = "job-card-title"/>
                            <CardContent id = "job-info-contents">
                                <InputForm
                                    formdata = {[
                                        {title:"Job Type: ", value:this.props.user.userInfo.jobtype},
                                        {title:"Department: ", value:this.props.user.userInfo.dept},
                                        {title:"Reports To: ", value:this.props.user.userInfo.reportto},
                                        {title:"Job Description: ", value:this.props.user.userInfo.jobdescr}
                                    ]}
                                />
                            </CardContent>
                        </CardContent>
                        <CardContent id="personal-info">
                            <CardTitlebar title = "Personal Information" cardTitlebarClass = "personal-card-title"/>
                            <CardContent id = "personal-info-contents">
                                <InputForm
                                    formdata = {[
                                        {   
                                            title:"Interests: ", 
                                            value:this.state.interests, 
                                            ChangeFunction:this.SetInterests, 
                                            inputClass: "user-info-form",
                                            inputType:"TextArea"
                                        },
                                        {   
                                            title:"Skills: ", 
                                            value:this.state.skills, 
                                            ChangeFunction:this.SetSkills, 
                                            inputClass: "user-info-form",
                                            inputType:"TextArea"
                                        },
                                        {   
                                            title:"Joined: ", 
                                            value:this.props.user.userInfo.joined,
                                            inputType:"static"
                                        },
                                        {   
                                            title:"Birthday: ", 
                                            value:this.state.birthday, 
                                            ChangeFunction:this.SetBirthday, 
                                            type:"date",
                                            inputType:"TextInput"
                                        },
                                        {   
                                            title:"Emoji: ", 
                                            value:this.state.emoji, 
                                            ChangeFunction:this.SetEmoji,
                                            inputType:"TextInput"
                                        }
                                    ]}
                                />
                            </CardContent>
                        </CardContent>
                        <ActionRow
                            data = {[
                                {
                                    text:"Logout",
                                    id:"user-logout",
                                    ClickFunction:this.ConfirmSaveDialogue,
                                    data:{
                                        key:"logoutDialogueActive",
                                        function:this.props.LogUserOut
                                    }
                                },
                                {
                                    text:"Save and Close",
                                    id:"user-info-save",
                                    ClickFunction:this.SaveAndClose
                                }
                            ]}
                        />
                    </CardContent>
                </Card>
                {this.state.confirmDialogueActive&&<Card cardClass="dialogue float" id="user-info-confirm-close" titlebar = {false}>
                    <div>Are you sure you want to close? You have unsaved changes!</div>
                    <ActionRow
                        data = {[
                            {
                                text:"Save and Close",
                                id:"close-dialogue-save",
                                ClickFunction:this.SaveAndClose
                            },
                            {
                                text:"Close without saving",
                                id:"close-dialogue-nosave",
                                ClickFunction:this.props.ToggleUserForm
                            },
                            {
                                text:"Go back",
                                id:"close-dialogue-back",
                                ClickFunction:this.CloseDialogue,
                                data:"confirmDialogueActive"
                            }
                        ]}
                    />
                </Card>}
                {this.state.logoutDialogueActive&&<Card cardClass="dialogue float" id="user-info-confirm-logout" titlebar = {false}>
                    <div>Are you sure you want to logout? You have unsaved changes!</div>
                    <ActionRow
                        data = {[
                            {
                                text:"Logout without saving",
                                id:"logout-dialogue-nosave",
                                ClickFunction:this.props.LogUserOut
                            },
                            {
                                text:"Go back",
                                id:"logout-dialogue-back",
                                ClickFunction:this.CloseDialogue,
                                data:"logoutDialogueActive"
                            }
                        ]}
                    />
                </Card>}
            </FloatContainer>
    	)
  	}
}