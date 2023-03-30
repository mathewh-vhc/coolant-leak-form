import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Right now we have to import all of our styles this way
import './Components/Styles/ReactAppBase.css'
import './Components/Styles/App.css'
import './Components/Styles/Buttons.css'
import './Components/Styles/Cards.css'
import './Components/Styles/Containers.css'
import './Components/Styles/Dock.css'
import './Components/Styles/DropDowns.css'
import './Components/Styles/Forms.css'
import './Components/Styles/Headers.css'
import './Components/Styles/Images.css'
import './Components/Styles/Input.css'
import './Components/Styles/JSONObject.css'
import './Components/Styles/Sections.css'
import './Components/Styles/Tables.css'
import './Components/Styles/ViewControllers.css'
//AppBox CSS
import './Components/Styles/AppBox/AppBox.css'
import './Components/Styles/AppBox/LoginForm.css'
import './Components/Styles/AppBox/ToolBar.css'
import './Components/Styles/AppBox/UserForm.css'
import './Components/Styles/AppBox/UserLogIO.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
