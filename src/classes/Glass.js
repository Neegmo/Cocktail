export default class Glass extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.sellButton = undefined;
    this.colorBetIndex = 0;
    this.colorSequence = [];
    this.colorHight = 0;
    this.price = 0;

    this.setInteractive();

    this.on("pointerup", () => {
      if (this.colorSequence.length >= 6 || scene.canGenerateColor) return;
      scene.moveShotGlassToTarget(this);
    });

    this.sellGlass = scene.add
      .text(this.x, this.y + 140, `SELL ${this.price}`, {
        font: "400 40px troika",
        color: "#000000",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    this.sellGlass.setInteractive();

    this.sellGlass.on("pointerup", () => {
      if (!scene.canGenerateColor) return;
      this.colorSequence.forEach((element) => {
        element.destroy();
      });
      this.colorSequence = [];
      this.colorHight = 0;
      this.scene.updateBalance(this.price);

      this.price = 0;
      this.sellGlass.text = `SELL ${this.price}`;

      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    });

    this.glassCountdown = 5;
    this.scene.add
      .image(this.x + 55, this.y - 100, "GlassCountdown")
      .setScale(0.4, 0.4)
      .setDepth(2)
    this.glassCountdownText = scene.add
      .text(this.x + 55, this.y - 80, `${this.glassCountdown}`, {
        font: "600 35px Roboto",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(3);
  }

  addNextShot(color) {
    // this.colorSequence = [...this.colorSequence, color]
    let texture
    if(this.colorSequence.length === 0){
      texture = color.key
    }
    else if(this.colorSequence.length === 5)
    {
      texture = color.key+"Top"
    }
    else {
      texture = color.key+"Mid"
    }

    
    console.log(texture)
    let shotColor = this.scene.add
      .sprite(this.x, this.y + 55 + this.colorHight, texture)
      .setScale(0.5, 0.5);
      shotColor.setData('color', color.key)
    this.colorHight -= 22;
    if (this.colorSequence[0] === undefined) {
      this.colorSequence.push(shotColor);
    } else if (shotColor.getData('color') === this.colorSequence[0].getData('color')) {
      this.colorSequence.push(shotColor);
      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    } else {
      this.colorSequence.push(shotColor);
      this.spoilCocktail();
    }

    this.setPrice()
    
    this.sellGlass.text = `SELL ${this.price}`;
  }

  spoilCocktail() {
    this.colorSequence.forEach((element, index) => {
      if(index === 0)
      {
        element.setTexture("Black");
      }
      else {
        element.setTexture("BlackMid");
      }
    });
    this.scene.time.delayedCall(500, () => {
      this.colorSequence.forEach((element) => {
        element.destroy();
      });
      this.colorSequence = [];
      this.colorHight = 0;
      this.price = 0;

      this.price = 0;
      this.sellGlass.text = `SELL ${this.price}`;

      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    });
  }

  setPrice() {
    switch (this.colorSequence[0].texture.key) {
      case "Pink":
        this.price =
          this.scene.bet *
          this.scene.highestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Blue":
        this.price =
          this.scene.bet *
          this.scene.middlePriceSequence[this.colorSequence.length - 1];
        break;
      case "Purple":
        this.price =
          this.scene.bet *
          this.scene.middlePriceSequence[this.colorSequence.length - 1];
        break;
      case "Orange":
        this.price =
          this.scene.bet *
          this.scene.smallestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Yellow":
        this.price =
          this.scene.bet *
          this.scene.smallestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Red":
        this.price =
          this.scene.bet *
          this.scene.smallestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Black":
        this.price = 0;
        break;
    }
  }

  countDown() {
    if (this.colorSequence.length === 0) return;
    this.glassCountdown--;
    this.glassCountdownText.text = `${this.glassCountdown}`;

    if (this.glassCountdown <= 0) {
      this.colorSequence.forEach((element) => {
        element.setTexture("Black");
      });
      this.scene.time.delayedCall(500, () => {
        this.colorSequence.forEach((element) => {
          element.destroy();
        });
        this.colorSequence = [];
        this.colorHight = 0;
        this.price = 0;

        this.price = 0;
        this.sellGlass.text = `SELL ${this.price}`;
      });

      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    }
  }
}
