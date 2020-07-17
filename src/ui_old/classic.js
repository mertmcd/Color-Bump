
import bottomBanner0Src from '../../assets/ui/bottomBanner0.jpg';
import bottomBanner1Src from '../../assets/ui/bottomBanner1.png';
import bottomBanner2Src from '../../assets/ui/bottomBanner2.jpg';

var bottomBannerList = [
    bottomBanner0Src,
    bottomBanner1Src,
    bottomBanner2Src,
];




import restartDownloadSrc from '../../assets/ui/restart_card/download.png';
import restartRetrySrc from '../../assets/ui/restart_card/retry.png';


import niceGameSrc from '../../assets/ui/restart_endcard/nice_game.png';
import downloadSrc from '../../assets/ui/restart_endcard/download.png';
import orSrc from '../../assets/ui/restart_endcard/or.png';
import retrySrc from '../../assets/ui/restart_endcard/retry.png';


import endcard1BtnSrc from '../../assets/ui/endcard1/button.png';

import handSrc from '../../assets/ui/hand.png';


var logoEl = document.querySelector("#game-logo img");
var logoSrc = logoEl && logoEl.src;



//import logoSrc from '../../assets/core/game_logo.jpg';



var classicUi = {};
var parent,objects={},main;
classicUi.objects=objects;


classicUi.init=function(data,parentNode,mainObj){
    parent = parentNode;
    main = mainObj;
    
    addBanner(data);
    
    
    /*
    if(data.addGameLogo && !data.hasBottomBanner){
        let logo = addImage(logoSrc);
        logo.className = "bottom-logo";

        logo.style.position = "absolute";
        logo.style.right = 0;
        logo.style.bottom = 0;
    }
    */

    let tapToHolder = document.createElement("div");
    tapToHolder.className = "taptoholder";
    objects.tapToHolder = tapToHolder;

    let tapToText = addTextCss("tapToText" , "TAP TO START" , "taptostart");
    tapToHolder.appendChild(tapToText);

    let handImg = addImage(handSrc);
    tapToHolder.appendChild( handImg );
    objects.hand = handImg;
    parent.appendChild(tapToHolder);

    setTimeout(function(){
        tapToText.width = tapToText.clientWidth;
        tapToText.height = tapToText.clientHeight;
        console.log(tapToText.width, tapToText.height);
    }, 500);
    let countdown = addTextCss("countdown", "3!", "countdown");
    countdown.classList.add("hide");

    //addTutorialSvg(data);

    //addStageClear(data);
    //addStageFail(data);

    
    if(data.endCardNo==0){
        //addSimpleEndCard(data);
        addRestartEndCard(data);
    }
    else{
        addSimpleEndCardImage(data);
    }
    
    if(app.data.hasTryAgain){
        addRestartCard(data);
    }

    addButtonOrBottomBanner(data);
    
}



function addElementSimple( name, className, type){
    let el = document.createElement(type);
    el.className = className;

    if(name){
        objects[name] = el;
    }

    return el;
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

window.addImage = addImage;


function addBanner(data){
    
    if(data.hasBanner){
        var p= addElement("span",data.bannerText,
            {
                background:data.bannerTextColor
            },{class:"text"}
        );
        
        var div= addElement("div",null,{background:data.bannerBgColor.replace("0x","#")},{class:"banner show"});
        
        p.style.color=data.bannerTextColor.replace("0x","#");
        
        div.appendChild(p);
        parent.appendChild(div);
        
        objects.banner = div;
        objects.bannerText = p;
        
        div.style.opacity = app.data.bannerOpacity;
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
        bottomBanner.style.opacity = app.data.bottomBannerOpacity;
        
        let bbSrc = bottomBannerList[data.bottomBannerNo];
        var img=addImage(bbSrc, true);
        
        var innerDiv = document.createElement("div");
        
        innerDiv.appendChild(img);
        innerDiv.style.height = "100%";
        bottomBanner.appendChild(innerDiv);
        parent.appendChild(bottomBanner);
        
        objects.bottomBanner=bottomBanner;
        
        cta = bottomBanner;

        if(data.hasTutorial){
            bottomBanner.classList.add("hide");
        }

        
    }
    else{
        /*var install = document.createElement("div");
        install.className="install hide";
        

        var img = document.createElement("img");
        img.src = installSrc;
        img.setAttribute("draggable",false);
        
        img.style.background = app.data.gameButtonColor;
        install.appendChild(img);
        parent.appendChild(install);*/

        var install = addSimpleButton( app.data.gameButtonText, app.data.gameButtonColor );
        install.classList.add("simple-install");
        install.classList.add("hide");
        parent.appendChild(install);

        install.style.animationName = app.data.gameButtonAnimName;
        objects.install=install;
        
        cta=install;


        /*var install = document.createElement("div");
        install.className="install hide";
        
        var img= document.createElement("img");
        img.src=installButtons[data.gameButton+"Src"];
        img.setAttribute("draggable",false);
        
        install.appendChild(img);
        parent.appendChild(install);
        
        objects.install=install;
        
        cta=install;
        */
    }
    
    function downloadNow(e){
        if(!data.hasBottomBanner && !cta.classList.contains("show")){
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        main.gotoLink();
    }
    
    cta.onmousedown=downloadNow;
    cta.ontouchstart=downloadNow;
}



function addStageClear(data){
    let div = document.createElement("div");
    div.className = "screen hide";

    let innerDiv = document.createElement("div");
    innerDiv.className = "stage-cleared";

    let text = addImage(stageClearSrc);

    let nextBtn = addSvgButton(data.stageClearNextText, data.stageClearNextTopColor, data.stageClearNextBotColor);
    let btn = addSvgButton(data.stageClearCtaText, data.stageClearCtaTopColor, data.stageClearCtaBotColor);

    let moneyDiv = document.createElement("div");
    moneyDiv.className = "money-end";
    let coinText = document.createElement("span");
    coinText.innerHTML = "50";
    let coinImage = addImage(coinSrc);

    moneyDiv.appendChild(coinText);
    moneyDiv.appendChild(coinImage);

    innerDiv.appendChild(text);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(moneyDiv);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(nextBtn);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(btn);

    div.appendChild(innerDiv);

    parent.appendChild(div);
    objects.stageCleared = innerDiv;
    objects.stageClearedMoney = coinText;
    objects.stageClearedHolder = div;

    objects.nextLevelBtn = nextBtn;
    objects.nextLevelCta = btn;
}



function addStageFail(data){
    let div = document.createElement("div");
    div.className = "screen hide";

    let innerDiv = document.createElement("div");
    innerDiv.className = "stage-cleared";

    let text = addImage( stageFailSrc );

    /*let btn = addSvgButton("Continue","#ff0000","#990000");
    let nextBtn = addSvgButton("Restart Stage");*/

    
    let nextBtn = addSvgButton(data.stageFailNextText, data.stageFailNextTopColor, data.stageFailNextBotColor);
    let btn = addSvgButton(data.stageFailCtaText, data.stageFailCtaTopColor, data.stageFailCtaBotColor);


    let moneyDiv = document.createElement("div");
    moneyDiv.className = "money-end";
    moneyDiv.style.visibility = "hidden";
    let coinText = document.createElement("span");
    coinText.innerHTML = "50";
    let coinImage = addImage(coinSrc);

    moneyDiv.appendChild(coinText);
    moneyDiv.appendChild(coinImage);

    innerDiv.appendChild(text);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(moneyDiv);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(nextBtn);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(btn);

    div.appendChild(innerDiv);

    parent.appendChild(div);
    objects.stageFailed = innerDiv;
    objects.stageFailedHolder = div;

    objects.restartLevelBtn = nextBtn;
    objects.restartLevelCta = btn;
}





function addTutorial(data){
    if(!data.hasTutorial)return;

    var tutorialDiv = document.createElement("div");
    tutorialDiv.className="tutorial";

    var innerDiv = document.createElement("div");
    let innerDiv2 = document.createElement("div");

    innerDiv2.className="tutorial-inner2";
    
    let img = addImage(tutorialSrc);
    let p = document.createElement("p");
    p.innerHTML = data.tutorialText;
    
    innerDiv2.appendChild(img);
    innerDiv2.appendChild(document.createElement("br"));
    innerDiv2.appendChild(p);

    innerDiv.appendChild(innerDiv2);
    tutorialDiv.appendChild(innerDiv);

    parent.appendChild(tutorialDiv);
    objects.tutorial = tutorialDiv;
    classicUi.tutorialOn = true;
    
    
    objects.tutorialInner = innerDiv;
}

function addTutorialSvg(data){
    
    
    if(!data.hasTutorial)return;

    var tutorialDiv = document.createElement("div");
    tutorialDiv.className="tutorial show";
    
    var innerDiv = document.createElement("div");
    
    
    let p = document.createElement("p");
    p.innerHTML = data.tutorialText;
    //innerDiv.appendChild(p);

    //innerDiv.appendChild(document.createElement("br"));

    let p2 = document.createElement("p");
    p2.innerHTML = data.tutorialText2;
    innerDiv.appendChild(p2);

    let svgHolder = document.createElement("span");
    svgHolder.className = "svg-holder";
    
    tutorialSvg2 = tutorialSvg2.replace( "img/hand.png", handList[app.data.handNo] );

    svgHolder.innerHTML = tutorialSvg2;

    //innerDiv.appendChild(svgHolder);

    tutorialDiv.appendChild(innerDiv);
    parent.appendChild(tutorialDiv);
    objects.tutorial = tutorialDiv;
    classicUi.tutorialOn = true;
    
    innerDiv.style.padding = "20px 0";
    
    objects.tutorialInner = innerDiv;

    /*setTimeout(function(){
        //matrix(0.424, 0, 0, 0.424, -20, 0);
        let hand = document.getElementById("drag-hand");

        

        if(app.data.handNo == 0){
            hand.style.transform = "matrix(0.424, 0, 0, 0.424, 0, 0)";
        }
        else if(app.data.handNo == 1){
            hand.style.transform = "matrix(0.424, 0, 0, 0.424, -40, 0)";
        }
        else if(app.data.handNo == 2){
            hand.style.transform = "matrix(0.424, 0, 0, 0.424, -20, 0)";
        }
    }, 250);*/
    ///p3byjxt
}





function addSimpleEndCard(data){
    var div= document.createElement("div");
    div.className="simple-card-text screen ";
    
    var innerDiv= document.createElement("div");
    var endText = addTextCss("simpleCardText", data.simpleEndCardText);
    

    let endBtn = addRetroButton(
        data.simpleEndCardCtaText,
        data.simpleEndCardCtaForeColor,
        data.simpleEndCardCtaBackColor
    );
    innerDiv.appendChild(endText);
    innerDiv.appendChild(endBtn);
    
    //endBtn.classList.add("simple-pulse");
    
    if(data.hasBottomBanner){
        //div.style.height="90%";
    }
    
    div.appendChild(innerDiv);
    parent.appendChild(div);
    
    objects.endCard=div;
    objects.endCardButton=endBtn;
}


function addEndCard1(data){
    
    var div= document.createElement("div");
    div.className="card1 screen hide";

    var innerDiv= document.createElement("div");
    objects.card2Inner = innerDiv;

    let img = addImage(winGuySrc);

    let text0 = addTextCss("card1Text0", "LEVEL<br>COMPLETED", "card1Text0");
    let text1 = addTextCss("card1Text1", app.data.endCard1CtaText, "card1Text1");

    innerDiv.appendChild(img);
    innerDiv.appendChild(text0);
    innerDiv.appendChild(document.createElement("br"));
    innerDiv.appendChild(text1);
    

    div.appendChild(innerDiv);
    parent.appendChild(div);

    objects.endCard = div;
    objects.endCardInner = innerDiv;

    objects.endImage = img;

    objects.winGuySrc = winGuySrc;
    objects.loseGuySrc = loseGuySrc;

}




function addRestartCard(data){
    
    var cardHolder = document.createElement("div");
    cardHolder.className = "screen cover hide";

    var div= document.createElement("div");
    //div.className="restart-card screen cover ";
    div.className="restart-card";
    

    let logo = addImage(logoSrc);
    logo.className = "restart-logo";
    
    

    let retryBtn = addImage(restartRetrySrc, true); 
    retryBtn.classList.add("bounce");
    let downloadBtn = addImage(restartDownloadSrc, true);
    downloadBtn.classList.add("bounce");

    div.appendChild(logo);
    div.appendChild(retryBtn);
    div.appendChild(downloadBtn);

    cardHolder.appendChild(div);
    parent.appendChild(cardHolder);
    
    objects.restartCard=div;
    objects.restartCardHolder=cardHolder;
    objects.restartCardButton=downloadBtn;
    objects.restartCardRetryButton=retryBtn;



}



function addRestartEndCard(data){
    var div= document.createElement("div");
    div.className="restartend-card screen cover hide";
    
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
        //div.style.height="90%";
    }
    
    div.appendChild(innerDiv);
    parent.appendChild(div);
    
    objects.endCard=div;
    objects.endCardButton=downloadBtn;
    objects.endCardRetryButton=retryBtn;
}



function addSimpleEndCardImage(data){
    var div= document.createElement("div");
    div.className="simple-card screen cover ";
    
    var innerDiv= document.createElement("div");
    
    var logo=addImage(logoSrc);
    //logo.className = "simple-card-logo";
    //var textLogo = addImage(textLogoSrc);
    //textLogo.className = "card-logo";

    var endBtn=document.createElement("div");
    var endBtnInner=document.createElement("div");
    var endBtnImg=addImage(endcard1BtnSrc, true);
    
    var endText = addTextCss("simpleCardText", app.data.endCard1CtaText);

    logo.classList.add("card-logo");

    objects.simpleImage = endBtnImg;

    endBtn.className = "endcard1-btn-holder";
    endBtnInner.className = "endcard1-btn";
    endBtnInner.appendChild(endBtnImg);
    endBtnInner.appendChild(endText);

    endBtn.appendChild(endBtnInner);
    innerDiv.appendChild(logo);
    //innerDiv.appendChild(textLogo);
    innerDiv.appendChild(endBtn);
    
    if(data.hasBottomBanner){
        //div.style.height="90%";
    }
    
    div.appendChild(innerDiv);
    parent.appendChild(div);
    
    objects.endCard=div;
    objects.endCardButton=endBtn;
    objects.endCardButtonInner=endBtnInner;
}






function addSimpleButton(str = "COLLECT", bgColor = "#ff0000"){
    
    let btn = document.createElement("div");
    let text = document.createElement("span");

    text.innerHTML = str;
    btn.style.background = bgColor;
    
    btn.className = "simple-btn";

    btn.appendChild(text);
    //bg.style.background = colorBot;

    btn.resize = function(){
        let bgWidth = btn.clientWidth || 200;
        let bgHeight = btn.clientHeight || 60;
        scaleElement(text, bgWidth, bgHeight, 0.8, 0.8,1);

        text.style.left = (bgWidth*0.5 - text.curWidth*0.5) + "px";
        text.style.top = (bgHeight*0.5 - text.curHeight*0.5) + "px";

    }

    setTimeout(function(){
        btn.resize();
    }, 1500);
    
    return btn;
}


function addRetroButton(str="Continue",colorTop = "#ff0000", colorBot="#990000"){
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
        let bgWidth = btn.clientWidth || 250;
        scaleElement(text, bgWidth, 50, 0.9, 0.9,1);

        text.style.left = (bgWidth*0.5 - text.curWidth*0.5) + "px";

    }
    
    return btn;
}

function addSvgButton(str="Continue", foreColor = "#52CC53", backColor = "#288627", scale){

    let btn = document.createElement("div");
    btn.className = "svg-button";

    let inner = document.createElement("div");
    inner.style.width = "100%";
    inner.style.height = "100%";

    if(scale)inner.style.transform = "scale("+scale+")";

    let svgText = buttonSvg2;
    svgText = svgText.replace("foreColor", foreColor);
    svgText = svgText.replace("backColor", backColor);

    let fakeId = "id"+Math.floor(Math.random()*10000)
    svgText = svgText.replace( "buttonId", fakeId );
    svgText = svgText.replace( "buttonId", fakeId );

    inner.innerHTML = svgText;

    let text = document.createElement( "span" );
    text.innerHTML = str;

    inner.appendChild(text);
    btn.append(inner);

    btn.resize = function( resizeAgain ){
        let bgWidth = 484;
        let bgHeight = 137;
        scaleElement(text, bgWidth, bgHeight, 0.8, 0.8,1);

        //0.49
        text.style.left = (bgWidth * 0.51 - text.curWidth * 0.5) + "px";
        text.style.top = (bgHeight * 0.44 - text.curHeight * 0.5) + "px";

        if(!resizeAgain)return;

        setTimeout(function(){
            //btn.resize();
        }, 500);

        setTimeout(function(){
            btn.resize();
        }, 1000);


    }

    setTimeout(function(){
        btn.resize( true );
    },1000)
    
    

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



var tutorialSvg = `<svg id="dragtomove" image-rendering="auto" baseProfile="basic" version="1.1" x="0px" y="0px" width="780" height="405" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Sahne-1-copyr1" overflow="visible"><path id="Layer1_0_1_STROKES" stroke="#000" stroke-width="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="10" fill="none" d="M389.5 122.2Q406.4 109.15 437.9 84.3 465.35 62.65 479.4 52.7 499.1 38.8 516.1 30.3 534.75 20.95 556.6 14.85 593.35 4.6 618.25 18.55 641.55 31.75 650.6 67.3 655.6 86.9 657 123.4 658.4 160.5 655.4 178.85 650.25 210.9 631.45 223.2 620.05 230.6 602.4 229.45 577.7 227.8 535.35 210.3 496.65 194.3 460.4 171.7 434.6 155.6 391.15 123.4 390.35 122.8 389.5 122.2 385.85 125 382.85 127.3 339.05 160.8 308.15 179.55 285.1 193.55 262 203.4 237.95 213.6 229.3 216.95 212.8 223.4 201.25 226.25 173.7 233.05 155 223.35 128.05 209.35 118.65 168.5 114.65 151.25 114.7 131.85 114.75 113.6 118.25 97.25 123.15 74.3 132.15 55.75 149.3 20.4 176.8 10.5 191.9 5.1 211.5 9.95 230.15 14.55 256.3 29.45 279.4 42.65 314.95 67.75 338.05 84.1 389.5 122.2Z"/><path id="Layer2_0_1_STROKES" stroke="#FFF" stroke-width="5" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="10" fill="none" d="M389.5 122.2Q406.4 109.15 437.9 84.3 465.35 62.65 479.4 52.7 499.1 38.8 516.1 30.3 534.75 20.95 556.6 14.85 593.35 4.6 618.25 18.55 641.55 31.75 650.6 67.3 655.6 86.9 657 123.4 658.4 160.5 655.4 178.85 650.25 210.9 631.45 223.2 620.05 230.6 602.4 229.45 577.7 227.8 535.35 210.3 496.65 194.3 460.4 171.7 434.6 155.6 391.15 123.4 390.35 122.8 389.5 122.2 385.85 125 382.85 127.3 339.05 160.8 308.15 179.55 285.1 193.55 262 203.4 237.95 213.6 229.3 216.95 212.8 223.4 201.25 226.25 173.7 233.05 155 223.35 128.05 209.35 118.65 168.5 114.65 151.25 114.7 131.85 114.75 113.6 118.25 97.25 123.15 74.3 132.15 55.75 149.3 20.4 176.8 10.5 191.9 5.1 211.5 9.95 230.15 14.55 256.3 29.45 279.4 42.65 314.95 67.75 338.05 84.1 389.5 122.2Z"/><g id="Symbol-1" transform="translate(109.1 102.45)">
<animateTransform attributeName="transform" additive="replace" repeatCount="indefinite" type="translate" dur="2.5s" keyTimes="0;.01299;.013;.02699;.027;.03999;.04;.05299;.053;.06699;.067;.07999;.08;.09299;.093;.10699;.107;.11999;.12;.13299;.133;.14699;.147;.15999;.16;.17299;.173;.18699;.187;.19999;.2;.21299;.213;.22699;.227;.23999;.24;.25299;.253;.26699;.267;.27999;.28;.29299;.293;.30699;.307;.31999;.32;.33299;.333;.34699;.347;.35999;.36;.37299;.373;.38699;.387;.39999;.4;.41299;.413;.42699;.427;.43999;.44;.45299;.453;.46699;.467;.47999;.48;.49299;.493;.50699;.507;.51999;.52;.53299;.533;.54699;.547;.55999;.56;.57299;.573;.58699;.587;.59999;.6;.61299;.613;.62699;.627;.63999;.64;.65299;.653;.66699;.667;.67999;.68;.69299;.693;.70699;.707;.71999;.72;.73299;.733;.74699;.747;.75999;.76;.77299;.773;.78699;.787;.79999;.8;.81299;.813;.82699;.827;.83999;.84;.85299;.853;.86699;.867;.87999;.88;.89299;.893;.90699;.907;.91999;.92;.93299;.933;.94699;.947;.95999;.96;.97299;.973;.98699;.987;1" values="109.1,102.45;109.1,102.45;111.65,78.5;111.65,78.5;119.15,55.6;119.15,55.6;129.8,34.15;129.8,34.15;144.55,15.45;144.55,15.45;164.4,2;164.4,2;188.1,-2.3;188.1,-2.3;212,2.65;212,2.65;234.6,12.4;234.6,12.4;256,24.35;256,24.35;276.85,37.6;276.85,37.6;297.2,51.35;297.2,51.35;317.35,65.65;317.35,65.65;337.7,80.4;337.7,80.4;357.7,95.1;357.7,95.1;377.35,109.65;377.35,109.65;396.7,123.85;396.7,123.85;415.95,137.65;415.95,137.65;435.5,151.15;435.5,151.15;455.65,164.1;455.65,164.1;476.55,176.25;476.55,176.25;498.05,187.4;498.05,187.4;520.05,197.5;520.05,197.5;542.25,206.4;542.25,206.4;564.7,213.85;564.7,213.85;587.95,218.85;587.95,218.85;611.8,218;611.8,218;632.3,204.75;632.3,204.75;643.7,182.45;643.7,182.45;648.05,157.65;648.05,157.65;648.8,132.25;648.8,132.25;648.1,107.3;648.1,107.3;646.25,83.05;646.25,83.05;642.4,59.05;642.4,59.05;634.3,36.05;634.3,36.05;620.05,16.25;620.05,16.25;598.9,3.85;598.9,3.85;574.3,.55;574.3,.55;557.5,2.55;557.5,2.55;541.2,6.85;541.2,6.85;525.35,12.35;525.35,12.35;510,19.05;510,19.05;495.05,27;495.05,27;480.6,36;480.6,36;466.6,45.7;466.6,45.7;452.7,56.05;452.7,56.05;439.1,66.55;439.1,66.55;425.85,77;425.85,77;412.85,87.2;412.85,87.2;399.9,97.35;399.9,97.35;386.9,107.5;386.9,107.5;373.65,117.7;373.65,117.7;360.4,127.75;360.4,127.75;347.1,137.5;347.1,137.5;333.6,147.15;333.6,147.15;319.9,156.5;319.9,156.5;305.9,165.6;305.9,165.6;291.55,174.25;291.55,174.25;276.8,182.3;276.8,182.3;261.7,189.7;261.7,189.7;246.4,196.35;246.4,196.35;231.35,202.65;231.35,202.65;216.15,208.7;216.15,208.7;200.4,214.1;200.4,214.1;184.2,217.95;184.2,217.95;167.55,218.95;167.55,218.95;151.75,215.75;151.75,215.75;137.7,207.8;137.7,207.8;126.25,196.15;126.25,196.15;117.85,181.95;117.85,181.95;112.1,166.6;112.1,166.6;108.45,150.75;108.45,150.75;106.45,134.6;106.45,134.6;106.1,118.4;106.1,118.4;109.1,102.45;109.1,102.45" calcMode="discrete" fill="freeze"/>
<image id="drag-hand" overflow="visible" xlink:href="img/hand.png" height="431" width="300" transform="matrix(.424 0 0 .424 0 0)"/>
</g></g></svg>`;


var tutorialSvg2 = `<?xml version="1.0" encoding="utf-8"?><svg id="dragtomove" image-rendering="auto" baseProfile="basic" version="1.1" x="0px" y="0px" width="780" height="405" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Sahne-1-copyr1" overflow="visible"><path fill="#FFF" stroke="none" d="M661.9 87.1Q660.4 82.85 656.75 76.3 649.5 63.15 638.9 51.5 624.1 35.2 604.85 24.25 580.75 10.55 551 6.05 546 5.25 537.45 5.25 520.35 5.2 502.75 9.25 478.15 14.9 456.1 27.85 428.55 44.05 406.6 70.75L438.9 121.05 440.95 118.3Q443.6 114.8 446.85 111.05 457.2 99.2 469.3 89.75 486.15 76.55 504.05 70.05 526.4 61.9 549 64.8 558.85 66.1 567.8 69.95 587.85 78.6 601.35 98.7 608.6 109.5 612.45 121.05 619.65 142.7 615.4 165.75 611.45 187.15 599.3 202.4 594.8 208 591 211.5 584.05 217.85 575.75 221.55 569.65 224.25 562.5 225.65 558.25 226.45 551 227.15 540.55 228.15 530.25 227.15 514.35 225.6 498.25 218.8 488.4 214.6 479.6 209 468.45 201.85 458.85 191.75 452.85 185.5 439.5 168.9 433.35 161.3 427.15 152.4 423.25 146.9 414.9 134.4 410.65 128.05 400.6 112.25 396.2 104.85 391.3 97.3 381.75 82.7 371.5 69.95 369.85 67.95 365 62.2 349.55 44.5 331.15 30.7L331.1 30.7Q312.1 17.5 290.1 10.55 275.35 5.85 259.8 4.15 234.4 2.35 209.95 8.95 192.3 13.7 176.2 22.6 164.7 29 154.5 37.25 149.95 40.8 143.6 47.65 130.9 61.35 121.9 77.95 109.2 101.15 105.7 126.8 101.25 158.85 111.4 192.85 116.7 209.6 125.45 224.45 136.45 243.1 152.5 258.15 164 268.9 177.6 277.4 196.1 288.25 216.7 292.55 239.8 297.4 263.7 293.7 279.25 291.3 294.1 285.4 302.3 283.2 315.85 275.1 342.95 258.95 369.9 229.55L340 176.1Q323.4 201.05 299.1 216.25 289.6 222.25 282.45 225.4 271.15 230.45 259 232.35 239.85 235.25 222.05 229.85 200 223.1 183.65 204.6 174.65 194.4 168.85 182.45 167.75 179.6 166.45 174.75 163.9 165.1 162.95 155.25 159.95 123.75 174.45 102.3 180.15 93.4 188.2 85.95 201.7 73.35 218.85 67.65 232.4 63.15 246.9 63.4 256.75 63.6 266.2 66 269.65 66.85 274.8 68.75 284.15 72.3 291.7 77.1 305.5 85.85 319.6 103.55 329.6 116.15 345.1 140.65 366.3 174.2 372.05 182.65 388.65 207.1 404.4 224.1 421.05 242.05 434.1 252.4 456.15 269.85 481.6 279 506.3 287.85 529.95 289.7 575.2 293.15 609.75 271.55 626.4 261.15 639.35 245.6 648.3 234.8 655.1 221.95 657.7 218.4 661 211.9 667.65 198.8 671.4 183.85 683.35 136 661.9 87.1Z"/><g id="Symbol-1" transform="translate(122.7 133.45)">
<animateTransform attributeName="transform" additive="replace" repeatCount="indefinite" type="translate" dur="2.5s" keyTimes="0;.01299;.013;.02699;.027;.03999;.04;.05299;.053;.06699;.067;.07999;.08;.09299;.093;.10699;.107;.11999;.12;.13299;.133;.14699;.147;.15999;.16;.17299;.173;.18699;.187;.19999;.2;.21299;.213;.22699;.227;.23999;.24;.25299;.253;.26699;.267;.27999;.28;.29299;.293;.30699;.307;.31999;.32;.33299;.333;.34699;.347;.35999;.36;.37299;.373;.38699;.387;.39999;.4;.41299;.413;.42699;.427;.43999;.44;.45299;.453;.46699;.467;.47999;.48;.49299;.493;.50699;.507;.51999;.52;.53299;.533;.54699;.547;.55999;.56;.57299;.573;.58699;.587;.59999;.6;.61299;.613;.62699;.627;.63999;.64;.65299;.653;.66699;.667;.67999;.68;.69299;.693;.70699;.707;.71999;.72;.73299;.733;.74699;.747;.75999;.76;.77299;.773;.78699;.787;.79999;.8;.81299;.813;.82699;.827;.83999;.84;.85299;.853;.86699;.867;.87999;.88;.89299;.893;.90699;.907;.91999;.92;.93299;.933;.94699;.947;.95999;.96;.97299;.973;.98699;.987;1" values="122.7,133.45;122.7,133.45;123.95,112.65;123.95,112.65;130.2,92.65;130.2,92.65;140.15,74;140.15,74;153.2,57.5;153.2,57.5;168.65,43.35;168.65,43.35;186.25,32;186.25,32;205.7,24.05;205.7,24.05;226.4,19.85;226.4,19.85;247.4,19.15;247.4,19.15;268.15,21.75;268.15,21.75;288.15,28.1;288.15,28.1;306.7,38.05;306.7,38.05;320.2,53.8;320.2,53.8;331.9,71.25;331.9,71.25;343.65,88.75;343.65,88.75;355.4,106.2;355.4,106.2;367.15,123.65;367.15,123.65;378.9,141.1;378.9,141.1;390.65,158.55;390.65,158.55;402.35,176;402.35,176;413.9,193.6;413.9,193.6;425.2,211.35;425.2,211.35;439.35,226.95;439.35,226.95;455.7,240;455.7,240;474.1,250;474.1,250;494.15,256.4;494.15,256.4;525.85,259.2;525.85,259.2;557.1,254.15;557.1,254.15;585.95,240.7;585.95,240.7;610.2,220;610.2,220;628.5,194.2;628.5,194.2;639.05,164.1;639.05,164.1;641.3,132.35;641.3,132.35;635.7,101.2;635.7,101.2;621.6,72.6;621.6,72.6;600.5,48.7;600.5,48.7;574.3,30.75;574.3,30.75;557.2,24.1;557.2,24.1;539.25,20.2;539.25,20.2;520.95,19;520.95,19;502.8,20.3;502.8,20.3;485,24.3;485,24.3;468,31.1;468,31.1;452.3,40.6;452.3,40.6;440.5,54.35;440.5,54.35;430.45,69.65;430.45,69.65;420.4,85;420.4,85;410.4,100.35;410.4,100.35;400.35,115.65;400.35,115.65;390.3,131;390.3,131;380.3,146.35;380.3,146.35;370.25,161.7;370.25,161.7;360.2,177;360.2,177;350.15,192.35;350.15,192.35;340.2,207.75;340.2,207.75;328.5,221.85;328.5,221.85;315.05,234.15;315.05,234.15;299.95,244.4;299.95,244.4;283.3,252.1;283.3,252.1;265.6,257;265.6,257;247.35,259.1;247.35,259.1;229.1,258.7;229.1,258.7;211.1,255.7;211.1,255.7;193.8,249.85;193.8,249.85;177.15,241.95;177.15,241.95;166.1,232.9;166.1,232.9;155.65,223.35;155.65,223.35;146.35,212.8;146.35,212.8;138.25,201.3;138.25,201.3;131.55,188.8;131.55,188.8;126.5,175.5;126.5,175.5;123.2,161.7;123.2,161.7;121.5,147.6;121.5,147.6;122.7,133.45;122.7,133.45" calcMode="discrete" fill="freeze"/>
<image id="drag-hand" overflow="visible" xlink:href="img/hand.png" height="431" width="300" transform="matrix(.424 0 0 .424 0 0)"/></g></g></svg>`;

var buttonSvg = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="484px" height="137px" viewBox="0 0 484 137">
<defs>
<g id="buttonId">
<path fill="backColor" stroke="none" d="
M 483.9 39.4
L 478.25 32.25 426 122.85 32.3 122.85 0 91.1 30.2 136.15 433.65 136.15 483.9 39.4 Z"/>

<path fill="foreColor" stroke="none" d="
M 478.25 32.25
L 447.5 0 45.1 0 0 91.1 32.3 122.85 426 122.85 478.25 32.25 Z"/>
</g>
</defs>

<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#buttonId"/>
</g>
</svg>
`;


var buttonSvg2 = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="484px" height="136px" viewBox="0 0 484 136">
<defs>
<g id="buttonId">
<path fill="backColor" stroke="none" d="
M 484 64.5
L 458.6 124 25.4 124 0 64.5 17.25 136 466.75 136 484 64.5 Z"/>

<path fill="foreColor" stroke="none" d="
M 484 64.5
L 458.6 0 25.4 0 0 64.5 25.4 124 458.6 124 484 64.5 Z"/>
</g>
</defs>

<g transform="matrix( 1, 0, 0, 1, 0,0) ">
<use xlink:href="#buttonId"/>
</g>
</svg>
`;







export default classicUi;







