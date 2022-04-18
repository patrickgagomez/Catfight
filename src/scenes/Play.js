class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('yard', './assets/yard.png');
        this.load.image('watergun', './assets/watergun.png');
        this.load.image('water', './assets/water.png');
        
        // load spritesheet
        this.load.spritesheet('catsoaked', './assets/catsoaked.png', {frameWidth: 160, frameHeight: 80, startFrame: 0, endFrame: 0});
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.spritesheet('catfullanim', './assets/catfullanim.png', {frameWidth: 160, frameHeight: 80, startFrame: 0, endFrame: 9});
    }

    

    create() { 

        this.anims.create({
            key: 'catwalk',
            frames: this.anims.generateFrameNumbers('catfullanim', { start: 0, end: 8, first: 0}),
            frameRate: game.settings.catFrameRate,
        });

        this.anims.create({
            key: 'catwater',
            frames: this.anims.generateFrameNumbers('catsoaked', { start: 0, end: 0, first: 0}),
            frameRate: 1,
        });

        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 1366, 768, 'yard').setOrigin(0, 0);

        // define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x148776).setOrigin(0, 0);
        
        // white borders
        //REMOVING: COVERING ART
        //this.add.rectangle(0, 0, game.config.width, borderUISize, 0x0d4f43).setOrigin(0 ,0);
        //this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x0d4f43).setOrigin(0 ,0);
        //this.add.rectangle(0, 0, borderUISize, game.config.height, 0x0d4f43).setOrigin(0 ,0);
        //this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x0d4f43).setOrigin(0 ,0);

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2-40, game.config.height - borderUISize - borderPadding, 'water', keyLEFT, keyRIGHT, keyF, 'water').setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width/2-40, game.config.height - borderUISize - borderPadding, 'water', keyA, keyS, keyD, 'water').setOrigin(0.5, 0);


        this.test= this.add.sprite(this.p1Rocket.x-40, this.p1Rocket.y, 'watergun');
        this.test2= this.add.sprite(this.p2Rocket.x+40, this.p2Rocket.y, 'watergun');
        
        // add Spaceships (x3)
        //this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'catfullanim', 0, 20, 'catwalk').setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'catfullanim', 0, 10, 'catwalk').setOrigin(0,0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'catfullanim', 0, 30, 'catwalk').setOrigin(0, 0);


        

        

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#743280',
            color: '#ff0059',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    

    update() {
        // check key input for restart / menu
        if (this.test.x != this.p1Rocket.x){
            this.test.x = this.p1Rocket.x;
        }

        if (this.test2.x != this.p2Rocket.x){
            this.test2.x = this.p2Rocket.x;
        }
        

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }


        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p2Rocket.update();
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        //check p2 collisions
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'catwater').setOrigin(0, 0);
        boom.anims.play('catwater');             // play explode animation
        

        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.isShot = false;
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('sfx_explosion');
    }
}