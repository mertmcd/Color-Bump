var helper = {};


helper.addImage = function(src , isInteractive){
    let img= document.createElement("img");
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


helper.addTextCss = function( str , className = "" ){
    let p = document.createElement( "p" );
    p.className = className;
    p.innerHTML = str;
    
    return p;
}


helper.scaleElement = function(el, w, h, ratiox, ratioy, maxScale){
    if(!el)return;

    let ew = el.clientWidth;
    let eh = el.clientHeight;

    let scale = Math.min( w*ratiox/ew, h*ratioy/eh );

    if(maxScale && scale > maxScale)scale = maxScale;

    el.style.transform = "scale("+scale+")";

    el.curWidth = ew*scale;
    el.curHeight = eh*scale;
    el.curScale = scale;

}



helper.addElement = function(tag,html,styles={},attrs={}){
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



helper.setStyle = function(id,styleName,value){
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


export default helper;