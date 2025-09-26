funtion updateDiceSum(){
  //Reference to the footer where the dice sum is updated (Technically it references a <span> tag within the footer)
  const diceSumFooter = document.getElementById("diceSum");
  
  //Instance of the Java code (pde file)
  const canvasReference = Processing.getInstanceById("Dice");
  
  //Calls the getDiceSum method inside the Java code that reutrns the dice sum
  const diceSum = canvasReference.getDiceSum();

  //Update the footer
  diceSumFooter.innerText = diceSum;
}

updateDiceSum();
