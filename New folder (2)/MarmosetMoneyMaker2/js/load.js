var loadState = {

	preload: function () {	
		
		this.background = game.add.bitmapData(1440, 960);
        this.gradient = this.background.context.createLinearGradient(0,0,0,960);
        this.gradient.addColorStop(0,"#0071B7");
        this.gradient.addColorStop(1,"#29A6DD");
        this.background.context.fillStyle = this.gradient;
        this.background.context.fillRect(0,0,1440, 960);
        game.add.sprite(0, 0, this.background);
                
        var progressBarBkgnd = game.add.sprite(game.world.centerX, game.world.centerY, 'progressBarBkgnd');
		progressBarBkgnd.anchor.setTo(0.5);

 		var progressBar = game.add.sprite(360, game.world.centerY, 'progressBar');
 		progressBar.anchor.setTo(0, 0.5);
 		game.load.setPreloadSprite(progressBar);
        
		game.load.bitmapFont('OgreWhite', 'fonts/OgreWhite.png', 'fonts/OgreWhite.xml');
        game.load.bitmapFont('OgreBlack', 'fonts/OgreBlack.png', 'fonts/OgreBlack.xml');
		game.load.bitmapFont('BigLimboBlack', 'fonts/BigLimboBlack.png', 'fonts/BigLimboBlack.xml');
        game.load.bitmapFont('BigLimboWhite', 'fonts/BigLimboWhite.png', 'fonts/BigLimboWhite.xml');

        game.load.image('greenSwirl', 'assets/GreenSwirl.jpg');
        game.load.image('printoutLines', 'assets/PrintoutLines.png');
        
        game.load.atlas('titleScreenImages', 'assets/TitleScreenImages.png', 'assets/TitleScreenImages.json' );
        game.load.atlas('gameImages', 'assets/GameImages.png', 'assets/GameImages.json' );
        game.load.atlas('moneyBkgnds', 'assets/MoneyBkgnds.png', 'assets/MoneyBkgnds.json' );
        
		game.load.audio('vocalSting', ['sounds/MMVocalSting.ogg', 'sounds/MMVocalSting.mp3']);
        game.load.audio('bloop', ['sounds/Bloop.ogg', 'sounds/Bloop.mp3']);
        game.load.audio('click', ['sounds/SoftClick.ogg', 'sounds/SoftClick.mp3']);
        game.load.audio('pop', ['sounds/Flup.ogg', 'sounds/Flup.mp3']);
        
        if (creditunionlogo !== undefined && creditunionlogo !== "") {
            game.load.crossOrigin = 'anonymous';
            game.load.image('creditUnionLogo', creditunionlogoURL);
        }
	},

	create: function() { 
		//game.state.start('title');
        game.state.start('game');
	}
};