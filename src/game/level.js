import Snapshot from "../utils/snapshot";

var main;

class Level {
  constructor() {
    main = app.main;
  }

  start() {
    let well = main.assets.wellBrotli.scene.clone();
    main.scene.add(well);
    well.scale.multiplyScalar(5);
    well.position.set(6, 0.7, -12);
  }

  update(ratio, delta) {
    //   if(this.char.position.y<-6){
    //       this.char.body.position.set(0,10,0);
    //       this.char.body.velocity.set(0,0,0);
    //       this.char.body.angularVelocity.set(0,0,0);
    //   }

    let controls = app.controls;

    if (controls.isDown) {
      let dx = controls.mouseX - controls.prevX;
      let dy = controls.mouseY - controls.prevY;

      dx *= 0.1;
      dy *= 0.1;

      //   if(this.char.body.sleepState){
      //       this.char.body.wakeUp();
      //   }

      this.ball.body.velocity.x += dx;
      this.ball.body.velocity.z += dy;
    }

    //   for(let box of this.boxList){
    //       box.position.copy(box.body.position);
    //       box.quaternion.copy(box.body.quaternion);

    //       if(box.position.y<-6){
    //           let x = -10 + 20*Math.random();
    //           let z = -10 + 20*Math.random();
    //           box.body.position.set(x,10,z);
    //           box.body.velocity.set(0,0,0);
    //       }
    //   }
  }

  end() {}
}

export default Level;
