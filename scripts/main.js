var colourbuttonelements;
var picker;
var savetimeout;

var times = ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"]

function colourPick(e){ //to open the colour picker
	e.target.appendChild(picker); //move the picker to the target
	picker.style = "display: flex;"; //make it show (cuz it's hidden at first)
	document.getElementsByClassName("colourpickerbutton")[0].focus(); //pull focus to the first button
};

function setColour(number){ //sets the colour of the cell when button is pressed
	var cell = picker.closest('.cell'); //find the nearest cell relative to the picker
	if(cell){ //in case it's null (happens when the picker hasn't been opened yet)
		cell.style = "background-color: var(--timetable-" + number + "-desat);"; //set the colour
		console.log("background-color: var(--timetable-" + number + "-desat);")
	};
};


window.onload = function(){
	var timetable = document.getElementById("timetable")
	for (var i = 0; i < times.length; i++) {
		const row = document.createElement("div");
		row.classList.add("row")
		row.id = "row" + (i + 1)
		row.innerHTML = `<div class="cell timecell"><div>` + times[i] + `</div></div>
				<div class="cell mon">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>
				</div>
				<div class="cell tue">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>
				</div>
				<div class="cell wed">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>
				</div>
				<div class="cell thu">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>
				</div>
				<div class="cell fri">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>
				</div>
				<div class="cell sat">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>
				</div>
				<div class="cell sun">
					<div class="textbox" contenteditable="true"></div>
					<div class="colourbutton" contenteditable="false"><div class="coloursquare"></div></div>`
		timetable.appendChild(row)
	}

	var cells = document.querySelectorAll("[contenteditable=true]");
	colourbuttonelements = document.getElementsByClassName("coloursquare");
	picker = document.getElementById("colourpicker");
	
	for (var i = 0; i < colourbuttonelements.length; i++) {
		colourbuttonelements[i].addEventListener('click', function(e) {
			if(e.target.classList.contains("coloursquare")) { //prevent bubbling
				colourPick(e); //open the picker
			};
		});
	};

	document.addEventListener("keydown", function(e) {
		if (e.key === "Enter") {
			var currentindex = Array.prototype.indexOf.call(cells, e.target); //index of the current cell in the cell array

			if (currentindex != cells.length - 1){cells[currentindex + 1].focus()} //if the cell isn't the last one, move to the next cell
			else{cells[0].focus()}; //otherwise go back to the start
			e.preventDefault();
		}
		
		var numberregex = /[12345678]/;
		var letterregex = /^[roygbivp]$/;
		var numbers = {r:1,o:2,y:3,g:4,b:5,i:6,v:7,p:8};

		if(numberregex.test(e.key)){ //basically just testing for 1, 2, 3, 4, 5, 6, 7, 8, r, o, y, g, b, i, v, p as shortcuts for setting the colour
			setColour(e.key);
		};
		if(letterregex.test(e.key)){
			setColour(numbers[e.key]);
		};
	});

	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('keyup', function (e) {
			clearTimeout(savetimeout); //clear the timeout, so it doesn't trigger before 1 second has elapsed after the last keyup

			savetimeout = setTimeout(function () {
				console.log('Saved');
			}, 1000); 
		});
	};
};