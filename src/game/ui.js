import UiHelper from "../ui/uiHelper";
import Banner from "../ui/core/banner";
import BottomBanner from "../ui/core/bottomBanner";
import TexturedButton from "../ui/buttons/textured";

import handImage from "../../assets/ui/handgif.gif";
import playNow from "../../assets/ui/playnow.png";

var main;

class Ui {
  constructor(div) {
    main = app.main;
    this.div = div;
    var uiHelper = new UiHelper(div);
    this.uiHelper = uiHelper;
  }

  initTutorial() {
    let image1 = document.createElement("img");
    image1.id = "hand";

    image1.src = handImage;
    document.getElementById("ui").append(image1);

    let image2 = document.createElement("img");
    image2.id = "playnow";

    image2.src = playNow;
    document.getElementById("ui").append(image2);
  }

  prepare() {
    ////BANNER
    let banner = new Banner("SOME TEXT HERE", "#ffffff", "#333333");
    this.uiHelper.add(banner, true);

    this.initTutorial();

    ///BOTTOM BANNER
    let bb = new BottomBanner(require("../../assets/ui/bottomBanner0.png"));
    this.uiHelper.add(bb, true, main.gotoLink);

    /*
        ////BUTTON
        let btn = new TexturedButton("PLAY NOW!", require('../../assets/ui/bottomBanner0.png'), "#ff0000");
        this.uiHelper.add(btn, true);
        */

    //btn.css("opacity", 0.5);
    //btn.attr("data-asd", "asd"); ///sets attribute
    //btn.attr("data-asd"); ///gets attribute

    /*
        btn, bb, banner aren't dom objects. to use dom object of them use
        btn.wrapper 
        bb.wrapper
        banner.wrapper
        */
  }

  resize(w, h) {
    this.uiHelper.resize(w, h);
    if (w > h) document.getElementById("hand").style.width = "30%";
    else document.getElementById("hand").style.width = "75%";
  }

  addEndCard() {}

  show() {
    this.div.classList.add("hide");
    this.div.classList.remove("show");
  }

  hide() {
    this.div.classList.add("show");
    this.div.classList.remove("hide");
  }
}

export default Ui;
