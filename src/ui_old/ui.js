import simpleCard from "./cards/simple";
import restartEndCard from "./cards/restartEndCard";
import simpleButton from "./buttons/simple";

import addBanner from "./core/banner";
import addBottomBanner from "./core/bottomBanner";
import endlessSign from "./tutorial/endless";
import texturedButton from "./buttons/textured";
import railButton from "./rail/button";
import textBox from "./text/textBox";
import lineBar from "./bar/lineBar";
import circleBar from "./bar/circleBar";
import restartCard from "./cards/restartCard";

var list = [];

var ui = {
    simpleCard, 
    restartEndCard,
    restartCard,
    
    simpleButton,
    texturedButton,
    
    textBox,

    addBanner,
    addBottomBanner,

    endlessSign,

    lineBar,
    circleBar,

    railButton,
    
};

for(let prop in ui){
    let func = ui[prop];

    ui[prop] = function(){
        let obj = func(...arguments);
        list.push(obj);
        return obj;
    }
}

ui.resize = function(w,h){
    if(!w || !h){
        w = window.innerWidth;
        h = window.innerHeight;
    }

    for(let obj of list){
        obj && obj.resize && obj.resize(w,h);
    }
}



export default ui;



