import './restartEndCard.css';
import helper from '../helper';



function restartEndCard( parent, niceGameSrc, retrySrc, orSrc, downloadSrc ){
    
    var card= document.createElement("div");
    card.className="restartend-card screen cover hide";
    
    var innerDiv= document.createElement("div");
    
    var endText = helper.addImage(niceGameSrc);
    
    var retryBtn = helper.addImage(retrySrc, true);
    retryBtn.className="bounce retry";
    
    var orText = helper.addImage(orSrc);
    orText.className="or-text";
    
    var downloadBtn = helper.addImage(downloadSrc, true);
    downloadBtn.className="bounce download";
    
    
    innerDiv.appendChild(endText);
    innerDiv.appendChild(retryBtn);
    innerDiv.appendChild(orText);
    innerDiv.appendChild(downloadBtn);
    
    card.appendChild(innerDiv);
    parent.appendChild(card);

    card.ctaBtn = downloadBtn;
    card.retryBtn = retryBtn;

    return card;
}


export default restartEndCard;