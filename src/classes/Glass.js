export default class Glass extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.sellButton = undefined;
    this.colorBetIndex = 0;
    this.colorSequence = [];
    this.colorHight = 0;
    this.price = 0;

    this.highestPriceSequence = [2, 8.5, 160, 2500, 10000, 50000];
    this.middlePriceSequence = [0.5, 1.5, 13, 125, 1000, 5000];
    this.smallestPriceSequence = [0.25, 0.75, 2, 5.5, 15, 40];

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
        element.destroy()
      });
      this.colorSequence = []
      this.colorHight = 0
      this.scene.updateBalance(this.price)

      this.price = 0;
      this.sellGlass.text = `SELL FOR:\n${this.price}`;

    });
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
    } else {
      this.colorSequence.push(shotColor);
      this.colorSequence.forEach((element) => {
        element.setTexture("Black");
      });
      this.scene.time.delayedCall(500, () => {
        this.colorSequence.forEach((element) => {
          element.destroy()
        });
        this.colorSequence = []
        this.colorHight = 0
        this.price = 0
  
        this.price = 0;
        this.sellGlass.text = `SELL FOR:\n${this.price}`;
      })
    }
    console.log(this.colorSequence[0].texture.key);
    switch (this.colorSequence[0].texture.key) {
      case "Pink":
        this.price =
          this.scene.bet *
          this.highestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Purple":
        this.price =
          this.scene.bet *
          this.middlePriceSequence[this.colorSequence.length - 1];
        break;
      case "Green":
        this.price =
          this.scene.bet *
          this.middlePriceSequence[this.colorSequence.length - 1];
        break;
      case "Orange":
        this.price =
          this.scene.bet *
          this.smallestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Yellow":
        this.price =
          this.scene.bet *
          this.smallestPriceSequence[this.colorSequence.length - 1];
        break;
      case "Black":
        this.price = 0;
        break;
    }
    this.sellGlass.text = `SELL FOR:\n${this.price}`;
  }
}
