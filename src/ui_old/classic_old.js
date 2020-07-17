

import install0Src from '../../assets/ui/install0.png';
import install1Src from '../../assets/ui/install1.png';
import install2Src from '../../assets/ui/install2.png';


import greenBalLSrc from '../../assets/ui/tutorial/ball_green.png';
import yellowBalLSrc from '../../assets/ui/tutorial/ball_yellow.png';
import purpleBalLSrc from '../../assets/ui/tutorial/ball_purple.png';
import fakeBallSrc from '../../assets/ui/tutorial/fakeball.png';

import clipSrc from '../../assets/ui/end_card1/clip.png';


import handSwipeSrc from '../../assets/ui/tutorial/hand_swipe.png';
import handTapSrc from '../../assets/ui/tutorial/hand_tap.png';


import arrowSrc from '../../assets/ui/tutorial/doublearrow.png';


var classicUi={};
var parent,objects={},main;
classicUi.objects=objects;

var installButtons={
    install0Src,
    install1Src,
    install2Src
};



classicUi.init=function(data,parentNode,mainObj){
    parent = parentNode;
    main = mainObj;
    
    addBanner(data);
    
    //addTextCss("ready" , "READY" , "text");
    
    addFakeBallText();
    addTutorial(data);

    

    if(data.endCardNo==0){
        addSimpleEndCard(data);
    }
    else{
        addEndCard1(data);
    }
    
    addButtonOrBottomBanner(data);
    
}


function addTextCss(name , str , className){
    let p = document.createElement( "p" );
    p.className=className;
    p.innerHTML = str;
    parent.appendChild(p);
    
    objects[ name ] = p;
    
    return p;
}

function addImage(src , isInteractive){
    var img= document.createElement("img");
    img.className = "not-select"
    img.src=src;
    img.setAttribute("draggable",false);
    
    if(!isInteractive){
        img.style.pointerEvents = "none";
    }
    
    
    img.onmousedown = function(e){
        e.preventDefault();
    }
    
    img.ontouchstart = function(e){
        e.preventDefault();
    }
    return img;
}


function addBanner(data){
    
    if(data.hasBanner){
        var p= addElement("p",data.bannerText,
            {
                background:data.bannerTextColor
            },{class:"text"}
        );
        
        var div= addElement("div",null,{background:data.bannerBgColor.replace("0x","#")},{class:"banner"});
        
        p.style.color=data.bannerTextColor.replace("0x","#");
        
        div.appendChild(p);
        parent.appendChild(div);
        
        objects.banner = div;
        objects.bannerText = p;
        
        //setStyle(p,"-webkit-text-stroke",data.bannerBgColor.replace("0x","#")+" 1px");

        setStyle(p,"font-size",data.fontSize+"px");
        setStyle(p,"height",(Number(data.fontSize)+5)+"px");
    }
}

function addButtonOrBottomBanner(data){
    if(data.hideCta)return;
    var cta;
    
    if(data.hasBottomBanner){
        var bottomBanner= document.createElement("div");
        bottomBanner.className="bottom-banner";
        
        var img=addImage(data.bottomBannerNo==0?bottomBanner0Src:bottomBanner1Src);
        
        
        bottomBanner.appendChild(img);
        parent.appendChild(bottomBanner);
        
        objects.bottomBanner=bottomBanner;
        
        cta=bottomBanner;
    }
    else{
        var install = document.createElement("div");
        install.className="install hide";
        
        var img= document.createElement("img");
        img.src=installButtons[data.gameButton+"Src"];
        img.setAttribute("draggable",false);
        
        install.appendChild(img);
        parent.appendChild(install);
        
        objects.install=install;
        
        cta=install;
    }
    
    function downloadNow(e){
        if(!data.hasBottomBanner && !cta.classList.contains("show")){
            return;
        }
        console.log("donwload")
        e.preventDefault();
        e.stopPropagation();
        
        main.gotoLink();
    }
    
    cta.onmousedown=downloadNow;
    cta.ontouchstart=downloadNow;
}


function addFakeBallText(){
    let fake = document.createElement("p");
    fake.innerHTML = "15";

    fake.className = "fakeball-text";

    objects.fakeBallText = fake;
    parent.appendChild(fake);

}

function addFakeBall(){
    let fake = addImage(fakeBallSrc);
    fake.classList.add("fakeball");
    fake.classList.add("hide");

    objects.fakeBall = fake;
    parent.appendChild(fake);

    objects.fakeBallList = {
        yellow: yellowBalLSrc,
        green: greenBalLSrc,
        purple: purpleBalLSrc,
    }
}


function addTutorial(data){
    
    if(!data.hasTutorial)return;

    var tutorialDiv = document.createElement("div");
    tutorialDiv.className="tutorial";
    
    ////SWIPE HOLDER
    var swipeHolder = document.createElement("div");
    swipeHolder.className = "swipe-holder hide";

    let swipe = document.createElement("p");
    swipe.innerHTML = "Swipe<br>to Rotate";
    swipe.className = "swipe-text";

    objects.swipeHolder = swipeHolder;
    let arrow = addImage(arrowSrc);
    arrow.className = "swipe-arrow";

    let hand = addImage(handTapSrc);
    hand.classList.add("swipe-hand");
    objects.hand=hand;
    swipeHolder.appendChild(swipe);
    swipeHolder.appendChild(arrow);
    swipeHolder.appendChild(document.createElement("br"));
    swipeHolder.appendChild(hand);

    ///TAP TO SHOOT HOLDER
    var tapHolder = document.createElement("div");
    tapHolder.className = "tap-holder hide";

    objects.tapHolder = tapHolder;

    let tap = document.createElement("p");
    tap.innerHTML = "Tap same color<br>to Shoot";
    tap.className = "tap-text";

    hand = addImage(handTapSrc);
    hand.classList.add("tap-hand");
    
    tapHolder.appendChild(tap);
    tapHolder.appendChild(hand);
    tapHolder.appendChild(document.createElement("br"));


    tutorialDiv.appendChild(tapHolder);
    tutorialDiv.appendChild(swipeHolder);
    parent.appendChild(tutorialDiv);
    objects.tutorial=tutorialDiv;
    classicUi.tutorialOn=true;
    

}


function addSimpleEndCard(data){
    var div= document.createElement("div");
    div.className="simple-card-text screen hide";
    
    var innerDiv= document.createElement("div");
    var endText = addTextCss("simpleCardText", data.simpleEndCardText);
    
    let endBtn = addRetroButton();
    innerDiv.appendChild(endText);
    innerDiv.appendChild(endBtn);
    
    
    if(data.hasBottomBanner){
        div.style.height="90%";
    }
    
    div.appendChild(innerDiv);
    parent.appendChild(div);
    
    objects.endCard=div;
    objects.endCardButton=endBtn;
}


function addEndCard1(data){
    
    var div= document.createElement("div");
    div.className="card2 screen hide";

    var innerDiv= document.createElement("div");
    objects.card2Inner = innerDiv;


    let text0 = addTextCss("card2Text0", data.endCard2Text0, "card2Text0");
    let text1 = addTextCss("card2Text1", data.endCard2Text1, "card2Text1");
    let text2 = addTextCss("card2Text2", data.endCard2Text2, "card2Text2");

    let clipDiv = document.createElement("div");
    clipDiv.className = "clip-holder";
    let img = addImage(clipSrc);
    let text3 = addTextCss("card2Text3", data.endCard2Text3, "card2Text3");
    let text4 = addTextCss("card2Text4", data.endCard2Text4, "card2Text4");

    clipDiv.appendChild(img);
    clipDiv.appendChild(document.createElement("br"));
    clipDiv.appendChild(text3);
    clipDiv.appendChild(document.createElement("br"));
    clipDiv.appendChild(text4);

    innerDiv.appendChild(text0);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(text1);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(text2);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(clipDiv);

    div.appendChild(innerDiv);
    parent.appendChild(div);

    objects.endCard = div;
    objects.endCardButton = clipDiv;
    
}


function addEndCard1Old(data){
    var div= document.createElement("div");
    div.className="restart-card screen cover hide";
    
    var innerDiv= document.createElement("div");
    
    var endText=addImage(niceGameSrc);
    
    var retryBtn=addImage(retrySrc, true);
    retryBtn.className="bounce retry";
    
    var orText=addImage(orSrc);
    orText.className="or-text";
    
    var downloadBtn=addImage(downloadSrc, true);
    downloadBtn.className="bounce download";
    
    
    innerDiv.appendChild(endText);
    innerDiv.appendChild(retryBtn);
    innerDiv.appendChild(orText);
    innerDiv.appendChild(downloadBtn);
    
    if(data.hasBottomBanner){
        div.style.height="90%";
    }
    
    div.appendChild(innerDiv);
    parent.appendChild(div);
    
    objects.endCard=div;
    objects.endCardButton=downloadBtn;
    objects.endCardRetryButton=retryBtn;
}



function addRetroButton(str="Continue asddsdas",colorTop = "#ff0000", colorBot="#990000"){
    let backBg = document.createElement("span");
    let foreBg = document.createElement("span");

    let text = document.createElement( "span" );
    text.innerHTML = str;
    
    var btn = document.createElement("div");
    btn.appendChild(backBg);
    btn.appendChild(foreBg);
    btn.appendChild(text);
    
    btn.className = "retro-btn";

    foreBg.style.background = colorTop;
    backBg.style.background = colorBot;

    btn.resize = function(){
        let bgWidth = 250;
        scaleElement(text, bgWidth, 50, 0.9, 0.9);

        text.style.left = (bgWidth*0.5 - text.curWidth*0.5) + "px";
    }
    
    return btn;
}

function scaleElement(el, w, h, ratiox, ratioy, maxScale){
    if(!el)return;

    let ew = el.clientWidth;
    let eh = el.clientHeight;

    let scale = Math.min(w*ratiox/ew, h*ratioy/eh);

    if(maxScale && scale > maxScale)scale = maxScale;

    el.style.transform = "scale("+scale+")";

    el.curWidth = ew*scale;
    el.curHeight = eh*scale;
    el.curScale = scale;

}


function addElement(tag,html,styles={},attrs={}){
    if(!tag){
        console.warn("we need tag name!")
        return;
    }
    
    var el= document.createElement(tag);
    
    if(html){
        el.innerHTML=html;
    }
    var elStyles="";
    
    for(let prop in styles){
        if(styles.hasOwnProperty(prop)){
            elStyles+=prop+":"+styles[prop];
        }
    }
    
    el.setAttribute("style",elStyles);
    
    for(let prop in attrs){
        if(attrs.hasOwnProperty(prop)){
            el.setAttribute(prop,attrs[prop]);
        }
    }
    
    
    return el;
}


function setStyle(id,styleName,value){
    var item;
    
    if(typeof id!="string"){
        item= id;
    }else{
        item= document.getElementById(id);
    }
    
    if(item){
        item.style[styleName]=value;
    }
}


export default classicUi;







