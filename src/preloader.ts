// Create a class similar to "Game"
// Create a preload method within the class 
// comment out preload code block (delete it soon) Copy the preload to here
import Phaser from 'phaser';

export default class Preloader extends Phaser.Scene {
    constructor () {
    super({ key: 'preloader'})
    }

    preloadImages(numOfIterations: number, uniqueId: string, location: string ) {
        for (let i = 1; i <= numOfIterations; i++) {
            this.load.image(uniqueId + '-' + i, location)
        }
    }
    preload() {
        this.preloadImages(5, 'character', '/petsprite.png');
        this.preloadImages(5, 'enemy', '/fishfood.png')

        this.load.image('character', '/petsprite.png'); //loads images not so classes can access them
        this.load.image('enemy', '/fishfood.png');
        this.load.image('backgroundImage', '/startmenu.png');
        this.load.image('startButton', '/start-button.png');
        this.load.image('circle', '/circle.png');
        this.load.image('gamebackground', '/gamebkgd.jpeg');
        this.load.audio('gamemusic', 'backgroundmusic.mp3');
        
        const thisScene = this.scene;
        
        const { width, height } = this.sys.game.config;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, .8);
        progressBox.fillRect(480, 515, 960, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 4 + 10, height / 2 - 15, (width / 2 - 20) * value, 30);
        });
        
        this.load.on('complete', function() {
            thisScene.start('start-menu')
        })
    } 
}