import './App.css';

import {AppBox} from './Components/VHP/Admin/AppBoxRestruct';
import { CoolantLeakForm } from './Forms/CoolantLeak/CoolantLeakForm';


/**
 * All you give the AppBox is a basic set of settings - everything else (quick actions, etc) should only
 * be customized by your application itself. The AppBox works just as a basic container with a UserForm & login included
 */
var configdefault = {
	tb:{
		active:false
	},
	user:{
		active:false
	},
	dock:{
		active:false
	},
	settings:{
		dev:true
	}
}

function App() {
  	return (
		<div className = "App">
	  		<CoolantLeakForm dev = {true}/>
		</div>
  	);
}

export default App;