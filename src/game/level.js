
import Snapshot from '../utils/snapshot';

var main;

class Level{
    constructor(){
        main = app.main;
    }

    start(){
        

        let well = main.assets.wellBrotli.scene.clone();
        main.scene.add(well);
        well.scale.multiplyScalar(5);
        well.position.set(6,0.7,-12)

        let ground = main.objectMaker.addBox({
            x: 0, y:0, z :0, wx: 20, wy:1,wz:20,
            color: 0x990000, mass:0
        });

        let char = main.objectMaker.addSphere({
            x: 0, y:1.5, z :0, radius:0.5,
            color: 0xff9900, mass:10
        });

        char.body.allowSleep = true;
        char.body.sleepSpeedLimit = 0.5;
        char.body.sleepTimeLimit = 1.0;

        


        this.char = char;
        this.boxList = [];

        for(let i=0;i<20;i++){
            let x = -10 + 20*Math.random();
            let z = -10 + 20*Math.random();
            let box = main.objectMaker.addBox({
                x, y:2, z, wx: 0.5, wy:1,wz:0.5,
                color: 0x999999, mass:1
            });

            box.body.allowSleep = true;
            box.body.sleepSpeedLimit = 0.5;
            box.body.sleepTimeLimit = 0.5;

            this.boxList.push(box);
        }
        
        /*
        var snapShotList = [well, ground, char];

        setTimeout(()=>{
            let src = Snapshot.take(
                main,
                snapShotList,///objects to use in snapshot, set null to take all objects in main.scene
                true,///add lights
                null,//camera position, set null to use current camera location
                1,//resolution
            );
        
            let img = document.createElement("img");
            img.src = src;
            document.body.appendChild(img);

            img.style.position = "fixed";
            img.style.top = "0";
            img.style.left = "0";
            img.style.zIndex = "99";
        }, 1000);
        */
    }

    update(ratio, delta){
        this.char.position.copy(this.char.body.position);
        this.char.quaternion.copy(this.char.body.quaternion);

        if(this.char.position.y<-6){
            this.char.body.position.set(0,10,0);
            this.char.body.velocity.set(0,0,0);
            this.char.body.angularVelocity.set(0,0,0);
        }
        let controls = app.controls;

        if(controls.isDown){
            let dx = controls.mouseX - controls.prevX;
            let dy = controls.mouseY - controls.prevY;

            dx *= 0.1;
            dy *= 0.1;
            

            if(this.char.body.sleepState){
                this.char.body.wakeUp();
            }
            
            this.char.body.velocity.x += dx;
            this.char.body.velocity.z += dy;
        }

        for(let box of this.boxList){
            box.position.copy(box.body.position);
            box.quaternion.copy(box.body.quaternion);

            if(box.position.y<-6){
                let x = -10 + 20*Math.random();
                let z = -10 + 20*Math.random();
                box.body.position.set(x,10,z);
                box.body.velocity.set(0,0,0);
            }
        }
    }

    end(){

    }
}


export default Level;