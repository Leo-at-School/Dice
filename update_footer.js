window.onload = function(){
  var processingInstance = Processing.getInstanceById("diceCanvas");

  if (processingInstance){
    var canvasReference = document.getElementById("diceCanvas");
    
    var testVariable = "HELLO!";
    console.log(testVariable);
    
    //Related to updating the footer
    var footerReference = document.getElementById("diceSum");
    var diceSum = processingInstance.getDiceSum();
    console.log(diceSum);
  } else {
    console.log("Something is wrong...");
  }




  
  //Update footer when the canvas is clicked
  //canvasReference.addEventListener("click", function(){
  //  console.log(testGlobalVariable);
  //  
  //  processingInstance = Processing.getInstanceById("diceCanvas");
  //  diceSum = processingInstance.diceSum;
  //  
  //  footerReference.innerText = diceSum;
  //});
};
