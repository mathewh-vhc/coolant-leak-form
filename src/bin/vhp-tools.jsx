export function MergeObject(obj={},start=false,mobj={},insert=false,copied=false){
  let tobj;
  if(!copied){tobj=JSON.parse(JSON.stringify(obj));}
  else{tobj=obj}

  for(let o in tobj){
	if(start){
	  if(o===start){start=false}
	  tobj[o]=tobj[o].constructor== Object?MergeObject(tobj[o],start,mobj,insert,true):tobj[o];
	}else{
	  if(tobj[o]!==undefined){
		if(mobj[o]!=undefined){
		  tobj[o] = mobj[o].constructor !== Object?mobj[o]:MergeObject(tobj[o],start,mobj[o],insert,true);
		}
	  }
	}
  }
  return tobj
}

export function FilterByText(e, searchKey, staticData) {
  	let newData = null;
  	//console.log("SEARCH TERM:", e.target.value)
  	if (e.target.value == "") {
		newData = null
  	} else {
		newData = []
	  	for (let obj in staticData) {
			//Search through the properties of each object
		  	for (let key in staticData[obj]) {
			  	if (key == searchKey || searchKey == undefined) {
					if (String(staticData[obj][key]).toLowerCase().includes(e.target.value.toLowerCase())) {
						newData.push(JSON.parse(JSON.stringify(staticData[obj]))) //Push clone of object to new array
					  	break;
				  	}
			  	}
		  	}
	  	}
  	}
  	return newData
}

/**
 * Filter a list using a start date and optional end date. If no end date is provided, uses the current date.
 * @param {event} e 
 * @param {string} searchKey | key used for searching data
 * @param {list} staticData | list of data
 * @param {string} startDate | start date for filter range
 * @param {string} endData | end date for filter range
 * @returns filtered list
 */
export function FilterByDate(e, searchKey, staticData, startDate, endDate=null) {
  	let newData = null;
  	//console.log("SEARCH TERM:", startDate, endDate)
  	if (e.target.value == "") {
	  	newData = null
  	} else {
	  	newData = []

	  	let StartDate = new Date(startDate)
	  	let EndDate = new Date(endDate)

	  	if (startDate) {
		  	for (let obj in staticData) {
				//Search through the properties of each object
				for (let key in staticData[obj]) {
					if (key == searchKey) {
						let ObjDate = new Date(staticData[obj][key])
						if (ObjDate != "Invalid Date") {
							if (ObjDate >= StartDate && (ObjDate <= EndDate || EndDate == "Invalid Date")) {
								newData.push(JSON.parse(JSON.stringify(staticData[obj]))) //Push clone of object to new array
								break;
							}
						}
					}
				}
			}
		}
  	}
  	return newData
}

/**
 * Generic function for setting the state of a single property value.
 * DO NOT MODIFY
 * @param {*} value | value passed in
 * @param {String} key | key in state being updated
 */
export function SetProperty(value, key) {
	this.setState({
		[key]:value
	})
}

/**
 * Sorts an array in order from earliest to latest date.
 * Credit to https://stackoverflow.com/revisions/47773035/1
 * @param {array} arr | unsorted array with objects containing .Date property
 * @returns 
 */
export function SortByDate(arr) {
	arr.sort(function(a,b){
	  return Number(new Date(a.Date)) - Number(new Date(b.Date));
	});
	var filtered = arr.filter(function (el) {
		return el != null;
	});
	return filtered.reverse()
}