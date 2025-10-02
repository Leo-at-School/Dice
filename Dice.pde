int[] diceSizeArray = {1, 2, 4, 5, 8, 10, 25, 40, 50, 100, 200}; //Common facotrs of 800 and 1000
int diceSizeCurrent = 8; //Index of dieSizeArray
int diceSize;
int diceSum;

boolean keydownFlag = false; //Flag to allow only 1 exxecution per key press

void setup(){
  noLoop();
  
  size(1000, 800);
  background(0, 0, 100);
}

void draw(){
  diceSize = diceSizeArray[diceSizeCurrent];
  int roll;
  diceSum = 0;
  
  //Iterate through the possible coordinates for differente dice
  for (int dieY = 0; dieY < height; dieY += diceSize){
    for (int dieX = 0; dieX < width; dieX += diceSize){
      roll = (int)(Math.random()*6) + 1;
      DrawDie die = new DrawDie(dieX, dieY, diceSize, roll);
      
      diceSum += roll;
      die.drawDie();
    }
  }
}

void mousePressed(){
   redraw();
}

void keyPressed(){
  if ((key == CODED) && !keydownFlag){ //Arrow keys are special and are considered CODED and therefore need their own if statements
    if (keyCode == UP){
     diceSizeCurrent = min(diceSizeCurrent + 1, diceSizeArray.length - 1);
     redraw();
    } else if (keyCode == DOWN){
     diceSizeCurrent = max(diceSizeCurrent - 1, 1);
     redraw();
    }
  }
  
  keydownFlag = true;
}

//Prevents code in keyPressed from executing over and over while the key is held down
void keyReleased(){
  if (key == CODED){ //Arrow keys are special and are considered CODED ad therefore need their own if statements
    if (keyCode == UP || keyCode == DOWN){
      keydownFlag = false;
    }
  }
}

protected class DrawDie{
  //Arrays of coordinates of each position a dot will lie relative to the die
  private int[][] cornerCoordinates = new int[4][2];
  private int[][] edgeCoordinates = new int[2][2];
  private int[] centerCoordinate = new int[2];
  
  private int x, y; //Die position
  private int size, dotRadius; //Die scale
  private int number; //Die state
  
  protected DrawDie(int dieX, int dieY, int dieSize, int dieNumber){
    x = dieX;
    y = dieY;
    size = dieSize;
    number = dieNumber;
    dotRadius = size/6;
    
    //Create temporary arrays defined in the scope of the constructor to update the instance arrays that are in the scope of the entire class
    int[][] tempCornerCoordinates = {{x + size - dotRadius, y + dotRadius}, {x + dotRadius, y + size - dotRadius}, {x + dotRadius, y + dotRadius}, {x + size - dotRadius, y + size - dotRadius}};
    int[][] tempEdgeCoordinates = {{x + dotRadius, y + size/2}, {x + size - dotRadius, y + size/2}};
    int[] tempCenterCoordinate = {x + size/2, y + size/2};
    
    cornerCoordinates = tempCornerCoordinates;
    edgeCoordinates = tempEdgeCoordinates;
    centerCoordinate = tempCenterCoordinate;
  }
  
  //Draw corners dots (1: top right, 2: bottom left, 3: top left, 4: bottom right)
  private void drawCorners(int numberOfCorners){
    for (int index = 0; index < numberOfCorners; index ++){
      ellipse(cornerCoordinates[index][0], cornerCoordinates[index][1], dotRadius, dotRadius);
    }
  }
  
  //Draw corners dots (1: left, 2: right)
  private void drawEdges(int numberOfEdges){
    for (int index = 0; index < numberOfEdges; index++){
      ellipse(edgeCoordinates[index][0], edgeCoordinates[index][1], dotRadius, dotRadius);
    }
  }
  
  //Draw center dot
  private void drawCenter(){
    ellipse(centerCoordinate[0], centerCoordinate[1], dotRadius, dotRadius);
  }
  
  //More readable
  private void drawNumberVersion1(){
    fill(0, 0, 0);
    
    switch (number){
      case 1:
        drawCenter();
        break;
        
      case 2:
        drawCorners(2);
        break;
        
      case 3:
        drawCenter();
        drawCorners(2);
        break;
        
      case 4:
        drawCorners(4);
        break;
        
      case 5:
        drawCenter();
        drawCorners(4);
        break;
        
      case 6:
        drawCorners(4);
        drawEdges(2);
        break;
    }
  }
  
  //More concise
  private void drawNumberVersion2(){
    fill(0, 0, 0);
    
    if (number%2 == 1){
      drawCenter();
      number -= 1;
    }
    
    drawCorners(Math.min(4, number));
    
    drawEdges(number - 4);
  }
  
  protected void drawDie(){
    fill(255, 255, 255);
    rect(x, y, size, size);
    //drawNumberVersion1();
    drawNumberVersion2();
  }
}

//For JavaScript to access the value of diceSum and diceSize
int getDiceSum(){
  return diceSum;
}

int getDiceSize(){
  return diceSize;
}

int getCanvasWidth(){
  return width;
}

int getCanvasHeight(){
  return height;
}
