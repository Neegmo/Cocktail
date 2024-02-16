import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  glass1;
  glass1Liquid;
  glass1Color;
  glass2;
  glass2Liquid;
  glas2Color;
  glass3;
  glass3Liquid;
  glass3Color;

  nextShot;

  getNextColorButton;

  colorSequence = ["Red", "Green", "Blue", "Yellow", "Pink", "Cyan"];

  nextColor;

  preload() {
    this.load.baseURL = "Assets/";

    this.load.image("BG", "BG.png");
    this.load.image("Glass", "Glass.png");
    this.load.image("Red", "Red.png");
    this.load.image("Green", "Green.png");
    this.load.image("Blue", "Blue.png");
    this.load.image("Black", "Black.png");
	this.load.image("Yellow", "Yellow.png");
	this.load.image("Pink", "Pink.png");
	this.load.image("Cyan", "Cyan.png");
  }

  create() {
    this.add.image(0, 0, "BG").setScale(2, 2);

    this.createFirstGlass(230, 800);
    this.createSecondGlass(530, 800);
    this.createThirdGlass(830, 800);

    this.createGetNextColorButton();

	console.log(this.glass1Liquid.scaleY)
  }

  createFirstGlass(x, y) {
    this.glass1 = this.add.image(x, y, "Glass");
    this.glass1.setDepth(5);
    this.glass1Liquid = this.add.image(x - 100, y + 200, "Black");
    this.glass1Liquid.setOrigin(0, 1);
    this.glass1Liquid.setAlpha(0);
    this.glass1Liquid.scaleY = 0.8;
    this.glass1.setInteractive();
    this.glass1.on("pointerover", () => {
      this.glass1.setAlpha(0.5);
    });
    this.glass1.on("pointerout", () => {
      this.glass1.setAlpha(1);
    });
    this.glass1.on("pointerdown", () => {
      this.fillGlass(this.glass1Liquid);
    });
  }

  createSecondGlass(x, y) {
    this.glass2 = this.add.image(x, y, "Glass");
    this.glass2.setDepth(5);
    this.glass2Liquid = this.add.image(x - 100, y + 200, "Black");
    this.glass2Liquid.setOrigin(0, 1);
    this.glass2Liquid.setAlpha(0);
    this.glass2Liquid.scaleY = 0.8;
    this.glass2.setInteractive();
    this.glass2.on("pointerover", () => {
      this.glass2.setAlpha(0.5);
    });
    this.glass2.on("pointerout", () => {
      this.glass2.setAlpha(1);
    });
    this.glass2.on("pointerdown", () => {
      this.fillGlass(this.glass2Liquid);
    });
  }

  createThirdGlass(x, y) {
    this.glass3 = this.add.image(x, y, "Glass");
    this.glass3.setDepth(5);
    this.glass3Liquid = this.add.image(x - 100, y + 200, "Black");
    this.glass3Liquid.setOrigin(0, 1);
    this.glass3Liquid.setAlpha(0);
    this.glass3Liquid.scaleY = 0.8;
    this.glass3.setInteractive();
    this.glass3.on("pointerover", () => {
      this.glass3.setAlpha(0.5);
    });
    this.glass3.on("pointerout", () => {
      this.glass3.setAlpha(1);
    });
    this.glass3.on("pointerdown", () => {
      this.fillGlass(this.glass3Liquid);
    });
  }

  fillGlass(liquid) {
    if (this.nextShot === undefined) return;

    console.log(this.glass1Liquid);
    if (liquid.texture.key === this.nextColor || liquid.scaleY === 0.8) {
      liquid.setTexture(this.nextColor);
    } else {
      liquid.setTexture("Black");
    }
    liquid.setAlpha(1);
    liquid.scaleY += 0.2;
    this.nextShot.destroy();
    this.nextShot = undefined;
  }

  getRandomColor() {
    this.nextColor = this.colorSequence[Phaser.Math.Between(0, 5)];
  }

  createNextShot() {
    if (this.nextShot != undefined) return;
    this.getRandomColor();
    this.nextShot = this.add.image(540, 1500, this.nextColor);
  }

  createGetNextColorButton() {
    this.getNextColorButton = this.add.image(540, 1800, "Black");
    this.getNextColorButton.setInteractive();
    this.add.text(435, 1790, "Buy Shot", { fontSize: "40px" });
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
}
