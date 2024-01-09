// Class to represent the pattern data model:
// internally, it is stored as an array of arrays, with some helper variables.
//
// The knitting pattern knits as such:
//  
//  Row 0: k p k p
//  Row 1: p p p p 
//  Row 2: k k k k 

const stitches = {
  knit: 0,      // k
  purl: 1,      // p
  decrease: 2,  // d
  increase: 3   // i
}

function toLetter(stitch){
  switch(stitch){
    case 0:
      return "k";
    case 1:
      return "p";
    case 2:
      return "d";
    case 3:
      return "i";
  }
}

class Pattern{
  // class to host the knit pattern
  stitchesPerRow = null
  rows = null
  // this.pattern is an array of arrays. Noticeably, each array element of this.pattern represents a row of knitting
  pattern = [];
  currentRow = 0;

  constructor(rows, stitchesPerRow){
    this.rows = rows;
    this.stitchesPerRow = stitchesPerRow;
    for(let i = 0; i < rows; i++){
      this.pattern[i] = [];
    }
  }

  Knit(){
    // check if the current row is full
    if(this.pattern[this.currentRow].length == this.stitchesPerRow ){
      console.log("you've reached the end of a row!");
    }
    else{
      this.pattern[this.currentRow].push(stitches.knit);
    }
  }

  Purl(){
    // check if the current row is full
    if(this.pattern[this.currentRow].length == this.stitchesPerRow ){
      console.log("you've reached the end of a row!");
    }
    else{
      this.pattern[this.currentRow].push(stitches.purl);
    }
  }

  IncreaseRow(){ 
    if(this.currentRow === this.rows - 1){
      console.log("you've reached the end of the pattern!");
    }
    else{
      this.currentRow += 1; 
    }
  }

  asString(){
    // the reason js developers prefer to print an asString method is so that you cannot use \n within a console.log()
    // call
    let outputString = "";
    for(let row = 0; row <= this.currentRow; row++){
      for(let column = 0; column < this.stitchesPerRow; column++){
        if(column == 0){
          outputString += `Row ${row} |`;
        }
        outputString += " " + this.pattern[row][column];
      }
      outputString += "\n";
    }
    return outputString;
  }

  asReverseString(){
    let outputString = "";
    for(let row = this.currentRow; row >= 0; row--){
      for(let column = 0; column < this.stitchesPerRow; column++){
        if(column == 0){
          outputString += `Row ${row} |`;
        }
        outputString += " " + toLetter(this.pattern[row][column]);
      }
      outputString += "\n";
    }
    return outputString;

  }
}

(function testKnit(){
  let p = new Pattern(2, 3);  // n.b rows, stitchesPerRows
  p.Knit();
  p.Knit();
  p.Knit();
  p.IncreaseRow();
  p.Knit();
  p.Knit();
  p.Knit();
  p.IncreaseRow();
  console.log( p.asReverseString() );
})();

(function testPurl(){
  let p = new Pattern(2, 3);  // n.b rows, stitchesPerRows
  p.Purl();
  p.Purl();
  p.Purl();
  p.IncreaseRow();
  p.Purl();
  p.Purl();
  p.Purl();
  console.log( p.asString() );
  console.log( p.asReverseString() );
})();
