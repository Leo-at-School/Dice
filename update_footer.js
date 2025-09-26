funtion updateDiceSum(){
  system.log("hello!!");
  //Reference to the footer where the dice sum is updated (Technically it references a <span> tag within the footer)
  var diceSumFooter = document.getElementById("diceSum");
  
  //Instance of the Java code (pde file)
  var canvasReference = Processing.getInstanceById("Dice");
  
  //Calls the getDiceSum method inside the Java code that reutrns the dice sum
  var diceSum = canvasReference.getDiceSum();
  
  system.log(diceSum);
  
  //Update the footer
  diceSumFooter.innerText = diceSum;
}

updateDiceSum();
