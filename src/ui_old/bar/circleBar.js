import './circle.css';
import './circleBar.css';
import helper from '../helper';

function circleBar(
    parent, bgColor, fillColor, imageSrc, fillInside= true,
    innerWidth=80, strokeWidth=30, strokeWidthTop = 24, maxWidth= 0.2, maxHeight=0.13
){
    let holder = document.createElement("div");
    holder.className = "circle-bar";
    //holder.style.background = bgColor;

    let svgCircle = document.createElement("div");
    svgCircle.className = "svg-circle";

    let width = innerWidth *2+strokeWidth;
    holder.width = width;

    let radius = Math.round(width*0.5);
    let cx = radius;

    svgCircle.style.width = width + "px";
    svgCircle.style.height = width + "px";
    
    svgCircle.innerHTML = `
    <svg
        class="progress-ring"
        width="${width}"
        height="${width}">
        <circle
        class="progress-ring__circle"
        stroke="${bgColor}"
        stroke-width="${strokeWidth}"
        fill="${fillInside ? bgColor : transparent}"
        r="${innerWidth}"
        cx="${cx}"
        cy="${cx}"/>
    </svg>
    <svg
        id="top-ring" 
        class="progress-ring"
        width="${width}"
        height="${width}">
        <circle
        class="progress-ring__circle"
        stroke="${fillColor}"
        stroke-width="${strokeWidthTop}"
        fill="transparent"
        r="${innerWidth}"
        cx="${cx}"
        cy="${cx}"/>
    </svg>
    `;
    
    let img = helper.addImage( imageSrc );
    svgCircle.appendChild( img );
    holder.appendChild( svgCircle );

    img.style.maxWidth = radius*0.8+"px";
    img.style.maxHeight = radius*0.8+"px";
    parent.appendChild(holder);


    let circle = document.getElementById('top-ring');
    circle.style.transform= "rotate(-90deg) scale(1,-1)";
    let circumference = innerWidth * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    holder.updateFill = function(percent){
        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;
    }

    holder.updateFill(100);

    

    holder.resize = function(w,h){

        

        let bgWidth = width;

        

        let scale = Math.min(w*maxWidth/bgWidth, h*maxHeight/bgWidth);

        bgWidth *= scale;
        
        holder.style.transform = "scale("+scale+")";

        holder.style.left = w * 0.5 - bgWidth * 0.7 * scale + "px";
        holder.style.top = h * 0.3 - bgWidth * 0.5 * scale+ "px";

        holder.curWidth = bgWidth;
        holder.curScale = scale;
    }



    return holder;
}


export default circleBar;