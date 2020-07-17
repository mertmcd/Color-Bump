import './bottomBanner.css';
import helper from "../helper";

function addBottomBanner(imageSrc, opacity = 1){

    var bottomBanner= document.createElement("div");
    bottomBanner.className="bottom-banner";
    if(opacity != 1){
        bottomBanner.style.opacity = opacity;
    }
    
        
    
    var innerDiv = document.createElement("div");    
    var img = helper.addImage(imageSrc, true);
    
    innerDiv.appendChild(img);
    innerDiv.style.height = "100%";
    bottomBanner.appendChild(innerDiv);

    bottomBanner.resize = function(w,h){

    }

    return bottomBanner;
}

export default addBottomBanner;