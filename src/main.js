let config = {
    type: Phaser.CANVAS,
    width: 1366,
    height: 768,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyA, keyS, keyD, keyLEFT, keyRIGHT;


/*
PROJECT TITLE: CATFIGHT (ROCKET PATROL MOD)
CREATOR NAME: Patrick Gomez
TIME SPENT WORKING: ~8 hours

POINTS BREAKDOWN:
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
Implement a simultaneous two-player mode (30)
Create a new animated sprite for the Spaceship enemies (10)
Create a new title screen (e.g., new artwork, typography, layout) (10)

TOTAL POINTS: 110
*/