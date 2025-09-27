var canvasReference = document.getElementById("diceCanvas");
var testGlobalVariable = "HELLO!";

//Related to updating the footer
var footerReference = document.getElementById("diceSum");
var processingInstance = Processing.getInstanceById("diceCanvas");
var diceSum = processingInstance.diceSum;

//Update footer when the canvas is clicked
canvasReference.addEventListener("click", function(){
  console.log(testGlobalVariable);
  
  processingInstance = Processing.getInstanceById("diceCanvas");
  diceSum = processingInstance.diceSum;
  
  footerReference.innerText = diceSum;
});
