import './button.css';
import '../helper';

function railButton(str, color, textColor, borderColor){
    let btn = document.createElement("div");
    btn.className = "rail-btn";
    btn.style.background = color;

    let border = document.createElement("div");
    border.className = "rail-btn-border";

    let text = document.createElement("p");
    text.innerHTML = str;
    text.style.color = textColor;
    
    btn.appendChild(border);
    btn.appendChild(text);

    btn.resize = function(w,h){
        let btnWidth = 400;
        let btnHeight = 80;

        let scale = Math.min(w*0.6/btnWidth, h*0.1/btnHeight);

        btnWidth *= scale;
        btnHeight *= scale;
        btn.style.width = btnWidth + "px";
        btn.style.height = btnHeight + "px";

        btn.style.borderRadius = scale*20+"px";

        let textWidth = text.clientWidth;
        let textHeight = text.clientHeight;
        let textScale = Math.min(btnWidth*0.8/textWidth, btnHeight*0.7/textHeight);

        text.style.transform = "scale("+textScale+")";
        text.style.left = btnWidth * 0.5 - textWidth * 0.5 *textScale+ "px";
        text.style.top = btnHeight * 0.5 - textHeight * 0.5 *textScale + "px";


        border.style.borderRadius = btn.style.borderRadius;

        border.style.left = btnWidth * 0.02 + 1 +"px";
        border.style.width = btnWidth * 0.96 - 6 + "px";

        border.style.top = btnHeight * 0.05 + 1 + "px";
        border.style.height = btnHeight * 0.9 - 6 + "px";


        btn.curWidth = btnWidth;
        btn.curHeight = btnHeight;
    }

    return btn;
}


export default railButton;