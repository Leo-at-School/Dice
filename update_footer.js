function pollForProcessingSketch(){ 
	var processingInstance = Processing.getInstanceById("diceCanvas");
  
	console.log("Polling...");
	
	if (processingInstance){
		var diceSum = processingInstance.getDiceSum();
		updateDiceSum();
	} else {
		setTimeout(pollForProcessingSketch, 100);
	}
}

function updateDiceSum(){
	console.log("Dice sum updating...");
	
	var processingInstance = Processing.getInstanceById("diceCanvas");
	var footerReference = document.getElementById("diceSum");
	var diceSum = processingInstance.getDiceSum();
	
	console.log(diceSum);
	footerReference.innerText = diceSum;
}

window.onload = pollForProcessingSketch();

var canvasReference = document.getElementById("diceCanvas");
canvasReference.addEventListener("click", updateDiceSum);
