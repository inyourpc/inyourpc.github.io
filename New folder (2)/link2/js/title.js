var titleState = {

	create: function() { 
		this.BloopSound = this.add.audio('bloop');
        this.VocalStingSound = this.add.audio('vocalSting');
        
        this.add.image(0, 0, 'greenSwirl');
        
        this.playBtn = game.add.button(game.world.centerX, game.world.centerY, 'titleScreenImages', this.playGame, this, 'PlayBtnDown.psd','PlayBtn.psd','PlayBtnDown.psd');
		this.playBtn.anchor.setTo(0.5);
		
        this.logo = game.add.sprite(0, 0, 'titleScreenImages');
		this.logo.frameName = 'MMLogo.psd';
		this.logo.visible = false;
		
		if (creditunion== "undefined" || creditunion == "") {
            this.presentsType = game.add.bitmapText(720, 134, 'OgreWhite', 'The Money Mammals\nPresent', 40);
        } else {
            this.presentsType = game.add.bitmapText(720, 134, 'OgreWhite', 'The Money Mammals and\r' + creditunion + '\rPresent', 40);
        }
		this.presentsType.anchor.setTo(0.5);
        this.presentsType.align = 'center';
		this.presentsType.visible = false;
        
        this.marmoset = game.add.sprite(1212, 759, 'titleScreenImages');
		this.marmoset.frameName = 'MarmosetLg.psd';
		this.marmoset.anchor.setTo(0.5, 0.5);
        this.marmoset.visible = false;
        
        this.titleType = game.add.sprite(700, 585, 'titleScreenImages');
		this.titleType.frameName = 'TitleType.psd';
		this.titleType.anchor.setTo(0.5, 0.5);
		this.titleType.visible = false;
		
		if (creditunionlogo !== undefined && creditunionlogo !== "") {
			this.cuLogoBkgnd = game.add.sprite(1204, 150, 'titleScreenImages');
			this.cuLogoBkgnd.frameName = 'CULogoBkgnd.psd';
			this.cuLogoBkgnd.anchor.setTo(0.5);
			this.cuLogoBkgnd.visible = false;
		
			this.cuLogoImage = this.add.image(1204, 150, 'creditUnionLogo');
			this.cuLogoImage.anchor.setTo(0.5);
			this.cuLogoImage.scale.setTo(1.85);
			this.cuLogoImage.visible = false;
        }
                        
        this.startBtn = game.add.button(678, 876, 'titleScreenImages', this.start, this, 'StartBtnDown.psd','StartBtn.psd','StartBtnDown.psd');
        this.startBtn.anchor.setTo(0.5, 0.5);
        this.startBtn.visible = false;
				
		this.copyright = game.add.bitmapText (30, 890, 'OgreWhite', 'Created by Rooney Design\nCopyright 2020 Snigglezoo Entertainment', 20);
		this.copyright.anchor.setTo(0);
		this.copyright.align = 'left';
		this.copyright.visible = false;
	},
	
	playGame: function() {
        this.VocalStingSound.play();
        this.playBtn.visible = false;
        this.logo.visible = true;
        this.presentsType.visible = true;
        this.marmoset.visible = true;
        this.titleType.visible = true;
        this.startBtn.visible = true;
        this.copyright.visible = true;
        
        if (creditunionlogo !== undefined && creditunionlogo !== "") {
				this.cuLogoBkgnd.visible= true;
            	this.cuLogoImage.visible= true;
        }
	},

	start: function() {
        this.BloopSound.play();
		game.state.start('game');		
	},
};