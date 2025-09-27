var canvasReference = document.getElementById("diceCanvas");
var footerReference = document.getElementById("diceSum");

canvasReference.addEventListener("click", function(){
  console.log("HEY!");
  
  const processingInstance = Processing.getInstanceById("diceCanvas");
  const diceSum = processingInstance.diceSum;
  
  footerReference.innerText = diceSum;
});
