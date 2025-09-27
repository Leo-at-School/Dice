var canvasReference = document.getElementById("diceCanvas");
var footerReference = document.getElementById("diceSum");

canvasReference.addEventListener("click", function(){
  console.log("HEY!");
  
  footerReference.innerText = Math.random();
});
