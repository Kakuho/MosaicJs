//  To make the rows reversible, I include an enum called orientation.
//  This is to control direction of growth.
//  In order to illustrate, suppose we have a row of 5 stitches, and max stitch size is 7:
//  Let e denote an empty stitch, and x denote a stitch regardless of type (bumpy or smooth). 
//  Let also | to denote the location of our last stitch
//  
//  forward:
//      |
//  e e x x x x x
//
//  knit / purl
//    |
//  e x x x x x x
//
//  knit / purl
//  |
//  x x x x x x x
//
//---------------------------------------------------------------//
//
//  backwards:
//          |
//  x x x x x e e
//
//  knit / purl
//            |
//  x x x x x x e
//
//  knit / purl
//              |
//  x x x x x x x
//
//---------------------------------------------------------------//
//  
//  Charts for knitting patterns, when read, the direction of growth follows:
//
//  forward row
//  reverse row
//  forward row
//  reverse row ... (ad nausem)
//
//  However, they are presented in this fashion:
//
//  backward row
//  forward row
//  backward row
//  forward row
//
//  With this in mind, let k denote a knit stitch and p denote a purl stitch. A chart which has the pattern:
//
//  k k p k
//  p k k p
//
//  when knitting, the knitter does the following stitches (I put brackets to separate rows)
//  
//   1    2    3    4      5    6    7    8
//  (purl knit knit purl) (knit purl knit knit).
//
//  Represented in this software:
//
//           1      2      3      4
//    Row 1: purl() knit() knit() purl() 
//
//    Row 2: knit() purl() knit() knit()
//
//  To frame it in terms of bumpy/smooth, the frontside would be: 
//          
//           knitted column
//           1     2      3     4
//    Row 1: bumpy smooth bumpy bumpy
//
//    Row 2: ?     ?      ?     ?
//
//  while the backside would be: 
//      
//           knitted column
//           1      2      3      4
//    Row 1: ?      ?      ?      ?
//
//    Row 2: ?      ?      ?      ?

//
//---------------------------------------------------------------//
//  Now to resolve the direction of growth and the frontside and backside:
//  
//


import Cell, {knitType} from "./cell.js";

const stitches = {
  knit: 0,
  purl: 1
}

const orientationEnum = {
  forward: 0,
  backwards: 1
};

class Row{
  stitches = null;
  orientation = null
  pattern = [];

  constructor(stitches, orientation){
    if(orientation === undefined){
      this.orientation = orientationEnum.forward;
    }
    else{
      this.orientation = orientation;
    }
    this.stitches = stitches;
    for(let k = 0; k < stitches; k++){
      this.pattern[k] = new Cell();
    }
  }

  Knit(index){
    this.pattern[index] = new Cell(knitType.smooth, knitType.bumpy);
  }

  Purl(index){
    this.pattern[index] = new Cell(knitType.bumpy, knitType.smooth);
  }

  SetOrientation(orientation){
    this.orientation = orientation;
  }

  asString(){
    let outputString = "";
    for(let column = 0; column < this.stitches; column++){
      if(column == 0){
        outputString += `Row 0 |`;
      }
      outputString += " " + this.pattern[column].GetFront() + ";" 
                        + this.pattern[column].GetBack()
    }
    return outputString;
  }

  // front side is defined to be the front of the needle in the first stitch
  // So, the very first working needle's left side 
  getFrontSideString(){
    // returns a string representing the front of the work
    let outputString = "";
    outputString += `Row 0 |`;
    for(let column = 0; column < this.stitches; column++){
      outputString += " " + this.pattern[column].GetFront();
    }
    return outputString;
  }

  getFrontSideReverseString(){
    // returns a string representing the front of the work in backwards orientation
    let outputString = "";
    outputString += `Row 0 |`;
    for(let column = this.stitches-1; column >= 0; column--){
      outputString += " " + this.pattern[column].GetFront();
    }
    return outputString;
  }

  // back side is defined to be the back of the needle in the first stitch
  // So, the very first working needle's right side 
  getBackSideString(){
    // returns a string representing the back of the work
    let outputString = "";
    for(let column = 0; column < this.stitches; column++){
      if(column == 0){
        outputString += `Row 0 |`;
      }
      outputString += " " + this.pattern[column].GetBack();
    }
    return outputString;
  }

  getBackSideReverseString(){
    // returns a string representing the back of the work in backwards representation
    let outputString = "";
    outputString += `Row 0 |`;
    for(let column = this.stitches-1; column >= 0; column--){
      outputString += " " + this.pattern[column].GetBack();
    }
    return outputString;
  }

  ParseFront(){
    if(this.orientation === orientationEnum.forward){
      // forward orientation
      return this.getFrontSideReverseString();
    }
    else{
      // backwards orientation
      return this.getFrontSideString();
    }
  }

  ParseBack(){
    if(this.orientation === orientationEnum.forward){
      // forward orientation
      return this.getBackSideReverseString();
    }
    else{
      // backwards orientation
      return this.getBackSideString();
    }
  }
}

//---------------------------------------------------------------//

function testInitial(){
  let p = new Row(4);
  p.Knit(0);
  p.Purl(1);
  p.Purl(2);
  p.SetOrientation(orientationEnum.backwards);
  console.log(p.ParseFront());

  let p2 = new Row(4);
  p2.Knit(0);
  p2.Purl(1);
  p2.Purl(2);
  p2.SetOrientation(orientationEnum.forward);
  console.log(p2.ParseFront());
}

//---------------------------------------------------------------//

testInitial();
