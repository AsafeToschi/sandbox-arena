let player, tileset, map;
import 'phaser';
import AnimatedTiles from '../AnimatedTiles.min.js'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    preload() {
        this.load.image("arena-tiles", "../src/assets/arena-tileset.png");
        this.load.image("shadows", "../src/assets/shadows.png");
        this.load.image("banner", "../src/assets/banner.png");
        this.load.image("torches", "../src/assets/torch.png");
        this.load.tilemapTiledJSON("map", "../src/assets/arena-map.json");
        this.load.spritesheet("player", "../src/assets/adventurer.png", { frameWidth: 32, frameHeight: 32 });
        this.load.scenePlugin({
            key: "AnimatedTiles",
            url: AnimatedTiles,
            sceneKey: "GameScene"
        });
    }

    create() {
        // Runs once, after all assets in preload are loaded
        // JSON MAP
        map = this.make.tilemap({ key: "map" });
        
        
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        // TILESETS
        tileset = map.addTilesetImage("arena-tileset", "arena-tiles");
        const tilesetShadows = map.addTilesetImage("shadows", "shadows");
        const tilesetBanner = map.addTilesetImage("banner", "banner");
        const tilesetTorches = map.addTilesetImage("torch", "torches");
        
        
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        // LAYERS
        const floor = map.createDynamicLayer("floor", tileset, 0, 0); // layer index, tileset, x, y
        const wallsBack = map.createDynamicLayer("wallsBack", tileset, 0, 0); // layer index, tileset, x, y
        const wallsFront = map.createDynamicLayer("wallsFront", tileset, 0, 0); // layer index, tileset, x, y
        const decorations = map.createDynamicLayer("decorations", [tileset, tilesetBanner, tilesetTorches], 0, 0); // layer index, tileset, x, y
        const shadows = map.createDynamicLayer("shadows", tilesetShadows, 0, 0); // layer index, tileset, x, y
        
        this.sys.AnimatedTiles.init(map)
        // Profundidade
        wallsBack.setDepth(0);
        shadows.setDepth(2);
        wallsFront.setDepth(3);
        decorations.setDepth(3);

        // collide
        wallsBack.setCollisionFromCollisionGroup(true)
        wallsFront.setCollisionFromCollisionGroup(true)
        floor.setCollisionFromCollisionGroup(true)


        // Add Collider
        player = this.matter.add.sprite(80, 208, 'player', 0);
        player.displayHeight = 22
        player.displayWidth = 16
        player.scale = 1
        player.setOrigin(0.45,0.625)
        player.setFrictionAir(0.25)
        player.setFixedRotation();
        this.matter.world.convertTilemapLayer(floor);
        this.matter.world.convertTilemapLayer(wallsBack);
        this.matter.world.convertTilemapLayer(wallsFront);
        this.matter.world.setBounds(0, 0);

        // // Camera follow
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.startFollow(player);
        // this.cameras.main.roundPixels = true;


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
    update() {
        // Runs once per frame for the duration of the scene
        let playerSpeed = 2.5


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
}