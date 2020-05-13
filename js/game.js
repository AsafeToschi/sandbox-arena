let player, tileset, map;
const config = {
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("arena-tiles", "assets/arena-tileset.png");
    this.load.image("shadows", "assets/shadows.png");
    this.load.tilemapTiledJSON("map", "assets/arena-map.json");
    this.load.spritesheet('player', 'assets/adventurer.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
    // Runs once, after all assets in preload are loaded
    // JSON MAP
    map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    // TILESETS
    tileset = map.addTilesetImage("arena-tileset", "arena-tiles");
    const tilesetShadows = map.addTilesetImage("shadows", "shadows");


    // Parameters: layer name (or index) from Tiled, tileset, x, y
    // LAYERS
    floor = map.createStaticLayer("floor", tileset, 0, 0); // layer index, tileset, x, y
    const wallsBack = map.createStaticLayer("wallsBack", tileset, 0, 0); // layer index, tileset, x, y
    const wallsFront = map.createStaticLayer("wallsFront", tileset, 0, 0); // layer index, tileset, x, y
    const decorations = map.createStaticLayer("decorations", tileset, 0, 0); // layer index, tileset, x, y
    const shadows = map.createStaticLayer("shadows", tilesetShadows, 0, 0); // layer index, tileset, x, y

    // Profundidade
    wallsBack.setDepth(0);
    shadows.setDepth(5);
    wallsFront.setDepth(10);

    // collide
    wallsBack.setCollisionFromCollisionGroup(true)
    wallsFront.setCollisionFromCollisionGroup(true)
    floor.setCollisionFromCollisionGroup(true)


    // Add Collider
    player = this.matter.add.sprite(80, 208, 'player', 0);
    player.displayHeight = 10
    player.displayWidth = 10
    player.scale = 1.1
    player.setOrigin(0.45,0.8)
    player.setFrictionAir(0.2)
    player.setFixedRotation();
    colliders = [wallsBack, wallsFront, floor]
    this.matter.world.convertTilemapLayer(floor);
    this.matter.world.convertTilemapLayer(wallsBack);
    this.matter.world.convertTilemapLayer(wallsFront);
    this.matter.world.setBounds(0,0);

    // // Camera follow
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.startFollow(player);
    // this.cameras.main.roundPixels = true;


    //  Animation with key 'left', we don't need left and right as we will use one and flip the sprite
    //  Create Animation
    this.cursors = this.input.keyboard.createCursorKeys();
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { frames: [117, 118, 119, 120, 121, 122, 123, 124] }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { frames: [13, 14, 15, 16, 17, 18, 19, 20] }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { frames: [13, 14, 15, 16, 17, 18, 19, 20] }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { frames: [13, 14, 15, 16, 17, 18, 19, 20] }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'standart',
        frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'standartLeft',
        frames: this.anims.generateFrameNumbers('player', { frames: [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116] }),
        frameRate: 10,
        repeat: -1
    });
    // Run animation
    if (this.cursors.left.isDown) {
        player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
        player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown) {
        player.anims.play('down', true);
    }
    else {
        player.anims.stop();
    }


}
function update(time, delta) {
    // Runs once per frame for the duration of the scene
    // player.body.setVelocity(0);
    playerSpeed = 3
    
    
    // Horizontal movement
    if (this.cursors.left.isDown) {
        player.setVelocityX(-playerSpeed);
    }
    else if (this.cursors.right.isDown) {
        player.setVelocityX(playerSpeed);
    }
    
    // Vertical movement
    if (this.cursors.up.isDown) {
        player.setVelocityY(-playerSpeed);
    }
    else if (this.cursors.down.isDown) {
        player.setVelocityY(playerSpeed);
    }
    
    // player.body.velocity.normalize().scale(playerSpeed);
    
    
    if (this.cursors.left.isDown) {
        player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        player.anims.play('right', true);
    }
    else if (this.cursors.up.isDown) {
        player.anims.play('up', true);
    }
    else if (this.cursors.down.isDown) {
        player.anims.play('down', true);
    }
    else {
        player.anims.play('standart', true);

    }
    
}