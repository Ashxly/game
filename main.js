// We create our only state
var mainState = {
    // Here we add all the functions we need for our state
    // For this project we will just have 3
    preload: function () {
        // This function will be executed at the beginning
        // That's where we load the game's assets
        // Load the image
        game.load.image("camel","camel.jpg");
        game.load.image('cracker','cracker.png')
    }
    , create: function () {
        // This function is called after the 'preload' function 
        // Here we set up the game, display sprites, etc.
        this.keyboard = game.input.keyboard.createCursorKeys();
        
        this.player = game.add.sprite(300, 300, "camel");
        this.player.scale.setTo(.5,.5);
        
        this.cracker = game.add.group() ;
        this.cracker.enablebody = true;
        this.cracker.createMultiple (10, 'cracker');
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        game.time.events.loop (220, this.addCracker,this);
    }
    , update: function () {
        this.player.body.velocity.x= 0;
        if (this.keyboard.right.isDown){
            this.player.body.velocity.x = 300;
        }else if (this.keyboard.left.isDown) { 
        this.player.body.velocity.x = -300;
        }
        
        if( this.keyboard.up.isDown){ 
        this.player.body.velocity.y = -300 ;
        }
        // This contains Game Logic 
    }
    ,addCracker: function(){ 
        var cracker = this.cracker.getFirstDead();
        
        if (!cracker) { 
            return;
        }
        
        cracker.scale.setTo(.2,.2);
        cracker.anchor.setTo(0.5,1);
        cracker.reset( game.rnd.pick([ game.width/2,0]),0);
        cracker.body.gravity.y = 500;
        cracker.body.velocity.x = 100 *game.rnd.pick([-2,2]);
        cracker.body.bounce.x = 1;
        cracker.checkWorldBounds = true;
        cracker.outOfBoundsKill = true; 
    }
    
};
// We initialize Phaser
var game = new Phaser.Game(800, 800, Phaser.AUTO, '');
// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');