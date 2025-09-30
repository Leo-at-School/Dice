//Poll until the processing sketch has fully loaded. Prevents JavaScript from accessing functions before the processing sketch has fully loaded
function pollForProcessingSketch(){ 
	var processingInstance = Processing.getInstanceById("diceCanvas");
	
	console.log("Polling...");
	
	if (processingInstance){
		//Update the sum once both the HTML and processing sketch have loaded
		updateDiceSum();
		updateDiceDisplayed();
	} else {
		//Call the function again after a failed attempt to retrieve the instance of the processing sketch
		setTimeout(pollForProcessingSketch, 50);
	}
}

function updateDiceSum(){
	console.log("Dice sum updating...");
	
	var processingInstance = Processing.getInstanceById("diceCanvas");
	var footerReference = document.getElementById("diceSum");
	
	var diceSum = processingInstance.getDiceSum();
	
	//For debugging
	console.log(diceSum);
	
	//Update the dice sum footer
	footerReference.innerText = diceSum;
}

//Updates the amount of dice displayed on the canvas along with the new sum
function updateDiceDisplayed(){
	console.log("Dice displayed updating...");
	
	var processingInstance = Processing.getInstanceById("diceCanvas");
	var footerReference = document.getElementById("diceDisplayed");
	
	var diceSize = processingInstance.getDiceSize();
	var canvasWidth = processingInstance.getCanvasWidth();
	var canvasHeight = processingInstance.getCanvasHeight();
	
	var diceDisplayed = (canvasWidth/diceSize)*(canvasHeight/diceSize);
	
	//For debugging
	console.log(canvasWidth);
	console.log(canvasHeight);
	console.log(diceDisplayed);
	
	//Update the dice sum and displayed footers
	footerReference.innerText = diceDisplayed;
	updateDiceSum();
}

//Poll for processing sketch only once all the HTML has loaded
window.onload = pollForProcessingSketch();

//Listen for when the canvas has been clicked to then update the sum
var canvasReference = document.getElementById("diceCanvas");
canvasReference.addEventListener("click", updateDiceSum);

//Make a listener that updates when the up/down arrow keys are pressed while the canvas is selected
