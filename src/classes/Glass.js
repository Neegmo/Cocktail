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
      .text(this.x, this.y + 220, `SELL FOR:\n${this.price}`, {
        font: "600 30px Roboto",
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
      this.sellGlass.text = `SELL FOR:\n${this.price}`;

      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    });

    this.glassCountdown = 5;
    this.glassCountdownText = scene.add
      .text(this.x + 100, this.y - 210, `${this.glassCountdown}`, {
        font: "600 40px Roboto",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  addNextShot(color) {
    // this.colorSequence = [...this.colorSequence, color]

    let shotColor = this.scene.add
      .sprite(this.x, this.y + 150 + this.colorHight, color)
      .setScale(0.5, 0.5);
    this.colorHight -= 50;
    if (this.colorSequence[0] === undefined) {
      this.colorSequence.push(shotColor);
    } else if (shotColor.texture === this.colorSequence[0].texture) {
      this.colorSequence.push(shotColor);
      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    } else {
      this.colorSequence.push(shotColor);
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
        this.sellGlass.text = `SELL FOR:\n${this.price}`;

        this.glassCountdown = 5;
        this.glassCountdownText.text = `${this.glassCountdown}`;
      });
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
      case "Black":
        this.price = 0;
        break;
    }
    this.sellGlass.text = `SELL FOR:\n${this.price}`;
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
        this.sellGlass.text = `SELL FOR:\n${this.price}`;
      });

      this.glassCountdown = 5;
      this.glassCountdownText.text = `${this.glassCountdown}`;
    }
  }
}
