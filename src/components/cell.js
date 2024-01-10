// cell is a class to abstract the finished stitch on a pattern. 
//
// A finished stitch looks different depending on which stitch was just performed - this affects appearance on front and
// back. 
//
// decrease would perform a similiar appearance - Implementation comes later.

export default class cell{
  // note: it is important for us to define what is the frontside and backside for consistency.
  //       for this software implementation I use the
  //
  // common knitting blogs would use term rightside and wrongside, however this is chosen arbitarily.
  frontside = null;
  backside = null;

  constructor(frontside, backside){
    this.frontside = frontside;
    this.backside = backside;
  }

  SetFront(stitch){
    this.frontside = stitch;
  }

  SetBack(stitch){
    this.backside = stitch;
  }
}

const knitType = {
  smooth: 0,
  bumpy: 1
};

function test(){

}
