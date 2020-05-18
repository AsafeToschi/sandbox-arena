export default {
    type: Phaser.AUTO, // Which renderer to use
    width: 512, // Canvas width in pixels
    height: 384, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    zoom: 2,
    pixelArt: true,
    physics: {
        default: "matter",
        matter: {
            gravity: { y: 0 }, // Top down game, so no gravity
            enableSleep: true,
            debug: false
        }
    },
  };