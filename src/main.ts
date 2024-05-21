import Phaser from 'phaser';
import Preloader from './preloader'
import StartMenu from './start-menu'
//import cursorImage from '/cursorimage.png';
//clean up scene/polish it
//background to game, music/sound, some part of the game,endgame scene (win happy cat/lose sad cat)
//timer when not given fish, sound fx when the character interacts with fish
class Game extends Phaser.Scene 
{
    constructor () {
        super({ key: 'main-game'})
        }
    wKey: Phaser.Input.Keyboard.Key | undefined;
    aKey: Phaser.Input.Keyboard.Key | undefined;
    sKey: Phaser.Input.Keyboard.Key | undefined;
    dKey: Phaser.Input.Keyboard.Key | undefined;

    container: any
    container2: any

  /*  preloadImages(numOfIterations: number, uniqueId: string, location: string ) {
        for (let i = 1; i <= numOfIterations; i++) {
            this.load.image(uniqueId + '-' + i, location)
        }
    } */
/*
    placeImages(numOfIterations: number, uniqueId1: string, scale: number, borderx: number, bordery: number) {
        console.log(numOfIterations, uniqueId1, scale, borderx, bordery)
        for (let i = 1; i <= numOfIterations; i++) {
            let uniqueId = this.add.image(borderx * Math.random(), bordery * Math.random(), uniqueId1 + '-' + i)
            uniqueId.scale = scale;
        }
    }   */
    preloadPlusPlaceImages() {
    //    this.placeImages(5, 'enemy', .2, 1920, 1080)
    //    this.placeImages(4, 'character', .2, 250, 250)
    }

  /*  preload() {
        this.preloadImages(5, 'character', '/petsprite.png');
        this.preloadImages(5, 'enemy', '/fishfood.png')

        this.load.image('enemy', '/fishfood.png');
        this.load.image('character', '/petsprite.png');
    } */

    create() {
    
        this.wKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.aKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.sKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.D); 
        this.input.setDefaultCursor('url(/cursorimage.png), pointer')            //changing cursor image
        
        const maingamebk = this.add.image(1200 , 300, 'gamebackground');
        maingamebk.setScale(3)
        const circleImages = this.add.image(1745, 190, 'circle');
        const catfoodtxt = this.add.text(1690, 60, 'Cat Food', {fontFamily: 'Impact', fontSize: '30px', color: '#D8BFD8'});

        //const characterImages = this.add.image(0, 0, 'character');   // draggable cat
        const characterImage = this.add.image(500, 300, 'character');
        characterImage.setScale(1.5);
        const character = this.add.container(400, 300);
        character.add([ characterImage ]);
        character.setSize(400, 300);

        this.container2 = this.add.container(400, 300)
      //  this.container2.add([ characterImages ]); //draggable cat
        this.container2.setSize(400, 300);
        this.container2.setInteractive({ draggable: true });

        this.container2.on('drag', (pointer, dragX, dragY) => {
            console.log('enemy')
            this.container2.x = dragX;
            this.container2.y = dragY;

        });

        this.container2.on('pointerdown', (pointer, dragX, dragY) => {
            console.log('click')
        });   

        const enemyImages = this.add.image(750, -80, 'enemy'); 
        enemyImages.setScale(0.3)

        this.container = this.add.container(1000, 300)
        this.container.add([ enemyImages ]);

        this.container.setSize(2500, 250); 
        this.container.setInteractive({ draggable: true });

        this.container.on('drag', (pointer, dragX, dragY) => {
            console.log('enemy')
            this.container.x = dragX;
            this.container.y = dragY;

        });

        this.container.on('pointerdown', (pointer, dragX, dragY) => {
            console.log('click')
        });
    
      //  this.preloadPlusPlaceImages();

      /*  const enemyImage = this.add.image(1050, -500, 'enemy');
        enemyImage.setScale(2); */

        
        const enemy = this.add.container(1000, 500);

      //  enemy.add([ enemyImage ])


        enemy.setSize(1050, -500);
        enemy.setInteractive({ draggable: true });

        enemy.on('drag', function (pointer, dragX, dragY) {         //moves the image to where the pointer drags it 
            console.log('enemy')
            enemy.x = dragX;
            enemy.y = dragY;

        }); 

        enemy.on('pointerdown', function (pointer, dragX, dragY) {
            console.log('click')
        });
                //error: cat character is somehow being dragged even though theres only code for cat food to be set as draggable
               // if (enemy x & y pos == /width && /height)
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

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene:  [Preloader, StartMenu, Game],
    scale: 
    {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
export const game = new Phaser.Game(config)