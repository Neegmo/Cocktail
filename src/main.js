import Phaser from "phaser";

import HelloWorldScene from "./HelloWorldScene";

const config = {
  type: Phaser.AUTO,
  parent: "app",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1071,
    height: 2100,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [HelloWorldScene],
};

export default new Phaser.Game(config);
