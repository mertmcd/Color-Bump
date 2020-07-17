import './card.css';
import '../helper';
import railButton from './button';

function railCard(
    titleStr, titleColor, infoStr, infoColor, 
    moneyEarned = 250, moneyColor,
    
    ctaText= "DOWNLOAD",
    ctaBgColor = "#fc7d55",
    ctaTextColor = "#ffffff",

    retryText= "RETRY",
    retryBgColor = "#990000",
    retryTextColor = "#ffffff",
){
    let container = document.createElement("div");
    container.className = "cover screen hide";

    let holder = document.createElement("div");
    holder.className = "rail-card";

    let title = document.createElement("p");
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
    money.style.color = moneyColor;

    let btn = railButton(ctaText, ctaBgColor, ctaTextColor, ctaTextColor);
    btn.classList.add("simple-pulse");

    let retryBtn = railButton(retryText, retryBgColor, retryTextColor, retryTextColor);
    retryBtn.classList.add("simple-pulse");

    holder.appendChild(title);
    holder.appendChild(info);
    holder.appendChild(earn);
    holder.appendChild(money);
    holder.appendChild(retryBtn);
    holder.appendChild(btn);
    
    let texts = [title, info, earn, money];
    let fontSizes = [64,24, 32,120 ];
    let margins = [0,0, 180,0 ];

    for(let i=0; i< texts.length;i++){
        let t = texts[i];

        t.style.fontSize = fontSizes[i]+"px";
        t.style.marginTop = margins[i]+"px";
    }
    
    btn.style.left = "0";
    btn.style.right = "0";
    btn.style.margin = "auto";
    btn.style.marginTop = "120px";

    retryBtn.style.left = "0";
    retryBtn.style.right = "0";
    retryBtn.style.margin = "auto";
    retryBtn.style.marginTop = "30px";

    holder.style.height = "650px";
    container.resize = function(w,h){
        //btn.resize(w,h);
        let bgWidth = 360;
        let bgHeight = 650;

        let scale = Math.min(w*0.7/bgWidth, h*0.9/bgHeight);

        holder.style.transform = "scale("+scale+")";
        holder.style.left = w*0.5-bgWidth*0.5 + "px";
        holder.style.top = h*0.5-bgHeight*0.5 + "px";
        
    }

    setTimeout(function(){
        retryBtn.resize(800,600);
        btn.resize(800,600);
    },500);
    
    container.appendChild(holder);

    container.retryBtn = retryBtn;
    container.ctaBtn = btn;

    container.updateTexts = function(
        titleStr, titleColor, infoStr, infoColor, 
        moneyEarned = 250, moneyColor,
    ){
        title.innerHTML = titleStr;
        title.style.color = titleColor;

        info.innerHTML = infoStr;
        info.style.color = infoColor;
        
        earn.style.color = infoColor;
        
        money.innerHTML = "$"+moneyEarned;
        money.style.color = moneyColor;
    }

    container.hideRetry = function(){
        retryBtn.style.display = "none";
    }

    container.showRetry = function(){
        retryBtn.style.display = "block";
    }


    


    return container;
}


export default railCard;