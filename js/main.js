convert_day = 
[
"MO", //monday
"TU", //tuesday
"WE", //wednesday
"TH", //thursday
"FR", //friday
"SA", //saturday
"SU"  //sunday
]

function remove_picker(day){
	let hours_form = document.getElementById('openinghours_form');
	let hours_form_cloned = hours_form.cloneNode(true);
	
	let curr_day = document.getElementById('day' + day);
	
	if(curr_day.children.length>0){
		lastPick = curr_day.lastElementChild;
		curr_day.removeChild(lastPick)
	}
	
	console.log('LOG : Picker removed');
}

function add_picker(day){
	let hours_form = document.getElementById('openinghours_form');
	let hours_form_cloned = hours_form.cloneNode(true);
	
	let curr_day = document.getElementById('day' + day);
	
	curr_day.appendChild(hours_form_cloned);
	
	console.log('LOG : Picker added');
}

function get_data(){
	let counter = 0;
	for(var day in data_hours){
		let curr_days_hours = [];
		let picks = document.getElementById("day" + counter).children
		for(var i = 0;i<picks.length;i++){
			let curr_pick = picks[i];
			let opening_hour = curr_pick.children;
			
			let ind_pick = [opening_hour[0].value, opening_hour[1].value];			
						
			curr_days_hours.push(ind_pick);			
		}
		data_hours[day] = curr_days_hours;
		counter++;
	}
	return data_hours;
}

function show_output(){
	let output_box = document.getElementById('code_box');	
	let output = get_data();
	
	output_box.innerHTML = JSON.stringify(output, null, 2);
	copy_clipboard();
	init_array(data_hours);
}

function init_array(structure){
	
	for(var i = 0;i<=6; i++){
		var curr_day = convert_day[i];
		structure[curr_day] = [];
	}
}
/*
function copy_clipboard(){
	let copytext = document.getElementById('code_box').innerHTML;

	navigator.clipboard.writeText(copytext);
	

}*/
async function copy_clipboard() {
	
 let copytext = document.getElementById('code_box').innerHTML;
  try {
    await navigator.clipboard.writeText(copytext);
    console.log('Page URL copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

function copy_picker(curr_day){
	let prev_picks = document.getElementById("day" + (curr_day-1)).children;
	let curr_picks = document.getElementById("day" + curr_day).children;
	
	n_add_picks = prev_picks.length - curr_picks.length;

	for(var i = 0;i<n_add_picks;i++) add_picker(curr_day);
	
	for(var i = 0;i<prev_picks.length;i++){
		let curr_opening_hour = curr_picks[i].children;
		let prev_opening_hour = prev_picks[i].children;
		
		curr_opening_hour[0].value = prev_opening_hour[0].value;
		curr_opening_hour[1].value = prev_opening_hour[1].value;
	}
	
	console.log("copied");
	
		//todo copy the last picker
}
function reset_data(){
	/*
	let counter = 0;
	for(var day in data_hours){
		let picks = document.getElementById("day" + counter).children
		for(var i = 0;i<picks.length;i++){
			let opening_hour = picks[i].children;
			
			opening_hour[0].value = "00:00";
			opening_hour[1].value = "00:00";			
						
		}
		counter++;
	}
	*/
	location.reload();
}

var data_hours = {}

init_array(data_hours);