import { MouseConstraint } from 'matter';
import Phaser from 'phaser'

export default class StartMenue extends Phaser.Scene {
    constructor () {
        super({ key: 'start-menu' })
    }


    create () {

        // add text here
        const bgm = this.sound.add('gamemusic');   //loading andmaking audio into a variable to play it
        const mainCameraWidth = this.cameras.main.width;
        const mainCameraHeight = this.cameras.main.width;
        const halfHeight = mainCameraHeight / 2;
        const halfWidth = mainCameraWidth / 2;

        const backgroundImage = this.add.image(halfWidth, halfHeight, 'backgroundImage');
        const scaleX = mainCameraHeight / backgroundImage.width;
        const scaleY = mainCameraWidth / backgroundImage.height;
        const startButton = this.add.image(halfWidth, halfHeight, 'startButton');
        const gametitle = this.add.text(750, 1, 'Pet Game!', {fontFamily: 'Impact', fontSize: '100px', color: '#ADD8E6'});

        const thisScene = this.scene;

        bgm.play();
        bgm.setLoop(true);
        bgm.setVolume(0.5); 
        //error: when you refresh the tab music stops playing in the start screen

        backgroundImage.setOrigin(0.50, .9)//sets the origin to the center of screen
        backgroundImage.setScale(.60, .60) //scales background image
        startButton.setOrigin(.5, .5)
        startButton.setScale(.2, .2) //scales button image to be smaller
        startButton.setInteractive()

        startButton.on('pointerover', function(){startButton.setTint(0xD3D3D3);})
        startButton.on('pointerout', function(){startButton.setTint(0xffffff);})
        startButton.on('pointerdown', function(){
            bgm.stop();
            thisScene.start('main-game')
        })

    }   

update () {

    }
}