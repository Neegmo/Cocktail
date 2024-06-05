import Phaser from "phaser";
import Glass from "./classes/Glass";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  nextShot;

  getNextColorButton;

  colorSequence = ["Pink", "Blue", "Purple", "Orange", "Yellow", "Red"];
  // colorSequence = ["Orange", "Orange","Orange","Orange","Orange","Orange"];

  nextColor;

  bet = 10;

  canGenerateColor = true;

  globalScale = 0.5;

  highestPriceSequence = [2, 8, 15, 50, 100, 500];
  middlePriceSequence = [0.5, 1.25, 3, 5, 10, 20];
  smallestPriceSequence = [0.15, 0.5, 1.5, 2, 5, 10];

  preload() {
    this.loadFont("troika", "Assets/Fonts/troika.otf");

    this.load.baseURL = "Assets/";

    this.load.image("BG", "Images/BG3.png");
    this.load.image("Glass", "Images/Glass.png");
    this.load.image("GlassTop", "Images/GlassTop.png");
    this.load.image("ShotGlass", "Images/ShotGlass.png");
    this.load.image("Orange", "Images/Orange.png");
    this.load.image("OrangeMid", "Images/OrangeMid.png");
    this.load.image("OrangeTop", "Images/OrangeTop.png");
    this.load.image("Green", "Images/Green.png");
    this.load.image("GreenMid", "Images/GreenMid.png");
    this.load.image("Blue", "Images/Blue.png");
    this.load.image("BlueMid", "Images/BlueMid.png");
    this.load.image("BlueTop", "Images/BlueTop.png");
    this.load.image("Black", "Images/Black.png");
    this.load.image("BlackMid", "Images/BlackMid.png");
    this.load.image("BlackTop", "Images/BlackTop.png");
    this.load.image("Yellow", "Images/Yellow.png");
    this.load.image("YellowMid", "Images/YellowMid.png");
    this.load.image("YellowTop", "Images/YellowTop.png");
    this.load.image("Pink", "Images/Pink.png");
    this.load.image("PinkMid", "Images/PinkMid.png");
    this.load.image("PinkTop", "Images/PinkTop.png");
    this.load.image("Purple", "Images/Purple.png");
    this.load.image("PurpleMid", "Images/PurpleMid.png");
    this.load.image("PurpleTop", "Images/PurpleTop.png");
    this.load.image("Red", "Images/Red.png");
    this.load.image("RedMid", "Images/RedMid.png");
    this.load.image("RedTop", "Images/RedTop.png");
    this.load.image("GlassCountdown", "Images/GlassCountdown.png");
    this.load.image("Button", "Images/Button.png");
    this.load.image("PerfectText", "Images/PerfectText.png");
    this.load.image("LastChanceToSellText", "Images/LastChanceToSellText.png");
    this.load.image("BadText", "Images/BadText.png");
  }

  create() {
    console.log(Phaser.Math.FloatBetween(0.2, 4.2));

    this.add.image(0, 0, "BG").setOrigin(0, 0);

    this.createGlasses();

    this.createGetNextColorButton();

    this.createHUD();

    this.shotGlass = this.add
      .image(540, 1385, "Glass")
      .setScale(this.globalScale, this.globalScale)
      .setDepth(2);
    // this.shotGlassTop = this.add.image(540, 1385, "GlassTop").setScale(this.globalScale, this.globalScale).setDepth(2);

    // this.createLegend();
  }

  createLegend() {
    this.add
      .image(130, 200, "Blue")
      .setScale(this.globalScale, this.globalScale);
    this.add
      .image(330, 200, "Purple")
      .setScale(this.globalScale, this.globalScale);

    this.add
      .text(
        250,
        400,
        `1: x${this.middlePriceSequence[0]}\n2: x${this.middlePriceSequence[1]}\n3: x${this.middlePriceSequence[2]}\n4: x${this.middlePriceSequence[3]}\n5: x${this.middlePriceSequence[4]}\n6: x${this.middlePriceSequence[5]}\n`,
        {
          font: "600 35px Roboto",
        }
      )
      .setOrigin(0.5, 0.5);

    this.add
      .image(530, 200, "Pink")
      .setScale(this.globalScale, this.globalScale);

    this.add
      .text(
        540,
        400,
        `1: x${this.highestPriceSequence[0]}\n2: x${this.highestPriceSequence[1]}\n3: x${this.highestPriceSequence[2]}\n4: x${this.highestPriceSequence[3]}\n5: x${this.highestPriceSequence[4]}\n6: x${this.highestPriceSequence[5]}\n`,
        {
          font: "600 35px Roboto",
        }
      )
      .setOrigin(0.5, 0.5);

    this.add
      .image(730, 200, "Orange")
      .setScale(this.globalScale, this.globalScale);
    this.add
      .image(930, 200, "Yellow")
      .setScale(this.globalScale, this.globalScale);
    this.add
      .image(830, 100, "Red")
      .setScale(this.globalScale, this.globalScale);

    this.add
      .text(
        840,
        400,
        `1: x${this.smallestPriceSequence[0]}\n2: x${this.smallestPriceSequence[1]}\n3: x${this.smallestPriceSequence[2]}\n4: x${this.smallestPriceSequence[3]}\n5: x${this.smallestPriceSequence[4]}\n6: x${this.smallestPriceSequence[5]}\n`,
        {
          font: "600 35px Roboto",
        }
      )
      .setOrigin(0.5, 0.5);
  }

  update() {
    if (this.nextShot === undefined) return;
    this.nextShot.x = this.shotGlass.x;
    this.nextShot.y = this.shotGlass.y + 55;
    // this.nextShot.Rotation = this.shotGlass.rotation
    this.nextShot.setRotation(this.shotGlass.rotation);
  }

  createHUD() {
    this.balance = 1000;
    this.balanceText = this.add
      .text(540, 1925, `Balance: ${this.balance}`, {
        fontSize: "80px",
        fontFamily: "troika",
      })
      .setOrigin(0.5, 0.5);
  }

  createGlasses() {
    this.glass1 = new Glass(this, 300, 1050, "Glass");
    this.glass1.setScale(this.globalScale, this.globalScale);
    this.add.existing(this.glass1);

    this.glass2 = new Glass(this, 540, 1050, "Glass");
    this.glass2.setScale(this.globalScale, this.globalScale);
    this.add.existing(this.glass2);

    this.glass3 = new Glass(this, 780, 1050, "Glass");
    this.glass3.setScale(this.globalScale, this.globalScale);
    this.add.existing(this.glass3);
  }

  getRandomColor() {
    this.nextColorNumber = Phaser.Math.Between(1, 100);

    if (this.nextColorNumber < 9) {
      this.nextColor = this.colorSequence[0];
    } else if (this.nextColorNumber < 25) {
      this.nextColor = this.colorSequence[1];
    } else if (this.nextColorNumber < 41) {
      this.nextColor = this.colorSequence[2];
    } else if (this.nextColorNumber < 61) {
      this.nextColor = this.colorSequence[3];
    } else if (this.nextColorNumber < 81) {
      this.nextColor = this.colorSequence[4];
    } else {
      this.nextColor = this.colorSequence[5];
    }
  }

  createNextShot() {
    if (this.nextShot != undefined || !this.canGenerateColor) return;
    this.getRandomColor();
    this.nextShot = this.add
      .image(this.shotGlass.x, 10, this.nextColor)
      .setScale(this.globalScale, this.globalScale)
      .setDepth(3);
    this.updateBalance(-10);
    this.canGenerateColor = false;

    this.glass1.countDown();
    this.glass2.countDown();
    this.glass3.countDown();
  }

  createGetNextColorButton() {
    this.getNextColorButton = this.add.image(540, 1670, "Button");
    this.getNextColorButton.setInteractive();
    this.add.text(540, 1670, " ", { fontSize: "40px" }).setOrigin(0.5, 0.5);
    this.getNextColorButton.on("pointerover", () => {
      this.getNextColorButton.setAlpha(0.8);
    });
    this.getNextColorButton.on("pointerout", () => {
      this.getNextColorButton.setAlpha(1);
    });
    this.getNextColorButton.on("pointerdown", () => {
      this.createNextShot();
    });
  }

  moveShotGlassToTarget(glass) {
    let x = this.shotGlass.x;
    let y = this.shotGlass.y;

    this.tweens.add({
      targets: this.shotGlass,
      x: glass.x + 50,
      y: glass.y - 300,
      yoyo: false,
      repeat: 0,
      ease: "Sine.easeOut",
      duration: 400,
      onComplete: () => {
        glass.addNextShot(this.nextShot.texture);
        this.nextShot.destroy();
        this.nextShot = undefined;
        this.tweens.add({
          targets: this.shotGlass,
          angle: "-=120",
          yoyo: true,
          ease: "Sine.easeInOut",
          duration: 200,
          onComplete: () => {
            this.tweens.add({
              targets: this.shotGlass,
              x: x,
              y: y,
              yoyo: false,
              repeat: 0,
              ease: "Sine.easeOut",
              duration: 400,
              onComplete: () => {
                this.canGenerateColor = true;
              },
            });
          },
        });
      },
    });
  }

  updateBalance(ammount) {
    this.balance += ammount;
    this.balanceText.text = `Balance: ${this.balance}`;
  }

  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }
}
