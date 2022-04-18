class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/start.wav');
        this.load.audio('sfx_explosion', './assets/catmeow.wav');
        this.load.audio('sfx_rocket', './assets/watergun_noise.wav');
        this.load.image('menupic', './assets/menu.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#743280',
            color: '#ff0059',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        /*
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#a81e61';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);
        */
       this.menupic = this.add.sprite(game.config.width/2, game.config.height/2.2, "menupic");

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // Novice mode
          game.settings = {
            spaceshipSpeed: 1.5,
            gameTimer: 60000,
            catFrameRate: 8,  
          }
          this.sound.play('sfx_select', {volume: 0.1});
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // Expert mode
          game.settings = {
            spaceshipSpeed: 2.5,
            gameTimer: 25000,
            catFrameRate: 12,  
          }
          this.sound.play('sfx_select', {volume: 0.1});
          this.scene.start("playScene");    
          //comment update
        }
      }
}