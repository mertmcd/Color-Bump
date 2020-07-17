import './simple.css';
import helper from '../helper';

function simpleButton( str = "PLAY NOW", bgColor = "#ff0000" ){
    
    let btn = document.createElement("div");
    let text = document.createElement("span");

    text.innerHTML = str;
    btn.style.background = bgColor;    
    btn.className = "simple-btn";

    btn.appendChild(text);

    btn.resize = function(){
        let bgWidth = btn.clientWidth || 200;
        let bgHeight = btn.clientHeight || 60;
        helper.scaleElement(text, bgWidth, bgHeight, 0.8, 0.8,1);

        text.style.left = (bgWidth*0.5 - text.curWidth*0.5) + "px";
        text.style.top = (bgHeight*0.5 - text.curHeight*0.5) + "px";

    }
    
    return btn;
}


export default simpleButton;
