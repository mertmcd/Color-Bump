import UiHelper from "../ui/uiHelper";
import Banner from "../ui/core/banner";
import BottomBanner from "../ui/core/bottomBanner";
import TexturedButton from "../ui/buttons/textured";

import handImage from "../../assets/ui/handgif.gif";
import playNow from "../../assets/ui/playnow.png";
import continueImg from "../../assets/ui/continue.png";
import tryAgain from "../../assets/ui/tryagain.png";
import goodJob from "../../assets/ui/goodjob.png";
import Game from "./game";
import Globals from "./globals";

var main;

class Ui {
  constructor(div) {
    main = app.main;
    this.div = div;
    var uiHelper = new UiHelper(div);
    this.uiHelper = uiHelper;
    Globals.prepare = this;
  }

  static handGif(value) {
    let hand = document.getElementById("hand");

    if (!hand) {
      let image1 = document.createElement("img");
      image1.id = "hand";
      image1.src = handImage;
      document.getElementById("ui").append(image1);
      hand = document.getElementById("hand");
    }
    if (value === "open" && hand.style.display != "block") hand.style.display = "block";
    else if (value === "close" && hand.style.display != "none") hand.style.display = "none";
  }

  static playNowButton(value) {
    let playButton = document.getElementById("playnow");

    if (!playButton) {
      let image2 = document.createElement("img");
      image2.id = "playnow";
      image2.src = playNow;
      document.getElementById("ui").append(image2);
      playButton = document.getElementById("playnow");
    }
    if (value === "open" && playButton.style.display != "block") playButton.style.display = "block";
    else if (value === "close" && playButton.style.display != "none") playButton.style.display = "none";
  }

  static continueButton(value) {
    let contButton = document.getElementById("continue");

    if (!contButton) {
      let image3 = document.createElement("img");
      image3.id = "continue";

      image3.onmousedown = function () {
        Globals.game.restartGame();
        Globals.ui.prepare();
      };

      image3.src = continueImg;
      document.getElementById("ui").append(image3);
      contButton = document.getElementById("continue");
    }
    if (value === "open" && contButton.style.display != "block") contButton.style.display = "block";
    else if (value === "close" && contButton.style.display != "none") contButton.style.display = "none";
  }

  static tryAgainText(value) {
    let tryText = document.getElementById("tryagain");

    if (!tryText) {
      let image4 = document.createElement("img");
      image4.id = "tryagain";
      image4.src = tryAgain;
      document.getElementById("ui").append(image4);
      tryText = document.getElementById("tryagain");
    }
    if (value === "open" && tryText.style.display != "block") tryText.style.display = "block";
    else if (value === "close" && tryText.style.display != "none") tryText.style.display = "none";
  }

  static goodJobText(value) {
    let gjText = document.getElementById("goodjob");

    if (!gjText) {
      let image5 = document.createElement("img");
      image5.id = "goodjob";
      image5.src = goodJob;
      document.getElementById("ui").append(image5);
      gjText = document.getElementById("tryagain");
    }
    if (value === "open" && gjText.style.display != "block") gjText.style.display = "block";
    else if (value === "close" && gjText.style.display != "none") gjText.style.display = "none";
  }

  prepare() {
    Ui.handGif("open");
  }

  resize(w, h) {
    this.uiHelper.resize(w, h);
  }

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
