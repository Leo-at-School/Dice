var previousProcessingInstanceData = [undefined, undefined];
var keydownFlag = false;

//Poll until the processing sketch has fully loaded. Prevents JavaScript from accessing instances of the processing sketch before the new sketch has fully loaded
function pollForProcessingSketch(){
	console.log("Polling..."); //For debugging
	
	let currentProcessingInstance = Processing.getInstanceById("diceCanvas"); //Get a new instance of 
	
	//Verify the instance exists
	if (currentProcessingInstance){
		let currentProcessingInstanceData = [currentProcessingInstance.getDiceSum(), currentProcessingInstance.getDiceSize()];
		let processingInstanceEquality = compareLists(previousProcessingInstanceData, currentProcessingInstanceData);
		
		//For debugging
		console.log(" - Previous canvas data: " + previousProcessingInstanceData);
		console.log(" - Current canvas data: " + currentProcessingInstanceData);
		console.log(" - Canvas data equality (should be false): " + processingInstanceEquality);
		
		//Verify the instances aren't the same instance
		if (!processingInstanceEquality){
			updateDiceSum(currentProcessingInstance);
			updateDiceDisplayed(currentProcessingInstance);
			
			//Disallows the now loaded sketch to be loaded again next function call
			previousProcessingInstanceData = currentProcessingInstanceData;
			
			console.log("");
			console.log("----------");
		} else {
			console.log(">Failed to load a new canvas instance, retrying...");
			setTimeout(pollForProcessingSketch, 50); //Poll until a new processing sketch loads
		}
	} else {
		console.log(">Canvas instance not found, retrying...");
		setTimeout(pollForProcessingSketch, 50); //Poll until the processing sketch exists
	}
	
	console.log("");
}

//Updates the span that displays the sum of all dice on the canvas
function updateDiceSum(processingInstance){
	let diceSumTableCell = document.getElementById("diceSumTableCell");
	let diceSum = processingInstance.getDiceSum();
	
	//For debugging
	console.log("Dice sum updating...");
	console.log(" - Dice sum: " + diceSum);
	
	//Update the dice sum span
	diceSumTableCell.innerText = diceSum;
}

//Updates the span that displays the amount of dice displayed on the canvas
function updateDiceDisplayed(processingInstance){
	let diceSizeTableCell = document.getElementById("diceSizeTableCell");
	let diceDisplayedTableCell = document.getElementById("diceDisplayedTableCell");
	
	//Dice and canvas data
	let diceSize = processingInstance.getDiceSize();
	let canvasWidth = processingInstance.getCanvasWidth();
	let canvasHeight = processingInstance.getCanvasHeight();
	let diceDisplayed = (canvasWidth/diceSize)*(canvasHeight/diceSize);
	
	//For debugging
	console.log("Dice displayed updating...");
	console.log(" - Canvas width: " + canvasWidth);
	console.log(" - Canvas height: " + canvasHeight);
	console.log(" - Dice size: " + diceSize);
	console.log(" - Total amount of dice: " + diceDisplayed);
	
	//Update the dice sum and displayed spans
	diceSizeTableCell.innerText = diceSize;
	diceDisplayedTableCell.innerText = diceDisplayed;
}

//Verify only either the up or down arrow were pressed
function verifyValidKeyPress(event){
	if ((event.key === "ArrowUp" || event.key === "ArrowDown") && !keydownFlag){ //keydownFlag allows only 1 call to te polling function per keydown
		pollForProcessingSketch();
		keydownFlag = true;
	}
}

//Resets the keydownFlag when the key is released so that the pollForProcessingSketch function can be called again by the verifyValidKeyPress function on the next keydown event
function resetKeydown(){
	keydownFlag = false;
}

//Compare the equality of each element of ordered lists
function compareLists(list1, list2){
	if (list1.length != list2.length){
		return false;
	}
	
	for (let i = 0; i < list1.length; i++){
		if (list1[i] != list2[i]){
			return false;
		}
	}
	
	return true;
}

//Poll for processing sketch once all the HTML has loaded
window.onload = pollForProcessingSketch;

var canvasReference = document.getElementById("diceCanvas");

//Update the sum and total amount of dice when the canvas is clicked/when the a key is pressed
canvasReference.addEventListener("click", pollForProcessingSketch);
canvasReference.addEventListener("keydown", verifyValidKeyPress);
canvasReference.addEventListener("keyup", resetKeydown);
