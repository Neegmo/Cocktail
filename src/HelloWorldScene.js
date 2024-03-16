import Phaser from "phaser";
import Glass from "./classes/Glass";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  nextShot;

  getNextColorButton;

  colorSequence = ["Pink", "Blue", "Purple", "Orange", "Yellow", "Red"];

  nextColor;

  bet = 10;

  canGenerateColor = true;

  highestPriceSequence = [2, 8, 20, 40, 100, 500];
  middlePriceSequence = [0.5, 1.25, 3.5, 5, 10, 25];
  smallestPriceSequence = [0.25, 0.5, 1.8, 2.5, 6, 10];

  preload() {
    this.load.baseURL = "Assets/";

    this.load.image("BG", "BG.png");
    this.load.image("Glass", "Glass.png");
    this.load.image("ShotGlass", "ShotGlass.png");
    this.load.image("Orange", "Orange.png");
    this.load.image("Green", "Green.png");
    this.load.image("Blue", "Blue.png");
    this.load.image("Black", "Black.png");
    this.load.image("Yellow", "Yellow.png");
    this.load.image("Pink", "Pink.png");
    this.load.image("Purple", "Purple.png");
    this.load.image("Red", "Red.png");
  }

  create() {
    this.add.image(0, 0, "BG").setOrigin(0, 0);

    this.createGlasses();

    this.createGetNextColorButton();

    this.createHUD();

    this.shotGlass = this.add.image(530, 1500, "ShotGlass").setScale(0.5, 0.5);

    this.createLegend();
  }

  createLegend() {
    this.add.image(130, 200, "Blue").setScale(0.5, 0.5);
    this.add.image(330, 200, "Purple").setScale(0.5, 0.5);

    this.add.text(
      250,
      400,
      `1: x${this.middlePriceSequence[0]}\n2: x${this.middlePriceSequence[1]}\n3: x${this.middlePriceSequence[2]}\n4: x${this.middlePriceSequence[3]}\n5: x${this.middlePriceSequence[4]}\n6: x${this.middlePriceSequence[5]}\n`,
      {
        font: "600 35px Roboto",
      }
    ).setOrigin(0.5, 0.5);

    this.add.image(530, 200, "Pink").setScale(0.5, 0.5);

    this.add.text(
      540,
      400,
      `1: x${this.highestPriceSequence[0]}\n2: x${this.highestPriceSequence[1]}\n3: x${this.highestPriceSequence[2]}\n4: x${this.highestPriceSequence[3]}\n5: x${this.highestPriceSequence[4]}\n6: x${this.highestPriceSequence[5]}\n`,
      {
        font: "600 35px Roboto",
      }
    ).setOrigin(0.5, 0.5);

    this.add.image(730, 200, "Orange").setScale(0.5, 0.5);
    this.add.image(930, 200, "Yellow").setScale(0.5, 0.5);
    this.add.image(830, 100, "Red").setScale(0.5, 0.5);

    this.add.text(
      840,
      400,
      `1: x${this.smallestPriceSequence[0]}\n2: x${this.smallestPriceSequence[1]}\n3: x${this.smallestPriceSequence[2]}\n4: x${this.smallestPriceSequence[3]}\n5: x${this.smallestPriceSequence[4]}\n6: x${this.smallestPriceSequence[5]}\n`,
      {
        font: "600 35px Roboto",
      }
    ).setOrigin(0.5, 0.5);
  }

  update() {
    if (this.nextShot === undefined) return;
    this.nextShot.x = this.shotGlass.x;
    this.nextShot.y = this.shotGlass.y + 25;
    // this.nextShot.Rotation = this.shotGlass.rotation
    this.nextShot.setRotation(this.shotGlass.rotation);
  }

  createHUD() {
    this.balance = 1000;
    this.balanceText = this.add.text(20, 100, `Balance: ${this.balance}`, {
      fontSize: "40px",
    });
  }

  createGlasses() {
    this.glass1 = new Glass(this, 280, 1100, "Glass");
    this.glass1.setScale(0.5, 0.5);
    this.add.existing(this.glass1);

    this.glass2 = new Glass(this, 530, 1100, "Glass");
    this.glass2.setScale(0.5, 0.5);
    this.add.existing(this.glass2);

    this.glass3 = new Glass(this, 780, 1100, "Glass");
    this.glass3.setScale(0.5, 0.5);
    this.add.existing(this.glass3);
  }

  getRandomColor() {
    this.nextColorNumber = Phaser.Math.Between(1, 100);
    console.log(this.nextColorNumber);

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
    }else {
      this.nextColor = this.colorSequence[5];
    }
  }

  createNextShot() {
    if (this.nextShot != undefined || !this.canGenerateColor) return;
    this.getRandomColor();
    this.nextShot = this.add
      .image(530, 1525, this.nextColor)
      .setScale(0.5, 0.5);
    this.updateBalance(-10);
    this.canGenerateColor = false;

    this.glass1.countDown();
    this.glass2.countDown();
    this.glass3.countDown();
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

  moveShotGlassToTarget(glass) {
    let x = this.shotGlass.x;
    let y = this.shotGlass.y;

    this.tweens.add({
      targets: this.shotGlass,
      x: glass.x + 50,
      y: glass.y - 400,
      yoyo: false,
      repeat: 0,
      ease: "Sine.easeOut",
      duration: 500,
      onComplete: () => {
        console.log("Movement completed");
        glass.addNextShot(this.nextShot.texture);
        this.nextShot.destroy();
        this.nextShot = undefined;
        this.tweens.add({
          targets: this.shotGlass,
          angle: "-=120",
          yoyo: true,
          ease: "Sine.easeInOut",
          duration: 500,
          onComplete: () => {
            console.log("Rotation complete!");
            this.tweens.add({
              targets: this.shotGlass,
              x: x,
              y: y,
              yoyo: false,
              repeat: 0,
              ease: "Sine.easeOut",
              duration: 500,
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
}
