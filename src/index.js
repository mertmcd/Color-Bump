
import "./css/style_core.css";
import "./css/gear.css";
import "./css/style.css";

//import 'pepjs';
///sound
//import {Howl, Howler} from 'howler';

var THREE = require('three');


window.THREE = THREE;

require('./utils/AnimUtilsFix');

require('three/examples/js/loaders/GLTFLoader');
//require('./utils/GPUParticleSystem');
require('three/examples/js/controls/OrbitControls');
require('three/examples/js/utils/SkeletonUtils');

require('three-ziploader');
require('./utils/TrailRenderer');

//import Main from './three_main';
import Main from './threecannon_main';

import Game from './game/game';
var game = new Game();

var disableBodyScroll = require('body-scroll-lock').disableBodyScroll;

var app = {disableBodyScroll};
window.app = app;

app.type = window.type;
if(!app.type){
    app.type=null;
}


var data = {
    ///banner details
    hasBanner: true,
    bannerText:"Stickman Dash!",
    bannerTextColor:"0xffffff",
    bannerBgColor:"0x000000",
    bannerOpacity:1,
    
    hasBottomBanner: true,
    bottomBannerNo: 0,
    bottomBannerOpacity: 1,

    hasTutorial: false,
    tutorialText: "Hold & Drag!",

    hasTryAgain:true,
    numOfChances:1,
    
    ////End card
    endCardNo: 0,
    endCardFullScreenClick: true,
    
    gameButtonText:"Play Now!",//
    gameButtonColor: "#ff0000",//
    gameButtonTextColor: "#ffffff",//
    gameButtonAnimName:"pulse",//
    
    bgColor:"#4B75FF",//4B75FF

    hasGradient:false,
    topGradient:"#4B75FF",
    botGradient:"#ffffff",//87CFE6
    
    
    resolution: 2,
    totalTime: 26,
    hasSound:false,
    
    gotoMarketClickNum:0,///
    gotoMarketAfterTime:0,///

    gotoMarketOnSecondLevel: false,
};


if(window.dashboardParams){
    for(var prop in dashboardParams){
        if(dashboardParams.hasOwnProperty(prop)){
            data[prop]=dashboardParams[prop];
        }
    }
}


data.gotoMarketClickNum = Number(data.gotoMarketClickNum);
data.gotoMarketAfterTime = Number(data.gotoMarketAfterTime);
app.curGoToMarketClickNum = 0;


if(data.endCardNo == 1){
    data.gotoMarketOnSecondLevel = true;
    data.totalTime = 0;
}


app.data=data;

///meaning THREE is ready
function boot(){
    game.boot(main);
}

function init(){
    
    game.init();
    
    /*
    if(app.type!= "mobvista" && data.musicSrc){
        app.music = new Howl({
            src: [data.musicSrc],
            autoplay: true,
            loop:true
        });
    }
    */
    
    function checkMarket(e){
        
        if(app.gotoMarketAtNextClick){
            main.gotoLink();
            return;
        }
        app.curGoToMarketClickNum++;
        
        if(data.gotoMarketClickNum && app.curGoToMarketClickNum>=data.gotoMarketClickNum){
            main.gotoLink();
            return;
        }
        
        if(data.gotoMarketAfterTime && main.time.passed()>data.gotoMarketAfterTime){
            main.gotoLink();
        }
        
        
    }
    
    document.body.addEventListener("touchstart",checkMarket);
    if ('ontouchstart' in document.documentElement) {
        
    }
    else{
        document.body.addEventListener("mousedown",checkMarket);
    }
    
}

function gameResized(w,h,cw,ch){
    game.onResizeCallback(w,h,cw,ch);
}

function noWebGLcallback(){
    
}


var config = {
    totalTime: data.totalTime,
    resolution: data.resolution || 2,//1.5
    FOV: 40,
    cameraFar: 18000,//1800
    gameStartCallback: init,
    resizeCallback: gameResized,
    gameResized,

    nucleo:{title:"Demo Game", genre:"Hyper Casual", version:"9.0.0"},
    
    renderer:{
        antialias: false,
        alpha:true,///transparent
        bgColor: data.bgColor,
        gradient: data.hasGradient ? {top: data.topGradient, bot: data.botGradient, }:null,
        //canvasId:"canvas"
    },
    bgColor: data.bgColor,
    transparent: false,

    //addTwoPhysicsWorld:true,///for matter
    gravity: {x:0,y:-10,z:0},
    noWebGLcallback:noWebGLcallback,
    threeReady:boot,
    
    gamePaused: function(){
        //Howler.mute(true);
    },
    gameContinue: function(){
        //Howler.mute(false);
    },

    timeUp: function(){
        game.endGame(false, "timeup");
    },

    soundChanged: function(){
        
        if(main.soundEnabled){
            //Howler.mute(false);
        }
        else{
            //Howler.mute(true);
        }
    }
}

if(!window.NUC){
    config.nucleo = null;
}

var main = new Main(config);
app.main = main;


if(app.type == "mobvista"){
    
    app.gameStart = function()
    {
        
        main.startTimer();
        main.timeOfStart = new Date().getTime();
        
        if(data.musicSrc){
            app.music = new Howl({
                src: [data.musicSrc],
                autoplay: true,
                loop:true
            });
        }
	}
    
    app.gameClose = function()
    {
        if(!app.music)return;
        app.music.stop();
	}
}

