// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, animation) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        this.anims.play(animation, true);
        this.on('animationcomplete', () => {    // callback after anim completes
            this.anims.play(animation, true);                       // remove explosion sprite
        });

    }

    update() {
        // move spaceship left
        this.x += this.moveSpeed;
        // wrap around from left edge to right edge
        //if(this.x <= 0 - this.width) {
        if(this.x >= game.config.width + this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = 0 - this.width;
    }
}