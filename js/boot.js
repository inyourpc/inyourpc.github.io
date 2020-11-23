var bootState = {

	preload: function () {
		game.load.image('progressBar', 'assets/ProgressBar.png');
        game.load.image('progressBarBkgnd', 'assets/ProgressBarBkgnd.png');
       
	},

	create: function() { 
		game.stage.backgroundColor = '#000000';
		game.physics.startSystem(Phaser.Physics.ARCADE);

        
    	if (game.device.desktop){
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.maxWidth = 1146;
            game.scale.maxHeight = 764;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.windowConstraints.bottom="visual";
            game.scale.refresh();
            }
         else{
         	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
         	//game.scale.maxWidth = 1008;
            //game.scale.maxHeight = 672;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.windowConstraints.bottom="visual";
            game.scale.refresh();
		 }

		game.state.start('load');
	},
};