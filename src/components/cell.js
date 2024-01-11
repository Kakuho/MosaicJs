// cell is a class to abstract the finished stitch on a pattern. 
//
// A finished stitch looks different depending on which stitch was just performed - this affects appearance on front and
// back. 
//
// The current implementation focuses on knit and purl stitches

export const knitType = {
  empty: -1,  // initial state
  smooth: 0,
  bumpy: 1
};

function knitTypePrinter(knitType, verbose){
  if(verbose === true){
    switch(knitType){
      case -1:
        return "empty";
      case 0:
        return "smooth";
      case 1:
        return "bumpy";
    }

  }
  else{
    switch(knitType){
      case -1:
        return "e";
      case 0:
        return "s";
      case 1:
        return "b";
    }
  }
}

export default class Cell{
  // note: It is important for us to define what is the frontside and backside for consistency.
  //       For this software implementation I define the front side to refer to the left side of knitting that 
  //       occurs after casting on and initial stitches.
  //
  //       common knitting blogs uses the term rightside and wrongside, however this is chosen arbitarily. 
  //       Therefore, I use the words frontside and backside, and allow the knitter to choose whether they are viewing the 
  //       frontside or backside.
  frontside = null;
  backside = null;

  constructor(frontside, backside){
    // frontside and backside are enums from knitType
    if(frontside === undefined){
      this.frontside = knitType.empty;
    }
    else{
      this.frontside = frontside;
    }
    if(backside === undefined){
      this.backside = knitType.empty;
    }
    else{
      this.backside = backside;
    }
  }

  SetFront(stitch){
    // void function, stitch is an enum from knitType
    this.frontside = stitch;
  }

  SetBack(stitch){
    // void function, stitch is an enum from knitType
    this.backside = stitch;
  }

  GetFront(verbose){
    // returns string, verbose is bool which determines the detail of the output
    return knitTypePrinter(this.frontside, verbose);
  }

  GetBack(verbose){
    // returns string, verbose is bool which determines the detail of the output
    return knitTypePrinter(this.backside, verbose);
  }
}

//---------------------------------------------------------------//

function test(){
  let c = new Cell();
  c.SetFront(knitType.smooth);
  console.log(c.GetFront(true));
}

function testEmpty(){
  let c = new Cell();
  console.log(c.GetFront(true));
}

//---------------------------------------------------------------//

//testEmpty();
