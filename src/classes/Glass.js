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
      if (
        this.colorSequence.length >= 6 ||
        scene.canGenerateColor ||
        scene.glassMoving
      )
        return;
      scene.glassMoving = true;
      scene.moveShotGlassToTarget(this);
    });

    this.sellGlass = scene.add
      .text(this.x, this.y + 125, `SELL ${this.price}`, {
        font: "400 40px troika",
        // color: "#000000",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    this.sellGlass.setInteractive();

    this.sellGlass.on("pointerup", () => {
      if (!scene.canGenerateColor) return;
      scene.SellSound.play();
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

      this.destroySigns();
    });

    this.glassCountdown = 5;
    this.scene.add
      .image(this.x + 55, this.y - 100, "GlassCountdown")
      .setScale(0.4, 0.4)
      .setDepth(2);
    this.glassCountdownText = scene.add
      .text(this.x + 57, this.y - 85, `${this.glassCountdown}`, {
        font: "50px Troika",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(3);
  }

  populateGlassFromSequence(sequence, countDown) {
    this.colorSequence.forEach((element) => {
      element.destroy();
    });
    this.colorSequence = [];
    this.destroySigns();
    if (sequence === undefined) {
      this.colorHight = 0;
      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
      this.setPrice();
      this.sellGlass.text = `SELL ${this.price}`;
      return;
    }
    sequence.forEach((element) => {
      this.scene.add.existing(element);
      let x = element.x;
      let y = element.y;
      let texture = element.texture.key;

      let nextColor = this.scene.add.sprite(x, y, texture).setScale(0.5, 0.5);
      this.colorSequence.push(nextColor);
      this.colorSequence[0].setData("color", this.colorSequence[0].texture.key);
    });
    this.colorHight = this.colorSequence.length * -22;
    this.glassCountdown = countDown;
    this.glassCountdownText.text = `${this.glassCountdown}`;
    this.setPrice();
    this.sellGlass.text = `SELL ${this.price}`;

    if (this.colorSequence.length === 5) this.createPerfectSign();
    if (this.glassCountdown === 1) this.createLastChanceToSellSign();
  }

  addNextShot(color) {
    // this.colorSequence = [...this.colorSequence, color]
    let texture;
    if (this.colorSequence.length === 0) {
      texture = color.key;
    } else if (this.colorSequence.length === 5) {
      texture = color.key + "Top";
      this.createPerfectSign();
    } else {
      texture = color.key + "Mid";
    }
    let shotColor = this.scene.add
      .sprite(this.x, this.y + 55 + this.colorHight, texture)
      .setScale(0.5, 0.5);
    shotColor.setData("color", color.key);
    this.colorHight -= 22;
    if (this.colorSequence[0] === undefined) {
      this.colorSequence.push(shotColor);
    } else if (
      shotColor.getData("color") === this.colorSequence[0].getData("color")
    ) {
      this.colorSequence.push(shotColor);
      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    } else {
      this.colorSequence.push(shotColor);
      this.spoilCocktail();
    }

    if (this.lastChanceToSellSign) this.lastChanceToSellSign.destroy();

    this.setPrice();

    this.sellGlass.text = `SELL ${this.price}`;

    console.log(this.colorHight);
  }

  spoilCocktail() {
    this.destroySigns();

    this.createBadSign();
    this.colorSequence.forEach((element, index) => {
      if (index === 0) {
        element.setTexture("Black");
      } else if (index === 5) {
        element.setTexture("BlackTop");
      } else {
        element.setTexture("BlackMid");
      }
    });
    this.scene.time.delayedCall(1200, () => {
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
      this.destroySigns();
    });
  }

  setPrice() {
    if (this.colorSequence === undefined || this.colorSequence.length < 1) {
      this.price = 0;
      return;
    }
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
          this.scene.middlePriceSequence[this.colorSequence.length - 1];
        break;
      case "Black":
        this.price = 0;
        break;
    }
  }

  createPerfectSign() {
    this.scene.PerfectSound.play();
    this.perfectSign = this.scene.add
      .image(this.x, this.y, "PerfectText")
      .setScale(0.4, 0.4)
      .setDepth(4);

    this.tween = this.scene.tweens.add({
      targets: this.perfectSign,
      scaleX: 0.5,
      scaleY: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 1000,
    });
  }

  createLastChanceToSellSign() {
    this.scene.LastChanceToSellSound.play();
    this.lastChanceToSellSign = this.scene.add
      .image(this.x, this.y, "LastChanceToSellText")
      .setDepth(4);

    this.tween = this.scene.tweens.add({
      targets: this.lastChanceToSellSign,
      scaleX: 1.1,
      scaleY: 1.1,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
      duration: 500,
    });
  }

  createBadSign() {
    this.scene.BadCocktailSound.play();
    this.badSign = this.scene.add
      .image(this.x, this.y, "BadText")
      .setScale(0.4, 0.4)
      .setDepth(4);

    this.tween = this.scene.tweens.add({
      targets: this.badSign,
      scaleX: 0.7,
      scaleY: 0.7,
      ease: "Sine.easeIn",
      duration: 700,
    });
  }

  destroySigns() {
    if (this.perfectSign) this.perfectSign.destroy();
    if (this.lastChanceToSellSign) this.lastChanceToSellSign.destroy();
    if (this.badSign) this.badSign.destroy();

    if (this.tween && this.tween.isPlaying()) {
      this.tween.stop();
      this.tween.remove();
    }

    this.tween = null;
    this.perfectSign = null;
    this.lastChanceToSellSign = null;
    this.badSign = null;
  }

  countDown() {
    if (this.colorSequence.length === 0) return;
    this.glassCountdown--;
    this.glassCountdownText.text = `${this.glassCountdown}`;

    if (this.glassCountdown === 1) {
      this.createLastChanceToSellSign();
    }
    if (this.glassCountdown <= 0) {
      this.spoilCocktail();
    }
  }
}
