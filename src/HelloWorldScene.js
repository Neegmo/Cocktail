import Phaser from "phaser";
import Glass from "./classes/Glass";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("hello-world");
  }

  nextShot;

  getNextColorButton;

  colorSequence = ["Pink", "Blue", "Purple", "Orange", "Yellow", "Red"];
  // colorSequence = ["Orange", "Orange", "Orange", "Orange", "Orange", "Orange"];

  betSequence = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
    180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320,
    330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
    480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620,
    630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730, 740, 750, 760, 770,
    780, 790, 800, 810, 820, 830, 840, 850, 860, 870, 880, 890, 900, 910, 920,
    930, 940, 950, 960, 970, 980, 990, 1000,
  ];

  glass1Sequence = [];
  glass2Sequence = [];
  glass3Sequence = [];

  glass1Countdown = [];
  glass2Countdown = [];
  glass3Countdown = [];

  betIndex = 0;

  nextColor;

  bet = 10;

  canGenerateColor = true;

  globalScale = 0.5;

  highestPriceSequence = [2, 8, 15, 50, 100, 500];
  middlePriceSequence = [0.5, 1.25, 3, 5, 10, 20];
  smallestPriceSequence = [0.15, 0.5, 1.5, 2, 5, 10];

  glassMoving = false;

  //Added for git commit
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
    this.load.image("ArrowLeft", "Images/ArrowLeft.png");
    this.load.image("ArrowRight", "Images/ArrowRight.png");

    this.load.audio("BGMusic", ["Sounds/BG1.mp3"]);
    this.load.audio("BGMusic2", ["Sounds/BG2.mp3"]);
    this.load.audio("BGMusic3", ["Sounds/BG3.mp3"]);
    this.load.audio("BadCocktail", ["Sounds/BadCocktail.mp3"]);
    this.load.audio("BuyShot", ["Sounds/BuyShot.mp3"]);
    this.load.audio("DecreaseBalance", ["Sounds/DecreaseBalance.mp3"]);
    this.load.audio("IncreaseBalance", ["Sounds/IncreaseBalance.mp3"]);
    this.load.audio("LastChanceToSell", ["Sounds/LastChanceToSell.mp3"]);
    this.load.audio("Perfect", ["Sounds/Perfect.mp3"]);
    this.load.audio("Pour", ["Sounds/Pour.mp3"]);
    this.load.audio("Sell", ["Sounds/Sell.mp3"]);
  }

  create() {
    this.betIndex = 0;

    this.add.image(0, 0, "BG").setOrigin(0, 0);

    this.createGlasses();

    this.createGetNextColorButton();

    this.createHUD();

    this.shotGlass = this.add
      .image(540, 1385, "Glass")
      .setScale(this.globalScale, this.globalScale)
      .setDepth(2);

    this.createBetChangingSprites();
    // this.shotGlassTop = this.add.image(540, 1385, "GlassTop").setScale(this.globalScale, this.globalScale).setDepth(2);

    // this.createLegend();
    this.addSounds();

    this.createBGSoundButtons();
  }

  addSounds() {
    if (!this.BGMusic || !this.BGMusic.isPlaying) {
      this.BGMusic = this.sound.add("BGMusic", { loop: true, volume: 0.1 });
      this.BGMusic.play();
    }
    if (!this.BGMusic2 || !this.BGMusic2.isPlaying) {
      this.BGMusic2 = this.sound.add("BGMusic2", { loop: true, volume: 0.2 });
    }
    if (!this.BGMusic3 || !this.BGMusic3.isPlaying) {
      this.BGMusic3 = this.sound.add("BGMusic3", { loop: true, volume: 0.2 });
    }
    if (!this.BadCocktailSound || !this.BadCocktailSound.isPlaying) {
      this.BadCocktailSound = this.sound.add("BadCocktail", {
        loop: false,
      });
    }
    if (!this.BuyShotSound || !this.BuyShotSound.isPlaying) {
      this.BuyShotSound = this.sound.add("BuyShot", {
        loop: false,
      });
    }
    if (!this.DecreaseBetSound || !this.DecreaseBetSound.isPlaying) {
      this.DecreaseBetSound = this.sound.add("DecreaseBalance", {
        loop: false,
      });
    }
    if (!this.IncreaseBetSound || !this.IncreaseBetSound.isPlaying) {
      this.IncreaseBetSound = this.sound.add("IncreaseBalance", {
        loop: false,
      });
    }
    if (!this.LastChanceToSellSound || !this.LastChanceToSellSound.isPlaying) {
      this.LastChanceToSellSound = this.sound.add("LastChanceToSell", {
        loop: false,
      });
    }
    if (!this.PerfectSound || !this.PerfectSound.isPlaying) {
      this.PerfectSound = this.sound.add("Perfect", {
        loop: false,
      });
    }
    if (!this.PourSound || !this.PourSound.isPlaying) {
      this.PourSound = this.sound.add("Pour", { loop: false });
    }
    if (!this.SellSound || !this.SellSound.isPlaying) {
      this.SellSound = this.sound.add("Sell", { loop: false });
    }
  }

  createBGSoundButtons() {
    this.BGSound1 = this.add
      .text(50, 50, `BG1`, {
        font: "400 60px troika",
        // color: "#000000",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    this.BGSound1.setInteractive();
    this.BGSound1.on("pointerup", () => {
      this.BGMusic.play();
      this.BGMusic2.stop();
      this.BGMusic3.stop();
    });

    this.BGSound2 = this.add
      .text(50, 100, `BG2`, {
        font: "400 60px troika",
        // color: "#000000",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    this.BGSound2.setInteractive();
    this.BGSound2.on("pointerup", () => {
      this.BGMusic.stop();
      this.BGMusic2.play();
      this.BGMusic3.stop();
    });

    this.BGSound3 = this.add
      .text(50, 150, `BG3`, {
        font: "400 60px troika",
        // color: "#000000",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    this.BGSound3.setInteractive();
    this.BGSound3.on("pointerup", () => {
      this.BGMusic.stop();
      this.BGMusic2.stop();
      this.BGMusic3.play();
    });
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

    this.bet = this.betSequence[this.betIndex];
    this.betText = this.add
      .text(540, 1685, `BET: ${this.bet}`, {
        fontSize: "50px",
        fontFamily: "troika",
      })
      .setOrigin(0.5, 0.5);
  }

  createBetChangingSprites() {
    this.increaseBetButton = this.add
      .image(800, 1670, "ArrowRight")
      .setInteractive();
    this.increaseBetButton.on("pointerup", () => {
      this.increaseBet();
      this.IncreaseBetSound.play();
    });
    this.decreaseBetButton = this.add
      .image(280, 1670, "ArrowLeft")
      .setInteractive();
    this.decreaseBetButton.on("pointerup", () => {
      this.decreaseBet();
      this.DecreaseBetSound.play();
    });
  }

  increaseBet() {
    if (this.betIndex >= 100) return;

    this.glass1Sequence[this.betIndex] = this.glass1.colorSequence;
    this.glass1Countdown[this.betIndex] = this.glass1.glassCountdown;
    this.glass2Sequence[this.betIndex] = this.glass2.colorSequence;
    this.glass2Countdown[this.betIndex] = this.glass2.glassCountdown;
    this.glass3Sequence[this.betIndex] = this.glass3.colorSequence;
    this.glass3Countdown[this.betIndex] = this.glass3.glassCountdown;

    this.betIndex++;
    this.bet = this.betSequence[this.betIndex];
    this.betText.text = `BET: ${this.bet}`;

    this.glass1.populateGlassFromSequence(
      this.glass1Sequence[this.betIndex],
      this.glass1Countdown[this.betIndex]
    );
    this.glass2.populateGlassFromSequence(
      this.glass2Sequence[this.betIndex],
      this.glass2Countdown[this.betIndex]
    );
    this.glass3.populateGlassFromSequence(
      this.glass3Sequence[this.betIndex],
      this.glass3Countdown[this.betIndex]
    );
  }

  decreaseBet() {
    if (this.betIndex <= 0) return;

    this.glass1Sequence[this.betIndex] = this.glass1.colorSequence;
    this.glass1Countdown[this.betIndex] = this.glass1.glassCountdown;
    this.glass2Sequence[this.betIndex] = this.glass2.colorSequence;
    this.glass2Countdown[this.betIndex] = this.glass2.glassCountdown;
    this.glass3Sequence[this.betIndex] = this.glass3.colorSequence;
    this.glass3Countdown[this.betIndex] = this.glass3.glassCountdown;

    this.betIndex--;
    this.bet = this.betSequence[this.betIndex];
    this.betText.text = `BET: ${this.bet}`;

    this.bet = this.betSequence[this.betIndex];
    this.betText.text = `BET: ${this.bet}`;

    this.glass1.populateGlassFromSequence(
      this.glass1Sequence[this.betIndex],
      this.glass1Countdown[this.betIndex]
    );
    this.glass2.populateGlassFromSequence(
      this.glass2Sequence[this.betIndex],
      this.glass2Countdown[this.betIndex]
    );
    this.glass3.populateGlassFromSequence(
      this.glass3Sequence[this.betIndex],
      this.glass3Countdown[this.betIndex]
    );
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
    this.increaseBetButton.setAlpha(0);
    this.decreaseBetButton.setAlpha(0);
    if (this.nextShot != undefined || !this.canGenerateColor) return;
    this.getRandomColor();
    this.nextShot = this.add
      .image(this.shotGlass.x, 10, this.nextColor)
      .setScale(this.globalScale, this.globalScale)
      .setDepth(3);
    this.updateBalance(-this.bet);
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
      this.BuyShotSound.play();
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
        this.PourSound.play();
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
                this.glassMoving = false;
                this.increaseBetButton.setAlpha(1);
                this.decreaseBetButton.setAlpha(1);
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
