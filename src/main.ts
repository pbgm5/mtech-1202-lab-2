import Phaser from 'phaser';


class Game extends Phaser.Scene {

    wKey: Phaser.Input.Keyboard.Key | undefined; //*
    aKey: Phaser.Input.Keyboard.Key | undefined;
    sKey: Phaser.Input.Keyboard.Key | undefined;
    dKey: Phaser.Input.Keyboard.Key | undefined;

    container: any
    container2: any //*/

    preloadImages(numOfIterations: number, uniqueId: string, location: string ) {
        for (let i = 1; i <= numOfIterations; i++) {
            this.load.image(uniqueId + '-' + i, location)
        }
    }
    placeImages(numOfIterations: number, uniqueId1: string, scale: number, borderx: number, bordery: number) {
        console.log(numOfIterations, uniqueId1, scale, borderx, bordery)
        for (let i = 1; i <= numOfIterations; i++) {
            let uniqueId = this.add.image(borderx * Math.random(), bordery * Math.random(), uniqueId1 + '-' + i)
            uniqueId.scale = scale;
        }
    }
    preloadPlusPlaceImages() {
        this.placeImages(5, 'enemy', .2, 1920, 1080)
        this.placeImages(4, 'character', .2, 250, 250)
    }

    preload() {
        this.preloadImages(5, 'character', '/petsprite.jpg');
        this.preloadImages(5, 'enemy', '/fishfood.png')

        this.load.image('enemy', '/fishfood.png');
        this.load.image('character', '/petsprite.jpg');
    }

    create() {

        this.wKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W); //*
        this.aKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D); //*

        const enemyImages = this.add.image(0, 0, 'enemy');
        enemyImages.setScale(0.3)
        const characterImages = this.add.image(0, 0, 'character');

        this.container = this.add.container(400, 300)
        this.container.add([ enemyImages ]);

        this.container.setSize(400, 300);
        this.container.setInteractive({ draggable: true });

        this.container.on('drag', (pointer, dragX, dragY) => {
            console.log('enemy')
            this.container.x = dragX;
            this.container.y = dragY;

        });

        this.container.on('pointerdown', (pointer, dragX, dragY) => {
            console.log('click')
        });

        this.container2 = this.add.container(400, 300)


        this.container2.add([ characterImages ]);


        this.container2.setSize(400, 300);
        this.container2.setInteractive({ draggable: true });

        this.container2.on('drag', (pointer, dragX, dragY) => {
            console.log('enemy')
            this.container2.x = dragX;
            this.container2.y = dragY;

        });

        this.container2.on('pointerdown', (pointer, dragX, dragY) => {
            console.log('click')
        });   //*
    

        //this.placeImages(5, 'enemy', .2, 1920, 1080)
        this.placeImages(4, 'character', .2, 250, 250)

        this.preloadPlusPlaceImages();

        const enemyImage = this.add.image(0, 0, 'enemy');

        const characterImage = this.add.image(0, 0, 'character');

        const character = this.add.container(400, 300);

        const enemy = this.add.container(400, 300);

        enemy.add([ enemyImage ]);

        character.add([ characterImage ]);

        character.setSize(400, 300);
        enemy.setSize(400, 300);
        enemy.setInteractive({ draggable: true });

        enemy.on('drag', function (pointer, dragX, dragY) {         //moves the image to where the pointer drags it 
            console.log('enemy')
            enemy.x = dragX;
            enemy.y = dragY;

        });

        enemy.on('pointerdown', function (pointer, dragX, dragY) {
            console.log('click')
        });


       /* const arr = [];
        const enmarr = [];
        for (let i = 1; i <= 5; i++) {
            let enemy = this.add.image(1920 * Math.random(), 1080 * Math.random(), 'enemy-' + i);
            enemy.scale = .2;
            enmarr.push(enemy);
        } */

       /* for (let j = 1; j <= 4; j++) {
            let character = this.add.image(250 * j, 250 * j, 'character-' + j);
            character.scale = .2;
            arr.push(character);
        } */
    }
    update() {
        if(this.aKey?.isDown) {
            this.container.x = this.container.x -= 10;
            }
            if(this.dKey?.isDown) {
            this.container.x = this.container.x += 10;
            }
            if(this.wKey?.isDown) {
            this.container.y = this.container.y -= 10;
            }
            if(this.sKey?.isDown) {
            this.container.y = this.container.y += 10;
             }
    }
}
const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: Game,
    scale:
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
export const game = new Phaser.Game(config)