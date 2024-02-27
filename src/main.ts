import phaser from 'phaser';

class Game extends phaser.Scene {
    preload () {}
    create () {}
}
 
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: Game,
    physics: {
        default: 'arcade'
    }
};
const game = new Phaser.Game(config)