import alrightSrc from '../../assets/ui/end_card0/alright.png';
import simpleContinueSrc from '../../assets/ui/end_card0/simple_continue.png';


//import niceGameSrc from '../../assets/ui/end_card1/nice_game.png';
/*import niceGameSrc from '../../assets/ui/end_card1/nice_game2.png';
import downloadSrc from '../../assets/ui/end_card1/download.png';
import orSrc from '../../assets/ui/end_card1/or.png';
import retrySrc from '../../assets/ui/end_card1/retry.png';

*/




import starBgSrc from '../../assets/ui/end_card1/star.jpg';
import hatSrc from '../../assets/ui/end_card1/hat.png';
import glowSrc from '../../assets/ui/end_card1/glow.png';


import install0Src from '../../assets/ui/install0.png';
import install1Src from '../../assets/ui/install1.png';
import install2Src from '../../assets/ui/install2.png';



/*
////TEXTS
import perfectSrc from '../../assets/ui/texts/perfect.png';
import bestSrc from '../../assets/ui/texts/best.png';
import newBestSrc from '../../assets/ui/texts/new_best.png';
import goSrc from '../../assets/ui/texts/go.png';
import readySrc from '../../assets/ui/texts/ready.png';
*/


import boostBarSrc from '../../assets/ui/boost_bar.png';

import handSrc from '../../assets/ui/hand.png';




var classicUi={};

var parent,objects={},main;


var installButtons={
    install0Src,
    install1Src,
    install2Src,
    //install3Src,
    //install4Src,
};


classicUi.objects=objects;

classicUi.init=function(data,parentNode,mainObj){
    parent=parentNode;
    main=mainObj;
    
    addBanner(data);
    
    addMeterText();
    
    addBoostBar(data);
    
    addTutorial.call(this,data);
    
    
    var tapToStart = document.createElement( "p" );
    tapToStart.innerHTML = "TAP TO START";
    tapToStart.className = "tap-to-start";
    objects.tapToStart = tapToStart;
    parent.appendChild(tapToStart);
    
    
    
    addTextCss("ready" , "READY" , "text-center text-big text-hide");
    addTextCss("go" , "GO" , "text-center text-big text-hide");
    
    addTextCss("perfect" , "PERFECT" , "text-center text-big text-hide");
    addTextCss("best" , "BEST" , "text-center text-big text-hide");
    addTextCss("new_best" , "NEW BEST!" , "text-center text-big text-hide");
    
    objects.perfect.style.transform = "scale(1) rotate(-45deg)";
    //objects.perfect.classList.remove("text-hide");
    objects.perfect.style.left="unset";
    objects.perfect.style.right="-2%";
    objects.perfect.style.bottom="24%";
    objects.perfect.style.textAlign="none";
    
    
    //objects.ready.classList.remove("text-hide");
    
    
    
    if(data.endCardNo==0){
        addSimpleEndCard(data);
        if(data.hasTryAgain){
            addEndCard1(true,data);
        }
    }
    else if(data.endCardNo==1){
        addEndCard1(false,data);
    }

    


    //addRestartCard(data);

    addButtonOrBottomBanner(data);
    
    
}

classicUi.startCountDown=function(callback){
    
    let imgNo=0;
    let first= objects.countDownImages[imgNo];
    
    
    //first.classList.add("show");
    first.style.display="block";
    
    console.log(first);
    function changeElement(){
        console.log("change")
        let cur= objects.countDownImages[imgNo];
        let next= objects.countDownImages[imgNo+1];
        
        setTimeout(function(){
            imgNo++;
            //cur.classList.remove("show");
            cur.style.display="none";
            if(next){
                //next.classList.add("show");
                next.style.display="block";
                changeElement();
            }
            else{
                callback();
            }
            
        },1000);
        
    }
    
    changeElement();
}

classicUi.sortScoreBoard=function(list){

    if(!objects.scoreBoard){
        return;
    }
    let no=1;
    for(var obj of list){
    //for(var i= list.length-1;i>=0;i--){
        //let obj= list[i];
        
        var name= obj.name;
        
        var div=objects[name+"Head"];
        var span=objects[name+"Text"];
        
        objects.scoreBoard.appendChild(div);
        span.innerHTML=no+".";
        no++;
    }
}


function addText(name , src , className){
    let img = addImage( src );
    img.className=className;
    parent.appendChild(img);
    
    objects[ name ] = img;
    
}

function addTextCss(name , str , className){
    let p = document.createElement( "p" );
    p.className=className;
    p.innerHTML = str;
    parent.appendChild(p);
    
    objects[ name ] = p;
    
    return p;
}


function addMeterText(){
    let p = document.createElement( "p" );
    p.innerHTML = "0m";
    p.className = "meter-text hide";
    parent.appendChild(p);
    objects.meterText = p;

    p.defaultWidth = p.clientWidth;
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
    
    
    //setStyle("banner-text","font-size",data.fontSize+"px");
    //setStyle("banner-text","height",(Number(data.fontSize)+5)+"px");
    
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
        
        objects.banner=div;
        objects.bannerText=p;
        
        setStyle(p,"-webkit-text-stroke",data.bannerBgColor.replace("0x","#")+" 1px");

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


function addBoostBar(data){
    
    let div= document.createElement("div");
    div.id="boost-bar";
    let boostBg= addImage(boostBarSrc);
    
    //let boost= addImage(boostBarSrc);
    let cover=document.createElement("span");
    
    div.appendChild(boostBg);
    div.appendChild(cover);
    
    parent.appendChild(div);
    
    div.className="hide";
    
    objects.boostDiv=div;
    objects.boostCover=cover;
    return;
    
    //setStyle("banner-text","font-size",data.fontSize+"px");
    //setStyle("banner-text","height",(Number(data.fontSize)+5)+"px");
    /*
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
        
        objects.banner=div;
        objects.bannerText=p;
        
        setStyle(p,"font-size",data.fontSize+"px");
        setStyle(p,"height",(Number(data.fontSize)+5)+"px");
    }
    */
}



function addTutorial(data){
    
    if(data.hasTutorial){
        //var tutorialDiv= document.createElement("div");
        //tutorialDiv.className="hand";
        
        let hand= addImage(handSrc);
        hand.classList.add("hand");
        hand.classList.add("hide");
        parent.appendChild(hand);
        
        objects.hand=hand;
        
        this.tutorialOn=true;
    }
    
    
    /*
    if(data.hasTutorial){
        var tutorialDiv= document.createElement("div");
        tutorialDiv.className="tutorial";
        
        let img= addImage(tutorialSrc);
        
        tutorialDiv.appendChild(img);
        parent.appendChild(tutorialDiv);
        
        objects.tutorial=tutorialDiv;
        
        this.tutorialOn=true;
    }
    
    if(data.showHand){
        let handDiv= document.createElement("div");
        handDiv.className="hand";
        
        let img= addImage(handSrc);
        
        handDiv.appendChild(img);
        parent.appendChild(handDiv);
        
        objects.hand=handDiv;
    }*/
}


function addRestartCard(data){
    if(data.hasTryAgain){
        var div = document.createElement("div");
        div.className = "restart-card screen cover hide";

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
        
        objects.restartCard=div;
        objects.restartCardButton=downloadBtn;
        objects.restartCardRetryButton=retryBtn; 
    }
}

function addEndCard1(asRestartCard,data){
    console.log( "END CARD 1")
    var div= document.createElement("div");
    div.className="end-card2 screen cover hide";
    
    var innerDiv= document.createElement("div");
    
    objects.glowSrc = glowSrc;
    objects.glowDiv = innerDiv;
    ////FIRST DIV
    var starBg= document.createElement("div");
    starBg.className = "star-bg";
    starBg.style.background = 'url('+starBgSrc+')';
    
    var hatUnlocked = addTextCss("hat","HAT UNLOCKED!","hat-unlocked");
    var hat = addImage(data.endHatSrc||hatSrc,false);
    hat.classList.add("hat");

    innerDiv.appendChild(starBg);
    innerDiv.appendChild(hatUnlocked);
    innerDiv.appendChild(hat);
    
    ////SECOND DIV
    var moneyDiv = document.createElement("div");
    moneyDiv.className = "money-div";

    var moneyText = addTextCss("money","$499","money-text");
    moneyDiv.appendChild(moneyText);
    innerDiv.appendChild(moneyDiv);

    ////CTA DIV
    var ctaDiv = document.createElement("div");
    ctaDiv.className = "cta-div";
    

    var collectBtn = document.createElement("div");
    collectBtn.innerHTML = "<span>COLLECT</span>";
    collectBtn.className = "card2-btn yellow-btn";

    collectBtn.style.marginTop="30px";


    var retryBtn = document.createElement("div");
    retryBtn.innerHTML = "<span>RETRY</span>";
    retryBtn.className = "card2-btn";

    retryBtn.style.marginTop="15px";

    ctaDiv.appendChild(collectBtn);
    ctaDiv.appendChild(retryBtn);
    innerDiv.appendChild(ctaDiv);


    retryBtn.style.transform = "scale(0.8)";

    div.appendChild(innerDiv);
    parent.appendChild(div);

    if(asRestartCard){
        objects.restartCard=div;
        objects.restartCardButton=collectBtn;
        objects.restartCardRetryButton=retryBtn;
    }
    else{
        objects.endCard=div;
        objects.endCardButton=collectBtn;
        objects.endCardRetryButton=retryBtn;
    }

    

    
}

function addSimpleEndCard(data){
    var div= document.createElement("div");
    div.className="end-card screen cover hide";
    
    var innerDiv= document.createElement("div");
    
    var endText=addImage(alrightSrc);
    
    var endBtn=addImage(simpleContinueSrc, true);
    
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

    //item= document.getElementById(id);

    
    if(item){
        item.style[styleName]=value;
    }
}


export default classicUi;







