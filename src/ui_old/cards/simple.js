import './simple.css';
import helper from '../helper';
import texturedButton from '../buttons/textured';

var logoEl = document.querySelector("#game-logo img");
var preloaderLogoSrc = logoEl && logoEl.src;

function simpleCard( parent, btnText, btnBg, logoSrc ){
    
    logoSrc = logoSrc || preloaderLogoSrc;
    btnText = btnText || "";


    let card= document.createElement("div");
    card.className="simple-card screen cover ";
    
    let innerDiv= document.createElement("div");
    
    let logo= helper.addImage(logoSrc);
    logo.classList.add("card-logo");

    let endBtn = texturedButton(btnText, btnBg);

    innerDiv.appendChild(logo);
    innerDiv.appendChild(endBtn);
    
    card.appendChild(innerDiv);
    parent.appendChild(card);
    

    card.resize = function(w,h){
        endBtn.resize(w,h);
    }

    card.ctaBtn = endBtn;

    return card;
}


export default simpleCard;