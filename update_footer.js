var canvasReference = document.getElementById("diceCanvas");
var footerReference = document.getElementById("diceSum");

canvasReference.addEventListener("click", function(){
  console.log("HEY!");
  
  var processingInstance = Processing.getInstanceById("diceCanvas");
  var diceSum = processingInstance.diceSum;
  
  footerReference.innerText = diceSum;
});
