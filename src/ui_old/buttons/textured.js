import './textured.css';
import helper from '../helper';

function texturedButton(btnText, btnBg){
    

    let btn = document.createElement("div");
    let btnInner = document.createElement("div");
    let btnImg = helper.addImage(btnBg, true);
    
    let btnTextObj = helper.addTextCss( btnText );


    btn.className = "textured-btn-holder";
    btnInner.className = "textured-btn";

    btnInner.appendChild(btnImg);
    btnInner.appendChild(btnTextObj);
    btn.appendChild(btnInner);
    

    btn.resize = function(w,h){

        helper.scaleElement(btnInner, w, h, 0.5,0.25);
        btnInner.style.left = (w*0.5 - btnInner.curWidth*0.5)+"px";

        helper.scaleElement(btnTextObj, btnImg.naturalWidth, btnImg.naturalHeight,0.8,0.8);

        btnTextObj.style.left = (btnImg.naturalWidth*0.5 - btnTextObj.curWidth*0.5)+"px";
        btnTextObj.style.top = (btnImg.naturalHeight*0.5 - btnTextObj.curHeight*0.6)+"px";
    }

    return btn;
}


export default texturedButton;
