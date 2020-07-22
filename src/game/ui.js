import UiHelper from "../ui/uiHelper";
import Banner from "../ui/core/banner";
import BottomBanner from "../ui/core/bottomBanner";
import TexturedButton from "../ui/buttons/textured";

import handImage from "../../assets/ui/handgif.gif";
import playNow from "../../assets/ui/playnow.png";
import continueImg from "../../assets/ui/continue.png";
import tryAgain from "../../assets/ui/tryagain.png";
import goodJob from "../../assets/ui/goodjob.png";

var main;

class Ui {
  constructor(div) {
    main = app.main;
    this.div = div;
    var uiHelper = new UiHelper(div);
    this.uiHelper = uiHelper;
  }

  static initTutorial() {
    let image1 = document.createElement("img");
    image1.id = "hand";

    image1.src = handImage;
    document.getElementById("ui").append(image1);

    let image2 = document.createElement("img");
    image2.id = "playnow";

    image2.src = playNow;
    document.getElementById("ui").append(image2);
  }

  static endTutorial() {
    let image3 = document.createElement("img");
    image3.id = "continue";

    image3.src = continueImg;
    document.getElementById("ui").append(image3);

    let image4 = document.createElement("img");
    image4.id = "tryagain";

    image4.src = tryAgain;
    document.getElementById("ui").append(image4);
  }

  static goodJob() {
    let image5 = document.createElement("img");
    image5.id = "goodjob";

    image5.src = goodJob;
    document.getElementById("ui").append(image5);
  }

  static hideHandTutorial() {
    let hand = document.getElementById("hand");
    hand.style.display = "none";
  }

  static hideButtonTutorial() {
    let playNow = document.getElementById("playnow");
    playNow.style.display = "none";
  }

  static showHandTutorial() {
    let hand = document.getElementById("hand");
    hand.style.display = "block";
  }

  static showButtonTutorial() {
    let playNow = document.getElementById("playnow");
    playNow.style.display = "block";
  }

  prepare() {
    Ui.initTutorial();
    Ui.hideButtonTutorial();
  }

  resize(w, h) {
    this.uiHelper.resize(w, h);
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
