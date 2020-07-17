import './restartCard.css';
import helper from '../helper';
import railButton from '../rail/button';

var logoEl = document.querySelector("#game-logo img");
var preloaderLogoSrc = logoEl && logoEl.src;

function restartCard(
    logoSrc,
    
    ctaText= "DOWNLOAD",
    ctaBgColor = "#fc7d55",
    ctaTextColor = "#ffffff",

    retryText= "RETRY",
    retryBgColor = "#ee445d",
    retryTextColor = "#ffffff",

    
){
    logoSrc = logoSrc || preloaderLogoSrc;

    let container = document.createElement("div");
    container.className = "cover screen hide";

    let holder = document.createElement("div");
    holder.className = "restart-card";


    /*let title = document.createElement("p");
    title.innerHTML = titleStr;
    title.style.color = titleColor;

    let info = document.createElement("p");
    info.innerHTML = infoStr;
    info.style.color = infoColor;

    let earn = document.createElement("p");
    earn.innerHTML = "YOU EARNED";
    earn.style.color = infoColor;
    
    let money = document.createElement("p");
    money.innerHTML = "$"+moneyEarned;
    money.style.color = moneyColor;*/

    let logo = helper.addImage(logoSrc);
    logo.className = "restart-logo";

    let retryBtn = railButton(retryText, retryBgColor, retryTextColor, retryTextColor);
    retryBtn.classList.add("simple-pulse");
    retryBtn.classList.add("restart-btn");

    let ctaBtn = railButton(ctaText, ctaBgColor, ctaTextColor, ctaTextColor);
    ctaBtn.classList.add("simple-pulse");
    ctaBtn.classList.add("restart-btn");

    ctaBtn.style.position = "static";
    retryBtn.style.position = "static";

    holder.appendChild(logo);
    holder.appendChild(retryBtn);
    holder.appendChild(ctaBtn);
    
    container.resize = function(w,h){
        //btn.resize(w,h);
        


        let resW = 250;
        let resH = 380;
        

        if(w>h){
            resW = 560;
            resH = 340;
            //scale = Math.min(rw*0.6/440, rh*0.7/394);

            holder.classList.add("horizontal-restart");
        }
        else{
            holder.classList.remove("horizontal-restart");
        }

        let bgWidth = resW;
        let bgHeight = resH;
        
        

        let scale = Math.min(w*0.7/bgWidth, h*0.9/bgHeight);

        bgWidth *= scale;
        bgHeight *= scale;
        

        holder.style.transform = "scale("+scale+")";
        holder.style.left = w*0.5-bgWidth*0.5 + "px";
        holder.style.top = h*0.5-bgHeight*0.5 + "px";


        
    }

    setTimeout(function(){
        ctaBtn.resize(500,500);
        retryBtn.resize(500,500);
    },500);
    
    container.appendChild(holder);

    container.ctaBtn = ctaBtn;
    container.retryBtn = retryBtn;

    

    return container;
}


export default restartCard;