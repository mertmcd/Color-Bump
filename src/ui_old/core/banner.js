import './banner.css';
import helper from "../helper";

function addBanner( text, textColor, bgColor, opacity = 1){
    
    var p= helper.addElement("span", text,
        {
            //background: textColor
        },{class:"text"}
    );
    
    var div= helper.addElement("div",null,{background: bgColor.replace("0x","#")},{class:"banner show"});
    
    p.style.color = textColor.replace("0x","#");
    
    div.appendChild(p);
    //parent.appendChild(div);
    
    
    
    div.style.opacity = opacity;
    
    let fontSize = 40;

    helper.setStyle(p,"font-size", fontSize+"px");
    helper.setStyle(p,"height",(Number(fontSize)+5)+"px");

    let banner = div;
    let bannerText = p;

    banner.resize = function(w,h){
        
        if(!bannerText.curScale)bannerText.curScale = 1;

        let tw = bannerText.clientWidth / bannerText.curScale;
        let th = bannerText.clientHeight / bannerText.curScale;

        
        let bscale = Math.min( w*0.9 / tw, banner.clientHeight*0.8/th);
        bannerText.style.transform = "scale("+bscale+")";

        bannerText.style.left = (w*0.5 - tw*0.5*bscale) + "px";
        bannerText.style.top = (banner.clientHeight*0.5 - th*0.5*bscale) + "px";
    }

    return banner;

}


export default addBanner;