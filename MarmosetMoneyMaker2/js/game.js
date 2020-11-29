var gameState = {

	create: function() {
        this.BloopSound = this.add.audio('bloop');
        this.ClickSound = this.add.audio('click');
        this.PopSound = this.add.audio('pop');
        
        this.templateNum = 1;
		this.denomNum = 0;
		this.portraitNum = 0;
        this.colorNum  = 0;
		this.moneyTitle = 'THE MONEY MAMMALS';
		this.step = 1;
        
        this.stepOvalArray = ['Step1Oval.psd','Step2Oval.psd','Step3Oval.psd','Step4Oval.psd','Step5Oval.psd','Step6Oval.psd'];
        this.titleArray = ['Select a Template','Select a Denomination','Select a Portrait','Type the Title','Select a Color','Print Out\rPlay Money'];
        
        this.denomSpelledArray = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'TEN', 'TWENTY', 'FIFTY', 'ONE HUNDRED', 'FIVE HUNDRED', 'ONE THOUSAND', 'FIVE THOUSAND', 'TEN THOUSAND', 'TWENTY THOUSAND', 'FIFTY THOUSAND', 'HUNDRED THOUSAND'];
        
        this.denomNumArray = [1, 2, 3, 4, 5, 10, 20, 50, 100, 500, 1000, 5000, 10000, 20000, 50000, 100000];
        
        this.portraitArray = ['JoePortrait.psd', 'ClaraPortrait.psd', 'PiggsPortrait.psd', 'MarmosetPortrait.psd', 'VargasPortrait.psd', 'FrugalPortrait.psd', 'PumaPortrait.psd', 'FoxPortrait.psd', 'TigerPortrait.psd'];
		
        this.background = game.add.bitmapData(1440, 960);
        this.gradient = this.background.context.createLinearGradient(0,0,0,960);
        this.gradient.addColorStop(0,"#A3E297");
        this.gradient.addColorStop(1,"#199021");
        this.background.context.fillStyle = this.gradient;
        this.background.context.fillRect(0,0,1440, 960);
        game.add.sprite(0, 0, this.background);
        
        this.stepOval = game.add.sprite(38, 21, 'gameImages');
		this.stepOval.frameName = this.stepOvalArray[this.step-1];
		this.stepOval.anchor.setTo(0);
        
        this.title = game.add.bitmapText (160, 40, 'BigLimboWhite', this.titleArray[this.step-1], 96);
        game.cache.getBitmapFont('BigLimboWhite').font.lineHeight = 72;
        this.title.tint = 0x006A44;
		this.title.anchor.setTo(0);
		this.title.align = 'left';
        
        this.sectionBkgndPoly = new Phaser.Polygon();
        this.sectionBkgndPoly.setTo([ new Phaser.Point(12, 208), new Phaser.Point(1423, 179), new Phaser.Point(1398, 907), new Phaser.Point(29, 938) ]);
        this.sectionBkgnd = game.add.graphics(0, 0);
        this.sectionBkgnd.beginFill(0xffffff);
        this.sectionBkgnd.drawPolygon(this.sectionBkgndPoly.points);
        this.sectionBkgnd.endFill();
        this.sectionBkgnd.alpha = .5;
        
        this.step1Group = game.add.group();
        this.step2Group = game.add.group();
        this.step3Group = game.add.group();
        this.step4Group = game.add.group();
        this.step5Group = game.add.group();
        this.step6Group = game.add.group();
        
        //MONEY DISPLAY––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.moneyDisplayGroup = game.add.group();
         
        this.moneyDisplayFrame = game.add.graphics(0, 0);
        this.moneyDisplayFrame.beginFill(0xFFFFFF);
        this.moneyDisplayFrame.drawRect(680, 250, 700, 368);
        this.moneyDisplayGroup.add(this.moneyDisplayFrame);
        
        this.moneyHolderGroup = game.add.group();
        this.moneyDisplayGroup.add(this.moneyHolderGroup);
        
        this.buildMoney();
        
        //this.buildMoneyArray[this.templateNum];
        this.moneyGroup.x = 680;
        this.moneyGroup.y = 250;
        this.moneyHolderGroup.add(this.moneyGroup);
        
        this.colorOverlay = game.add.graphics(0, 0);
        this.colorOverlay.beginFill(0xFFFFFF);
        this.colorOverlay.drawRect(680, 250, 700, 368);
        this.colorOverlay.blendMode = Phaser.blendModes.MULTIPLY;
        this.moneyDisplayGroup.add(this.colorOverlay);
        
        //NAV BTNS–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.btnBkgndPoly = new Phaser.Polygon();
        this.btnBkgndPoly.setTo([ new Phaser.Point(792, 692), new Phaser.Point(1293, 693), new Phaser.Point(1230, 886), new Phaser.Point(857, 855) ]);
        this.btnBkgnd = game.add.graphics(0, 0);
        this.btnBkgnd.beginFill(0xffffff);
        this.btnBkgnd.drawPolygon(this.btnBkgndPoly.points);
        this.btnBkgnd.endFill();
        this.btnBkgnd.alpha = .5;
        
        this.backBtn = game.add.button(946, 777, 'gameImages', this.onBackBtnDown, this, 'BackBtnDown.psd','BackBtn.psd','BackBtnDown.psd');
        this.backBtn.anchor.setTo(0.5);
        this.backBtn.visible = false;
        
        this.nextBtn = game.add.button(1138, 777, 'gameImages', this.onNextBtnDown, this, 'NextBtnDown.psd','NextBtn.psd','NextBtnDown.psd');
        this.nextBtn.anchor.setTo(0.5);
        
        //STEP 1 TEMPLATE––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.template1Btn = game.add.button(184, 324, 'gameImages', function() {this.onTemplateBtnDown(1)}, this, 'Template1Btn.psd','Template1Btn.psd','Template1Btn.psd');
        this.template1Btn.anchor.setTo(0.5);
        this.step1Group.add(this.template1Btn);
        
        this.template2Btn = game.add.button(488, 324, 'gameImages', function() {this.onTemplateBtnDown(2)}, this, 'Template2Btn.psd','Template2Btn.psd','Template2Btn.psd');
        this.template2Btn.anchor.setTo(0.5);
        this.step1Group.add(this.template2Btn);
        
        this.template3Btn = game.add.button(184, 512, 'gameImages', function() {this.onTemplateBtnDown(3)}, this, 'Template3Btn.psd','Template3Btn.psd','Template3Btn.psd');
        this.template3Btn.anchor.setTo(0.5);
        this.step1Group.add(this.template3Btn);
        
        this.template4Btn = game.add.button(488, 512, 'gameImages', function() {this.onTemplateBtnDown(4)}, this, 'Template4Btn.psd','Template4Btn.psd','Template4Btn.psd');
        this.template4Btn.anchor.setTo(0.5);
        this.step1Group.add(this.template4Btn);
        
        this.template5Btn = game.add.button(184, 700, 'gameImages', function() {this.onTemplateBtnDown(5)}, this, 'Template5Btn.psd','Template5Btn.psd','Template5Btn.psd');
        this.template5Btn.anchor.setTo(0.5);
        this.step1Group.add(this.template5Btn);
        
        this.template6Btn = game.add.button(488, 700, 'gameImages', function() {this.onTemplateBtnDown(6)}, this, 'Template6Btn.psd','Template6Btn.psd','Template6Btn.psd');
        this.template6Btn.anchor.setTo(0.5);
        this.step1Group.add(this.template6Btn);
        
        //STEP 2 DENOMINATION––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
		
		this.denom1Btn = game.add.sprite(168, 270, 'gameImages');
		this.denom1Btn.frameName = 'RadioBtnChecked.psd';
		this.denom1Btn.anchor.setTo(0.5);
		this.denom1Btn.inputEnabled = true;
		this.denom1Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom1Btn,0)}, this);
		this.step2Group.add(this.denom1Btn);
		
		this.denom1Label = game.add.bitmapText(196, 270, 'OgreBlack', '1', 36);
		this.denom1Label.anchor.setTo(0,0.5);
		this.denom1Label.align = 'left';
		this.step2Group.add(this.denom1Label);
		
		this.denom2Btn = game.add.sprite(168, 350, 'gameImages');
		this.denom2Btn.frameName = 'RadioBtn.psd';
		this.denom2Btn.anchor.setTo(0.5);
		this.denom2Btn.inputEnabled = true;
		this.denom2Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom2Btn,1)}, this);
		this.step2Group.add(this.denom2Btn);
		
		this.denom2Label = game.add.bitmapText(196, 350, 'OgreBlack', '2', 36);
		this.denom2Label.anchor.setTo(0,0.5);
		this.denom2Label.align = 'left';
		this.step2Group.add(this.denom2Label);
		
		this.denom3Btn = game.add.sprite(168, 430, 'gameImages');
		this.denom3Btn.frameName = 'RadioBtn.psd';
		this.denom3Btn.anchor.setTo(0.5);
		this.denom3Btn.inputEnabled = true;
		this.denom3Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom3Btn,2)}, this);
		this.step2Group.add(this.denom3Btn);
		
		this.denom3Label = game.add.bitmapText(196, 430, 'OgreBlack', '3', 36);
		this.denom3Label.anchor.setTo(0,0.5);
		this.denom3Label.align = 'left';
		this.step2Group.add(this.denom3Label);
		
		this.denom4Btn = game.add.sprite(168, 510, 'gameImages');
		this.denom4Btn.frameName = 'RadioBtn.psd';
		this.denom4Btn.anchor.setTo(0.5);
		this.denom4Btn.inputEnabled = true;
		this.denom4Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom4Btn,3)}, this);
		this.step2Group.add(this.denom4Btn);
		
		this.denom4Label = game.add.bitmapText(196, 510, 'OgreBlack', '4', 36);
		this.denom4Label.anchor.setTo(0,0.5);
		this.denom4Label.align = 'left';
		this.step2Group.add(this.denom4Label);
		
		this.denom5Btn = game.add.sprite(168, 590, 'gameImages');
		this.denom5Btn.frameName = 'RadioBtn.psd';
		this.denom5Btn.anchor.setTo(0.5);
		this.denom5Btn.inputEnabled = true;
		this.denom5Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom5Btn,4)}, this);
		this.step2Group.add(this.denom5Btn);
		
		this.denom5Label = game.add.bitmapText(196, 590, 'OgreBlack', '5', 36);
		this.denom5Label.anchor.setTo(0,0.5);
		this.denom5Label.align = 'left';
		this.step2Group.add(this.denom5Label);
		
		this.denom10Btn = game.add.sprite(168, 670, 'gameImages');
		this.denom10Btn.frameName = 'RadioBtn.psd';
		this.denom10Btn.anchor.setTo(0.5);
		this.denom10Btn.inputEnabled = true;
		this.denom10Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom10Btn,5)}, this);
		this.step2Group.add(this.denom10Btn);
		
		this.denom10Label = game.add.bitmapText(196, 670, 'OgreBlack', '10', 36);
		this.denom10Label.anchor.setTo(0,0.5);
		this.denom10Label.align = 'left';
		this.step2Group.add(this.denom10Label);
		
		this.denom20Btn = game.add.sprite(168, 750, 'gameImages');
		this.denom20Btn.frameName = 'RadioBtn.psd';
		this.denom20Btn.anchor.setTo(0.5);
		this.denom20Btn.inputEnabled = true;
		this.denom20Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom20Btn,6)}, this);
		this.step2Group.add(this.denom20Btn);
		
		this.denom20Label = game.add.bitmapText(196, 750, 'OgreBlack', '20', 36);
		this.denom20Label.anchor.setTo(0,0.5);
		this.denom20Label.align = 'left';
		this.step2Group.add(this.denom20Label);
		
		this.denom50Btn = game.add.sprite(168, 830, 'gameImages');
		this.denom50Btn.frameName = 'RadioBtn.psd';
		this.denom50Btn.anchor.setTo(0.5);
		this.denom50Btn.inputEnabled = true;
		this.denom50Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom50Btn,7)}, this);
		this.step2Group.add(this.denom50Btn);
		
		this.denom50Label = game.add.bitmapText(196, 830, 'OgreBlack', '50', 36);
		this.denom50Label.anchor.setTo(0,0.5);
		this.denom50Label.align = 'left';
		this.step2Group.add(this.denom50Label);
		
		this.denom100Btn = game.add.sprite(370, 270, 'gameImages');
		this.denom100Btn.frameName = 'RadioBtn.psd';
		this.denom100Btn.anchor.setTo(0.5);
		this.denom100Btn.inputEnabled = true;
		this.denom100Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom100Btn,8)}, this);
		this.step2Group.add(this.denom100Btn);
		
		this.denom100Label = game.add.bitmapText(398, 270, 'OgreBlack', '100', 36);
		this.denom100Label.anchor.setTo(0,0.5);
		this.denom100Label.align = 'left';
		this.step2Group.add(this.denom100Label);
		
		this.denom500Btn = game.add.sprite(370, 350, 'gameImages');
		this.denom500Btn.frameName = 'RadioBtn.psd';
		this.denom500Btn.anchor.setTo(0.5);
		this.denom500Btn.inputEnabled = true;
		this.denom500Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom500Btn,9)}, this);
		this.step2Group.add(this.denom500Btn);
		
		this.denom500Label = game.add.bitmapText(398, 350, 'OgreBlack', '500', 36);
		this.denom500Label.anchor.setTo(0,0.5);
		this.denom500Label.align = 'left';
		this.step2Group.add(this.denom500Label);
		
		this.denom1000Btn = game.add.sprite(370, 430, 'gameImages');
		this.denom1000Btn.frameName = 'RadioBtn.psd';
		this.denom1000Btn.anchor.setTo(0.5);
		this.denom1000Btn.inputEnabled = true;
		this.denom1000Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom1000Btn,10)}, this);
		this.step2Group.add(this.denom1000Btn);
		
		this.denom1000Label = game.add.bitmapText(398, 430, 'OgreBlack', '1,000', 36);
		this.denom1000Label.anchor.setTo(0,0.5);
		this.denom1000Label.align = 'left';
		this.step2Group.add(this.denom1000Label);
		
		this.denom5000Btn = game.add.sprite(370, 510, 'gameImages');
		this.denom5000Btn.frameName = 'RadioBtn.psd';
		this.denom5000Btn.anchor.setTo(0.5);
		this.denom5000Btn.inputEnabled = true;
		this.denom5000Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom5000Btn,11)}, this);
		this.step2Group.add(this.denom5000Btn);
		
		this.denom5000Label = game.add.bitmapText(398, 510, 'OgreBlack', '5,000', 36);
		this.denom5000Label.anchor.setTo(0,0.5);
		this.denom5000Label.align = 'left';
		this.step2Group.add(this.denom5000Label);
		
		this.denom10000Btn = game.add.sprite(370, 590, 'gameImages');
		this.denom10000Btn.frameName = 'RadioBtn.psd';
		this.denom10000Btn.anchor.setTo(0.5);
		this.denom10000Btn.inputEnabled = true;
		this.denom10000Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom10000Btn,12)}, this);
		this.step2Group.add(this.denom10000Btn);
		
		this.denom10000Label = game.add.bitmapText(398, 590, 'OgreBlack', '10,000', 36);
		this.denom10000Label.anchor.setTo(0,0.5);
		this.denom10000Label.align = 'left';
		this.step2Group.add(this.denom10000Label);
		
		this.denom20000Btn = game.add.sprite(370, 670, 'gameImages');
		this.denom20000Btn.frameName = 'RadioBtn.psd';
		this.denom20000Btn.anchor.setTo(0.5);
		this.denom20000Btn.inputEnabled = true;
		this.denom20000Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom20000Btn,13)}, this);
		this.step2Group.add(this.denom20000Btn);
		
		this.denom20000Label = game.add.bitmapText(398, 670, 'OgreBlack', '20,000', 36);
		this.denom20000Label.anchor.setTo(0,0.5);
		this.denom20000Label.align = 'left';
		this.step2Group.add(this.denom20000Label);
		
		this.denom50000Btn = game.add.sprite(370, 750, 'gameImages');
		this.denom50000Btn.frameName = 'RadioBtn.psd';
		this.denom50000Btn.anchor.setTo(0.5);
		this.denom50000Btn.inputEnabled = true;
		this.denom50000Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom50000Btn,14)}, this);
		this.step2Group.add(this.denom50000Btn);
		
		this.denom50000Label = game.add.bitmapText(398, 750, 'OgreBlack', '50,000', 36);
		this.denom50000Label.anchor.setTo(0,0.5);
		this.denom50000Label.align = 'left';
		this.step2Group.add(this.denom50000Label);
		
		this.denom100000Btn = game.add.sprite(370, 830, 'gameImages');
		this.denom100000Btn.frameName = 'RadioBtn.psd';
		this.denom100000Btn.anchor.setTo(0.5);
		this.denom100000Btn.inputEnabled = true;
		this.denom100000Btn.events.onInputDown.add(function() {this.onDenomBtnDown(this.denom100000Btn,15)}, this);
		this.step2Group.add(this.denom100000Btn);
		
		this.denom100000Label = game.add.bitmapText(398, 830, 'OgreBlack', '100,000', 36);
		this.denom100000Label.anchor.setTo(0,0.5);
		this.denom100000Label.align = 'left';
		this.step2Group.add(this.denom100000Label);
		
		this.denomBtnArray = [this.denom1Btn, this.denom2Btn, this.denom3Btn, this.denom4Btn, this.denom5Btn, this.denom10Btn, this.denom20Btn, this.denom50Btn, this.denom100Btn, this.denom500Btn, this.denom1000Btn, this.denom5000Btn, this.denom10000Btn, this.denom20000Btn, this.denom50000Btn, this.denom100000Btn];
        
        //STEP 3 PORTRAIT–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.portrait1Btn = game.add.button(142, 345, 'gameImages', function() {this.onPortraitBtnDown(1)}, this, 'Portrait1Btn.psd','Portrait1Btn.psd','Portrait1Btn.psd');
        this.portrait1Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait1Btn);
        
        this.portrait2Btn = game.add.button(334, 345, 'gameImages', function() {this.onPortraitBtnDown(2)}, this, 'Portrait2Btn.psd','Portrait2Btn.psd','Portrait2Btn.psd');
        this.portrait2Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait2Btn);
        
        this.portrait3Btn = game.add.button(526, 345, 'gameImages', function() {this.onPortraitBtnDown(3)}, this, 'Portrait3Btn.psd','Portrait3Btn.psd','Portrait3Btn.psd');
        this.portrait3Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait3Btn);
        
        this.portrait4Btn = game.add.button(142, 568, 'gameImages', function() {this.onPortraitBtnDown(4)}, this, 'Portrait4Btn.psd','Portrait4Btn.psd','Portrait4Btn.psd');
        this.portrait4Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait4Btn);
        
        this.portrait5Btn = game.add.button(334, 568, 'gameImages', function() {this.onPortraitBtnDown(5)}, this, 'Portrait5Btn.psd','Portrait5Btn.psd','Portrait5Btn.psd');
        this.portrait5Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait5Btn);
        
        this.portrait6Btn = game.add.button(526, 568, 'gameImages', function() {this.onPortraitBtnDown(6)}, this, 'Portrait6Btn.psd','Portrait6Btn.psd','Portrait6Btn.psd');
        this.portrait6Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait6Btn);
        
        this.portrait7Btn = game.add.button(142, 791, 'gameImages', function() {this.onPortraitBtnDown(7)}, this, 'Portrait7Btn.psd','Portrait7Btn.psd','Portrait7Btn.psd');
        this.portrait7Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait7Btn);
        
        this.portrait8Btn = game.add.button(334, 791, 'gameImages', function() {this.onPortraitBtnDown(8)}, this, 'Portrait8Btn.psd','Portrait8Btn.psd','Portrait8Btn.psd');
        this.portrait8Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait8Btn);
        
        this.portrait9Btn = game.add.button(526, 791, 'gameImages', function() {this.onPortraitBtnDown(9)}, this, 'Portrait9Btn.psd','Portrait9Btn.psd','Portrait9Btn.psd');
        this.portrait9Btn.anchor.setTo(0.5);
        this.step3Group.add(this.portrait9Btn);
        
        this.portaitBtnArray = [this.portrait1Btn, this.portrait2Btn, this.portrait3Btn, this.portrait4Btn, this.portrait5Btn, this.portrait6Btn, this.portrait7Btn, this.portrait8Btn, this.portrait9Btn];
        
        this.portraitBtnHilite = game.add.sprite(this.portrait1Btn.x, this.portrait1Btn.y, 'gameImages');
		this.portraitBtnHilite.frameName = 'PortraitBtnHilite.psd';
		this.portraitBtnHilite.anchor.setTo(.5);
        this.step3Group.add(this.portraitBtnHilite);

        //STEP 4 MONEY TITLE––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
		
        let str = `<div class="input-group">
        <input type="text" name="" id="inputbox1" class="" placeholder="THE MONEY MAMMALS">
        
        </div>
        </div>`;
        $('#gameDiv').append(str);
    
        positioninputbox();
        $("#inputbox1").hide();
        document.getElementById("inputbox1").addEventListener("change", function(){
            
           
            game.state.states.game.moneyTitle=""+ this.value;
            game.state.states.game.refreshMoneyDisplay();
           // game.state.states.game.updateScreen();
             
            
         });
   //    var element = this.add.dom(400, 300, 'div', 'background-color: rgba(255, 255, 0, 0.5); width: 300px; height: 200px; font: 48px Arial; font-weight: bold', 'Phaser 3');
     //  this.moneyTitleInput=element;
        //this.moneyTitleInput.setText('THE MONEY MAMMALS');
        
//        this.moneyTitleInput.inputEnabled = true;
//        
//        this.moneyTitleInput.events.onInputDown.add(function() {  this.moneyTitleInput.startFocus();    }, this);
        
//        this.moneyTitleInput.blockInput = false;
        
//        PhaserInput.onKeyboardClose.addOnce(function() {
//            this.resizeBackgroundImage();
//        });
//        
//        PhaserInput.onKeyboardOpen.add(function () {
//            console.error("keyboard open", PhaserInput.KeyboardOpen)
//        });
//        PhaserInput.onKeyboardClose.add(function () {
//            console.error("keyboard close", PhaserInput.KeyboardOpen)
//        });
				
		//this.step4Group.add(this.moneyTitleInput);
        
        //STEP 5 COLOR––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
		
		this.colorArray = ['0xffffff','0xfab8c8','0xf9e86c','0x9bcfa6','0xb9dad6','0xfbd282','0xf6b024','0xd3cce5']
        
		this.color1Btn = game.add.button(173, 353, 'gameImages', function() {this.onColorBtnDown(1)}, this, 'Color1Btn.psd','Color1Btn.psd','Color1Btn.psd');
        this.color1Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color1Btn);
		
		this.color2Btn = game.add.button(293, 353, 'gameImages', function() {this.onColorBtnDown(2)}, this, 'Color2Btn.psd','Color2Btn.psd','Color2Btn.psd');
        this.color2Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color2Btn);
		
		this.color3Btn = game.add.button(413, 353, 'gameImages', function() {this.onColorBtnDown(3)}, this, 'Color3Btn.psd','Color3Btn.psd','Color3Btn.psd');
        this.color3Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color3Btn);
		
		this.color4Btn = game.add.button(533, 353, 'gameImages', function() {this.onColorBtnDown(4)}, this, 'Color4Btn.psd','Color4Btn.psd','Color4Btn.psd');
        this.color4Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color4Btn);
		
		this.color5Btn = game.add.button(173, 473, 'gameImages', function() {this.onColorBtnDown(5)}, this, 'Color5Btn.psd','Color5Btn.psd','Color5Btn.psd');
        this.color5Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color5Btn);
		
		this.color6Btn = game.add.button(293, 473, 'gameImages', function() {this.onColorBtnDown(6)}, this, 'Color6Btn.psd','Color6Btn.psd','Color6Btn.psd');
        this.color6Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color6Btn);
		
		this.color7Btn = game.add.button(413, 473, 'gameImages', function() {this.onColorBtnDown(7)}, this, 'Color7Btn.psd','Color7Btn.psd','Color7Btn.psd');
        this.color7Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color7Btn);
		
		this.color8Btn = game.add.button(533, 473, 'gameImages', function() {this.onColorBtnDown(8)}, this, 'Color8Btn.psd','Color8Btn.psd','Color8Btn.psd');
        this.color8Btn.anchor.setTo(0.5);
        this.step5Group.add(this.color8Btn);

        //STEP 6 PRINT MONEY––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.leftBkgndPoly = new Phaser.Polygon();
        this.leftBkgndPoly.setTo([ new Phaser.Point(12, 208), new Phaser.Point(694, 209), new Phaser.Point(668, 938), new Phaser.Point(29, 938)]);
        this.leftBkgndSection = game.add.graphics(0, 0);
        this.leftBkgndSection.beginFill(0xffffff);
        this.leftBkgndSection.drawPolygon(this.leftBkgndPoly.points);
        this.leftBkgndSection.endFill();
        this.leftBkgndSection.alpha = .5;
        this.step6Group.add(this.leftBkgndSection);
        
        this.rightBkgndPoly = new Phaser.Polygon();
        this.rightBkgndPoly.setTo([ new Phaser.Point(734, 208), new Phaser.Point(1416, 209), new Phaser.Point(1390, 938), new Phaser.Point(751, 938)]);
        this.rightBkgndSection = game.add.graphics(0, 0);
        this.rightBkgndSection.beginFill(0xffffff);
        this.rightBkgndSection.drawPolygon(this.rightBkgndPoly.points);
        this.rightBkgndSection.endFill();
        this.rightBkgndSection.alpha = .5;
        this.step6Group.add(this.rightBkgndSection);
        
        this.step7Oval = game.add.sprite(738, 91, 'gameImages'); 
		this.step7Oval.frameName = 'Step7Oval.psd';
        this.step7Oval.anchor.setTo(0.5);
        this.step6Group.add(this.step7Oval);
        
        this.step7Title = game.add.bitmapText (803, 10, 'BigLimboWhite', 'Cut Out\rPlay Money', 96);
        this.step7Title.tint = 0x006A44;
		this.step7Title.anchor.setTo(0);
		this.step7Title.align = 'left';
        this.step6Group.add(this.step7Title);
        
        this.cutOutMoneyImage  = game.add.sprite(1082, 456, 'gameImages'); 
		this.cutOutMoneyImage.frameName = 'CutOutMoneyImage.psd';
        this.cutOutMoneyImage.anchor.setTo(0.5);
        this.step6Group.add(this.cutOutMoneyImage);
        
        this.printPlayMoneyBtn = game.add.button(350, 400, 'gameImages', this.onPrintMoneyBtnDown, this, 'PrintPlayMoneyBtnDown.psd','PrintPlayMoneyBtn.psd','PrintPlayMoneyBtnDown.psd');
        this.printPlayMoneyBtn.anchor.setTo(0.5);
        this.step6Group.add(this.printPlayMoneyBtn);
        
        this.startOverBtn = game.add.button(350, 670, 'gameImages', this.onStartOverBtnDown, this, 'StartOverBtnDown.psd','StartOverBtn.psd','StartOverBtnDown.psd');
        this.startOverBtn.anchor.setTo(0.5);
        this.step6Group.add(this.startOverBtn);
        
        //STEP GROUPS–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.stepGroupArray = [this.step1Group,this.step2Group,this.step3Group,this.step4Group,this.step5Group,this.step6Group];
        
        this.stepGroupArray[this.step-1].visible = true;

        //MONEY 10 UP–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.moneyPrintoutGroup = game.add.group();
		this.moneyPrintoutGroup.visible = false;
        
        //MONEY FUN FACTS––––––––––––––––––––––––––––––––––––––––––––––––––––––––
        
        this.grayScreen = game.add.button(0, 0, 'gameImages', this.onNothing, this, 'BlackBox.psd','BlackBox.psd','BlackBox.psd');
        this.grayScreen.width = game.world.width;
        this.grayScreen.height = game.world.height;
        this.grayScreen.alpha = .5;
        this.grayScreen.visible = false;
        
        this.moneyFunFactsGroup = game.add.group();
        this.moneyFunFactsGroup.visible = false;
				
		this.moneyFunFactsPoly = new Phaser.Polygon();
        this.moneyFunFactsPoly.setTo([ new Phaser.Point(-687, -360), new Phaser.Point(672, -409), new Phaser.Point(596, -37), new Phaser.Point(687, 409), new Phaser.Point(-676, 371), new Phaser.Point(-581, -28) ]);
        this.moneyFunFactsBkgnd = game.add.graphics(0, 0);
        this.moneyFunFactsBkgnd.beginFill(0xffff00);
        this.moneyFunFactsBkgnd.drawPolygon(this.moneyFunFactsPoly.points);
        this.moneyFunFactsBkgnd.endFill();
        this.moneyFunFactsBkgnd.anchor.setTo(0.5);
        this.moneyFunFactsGroup.add(this.moneyFunFactsBkgnd);
		
		this.moneyFunFactsTitle = game.add.bitmapText(0, -254, 'BigLimboWhite', 'MONEY FUN FACTS', 120);
		this.moneyFunFactsTitle.tint = 0x006A44;
		this.moneyFunFactsTitle.anchor.setTo(0.5);
		this.moneyFunFactsTitle.align = 'center';
		this.moneyFunFactsGroup.add(this.moneyFunFactsTitle);
        
        this.moreBtn = game.add.button(-111, 265, 'gameImages', this.onMoreBtnDown, this, 'MoreBtnDown.psd','MoreBtn.psd','MoreBtnDown.psd');
        this.moreBtn.anchor.setTo(0.5);
        this.moneyFunFactsGroup.add(this.moreBtn);
        
        this.doneBtn = game.add.button(90, 270, 'gameImages', this.onDoneBtnDown, this, 'DoneBtnDown.psd','DoneBtn.psd','DoneBtnDown.psd');
        this.doneBtn.anchor.setTo(0.5);
        this.moneyFunFactsGroup.add(this.doneBtn);
        
        this.xBtn = game.add.button(576, -309, 'gameImages', this.onXBtnDown, this, 'XBtnDown.psd','XBtn.psd','XBtnDown.psd');
        this.xBtn.anchor.setTo(0.5);
        this.moneyFunFactsGroup.add(this.xBtn);
        
        this.moneyFunFactsGroup.x = 716;
        this.moneyFunFactsGroup.y = 502;
		        
        this.moneyFunFactsBtn = game.add.button(1293, 85, 'gameImages', this.onMoneyFunFactsBtnDown, this, 'MoneyFunFactsBtnDown.psd','MoneyFunFactsBtn.psd','MoneyFunFactsBtnDown.psd');
        this.moneyFunFactsBtn.anchor.setTo(0.5,);
		
		this.funFactArray = [
			"Larger bills ($50, $100)\rcan last in circulation\rup to 8 years.",
			"The average life\rof a dollar bill is\rjust 18 months. ",
			"The number 172 can be seen on\rthe back of the U.S. $5 dollar bill\rin the bushes at the base of\rthe Lincoln Memorial.",
			"$20 bills last\rin circulation for\rapproximately 2 years.",
			"$5 bills last in circulation\rfor around 15 months.",
			"The security thread and micro\rprinting found in most currency\rtoday were first used in 1990\rin the $50 and $100 bills.",
			"On the $1 bill the Latin\rabove the pyramid,\rANNUIT COEPTIS, means\r\"God has favored our undertaking.\" ",
			"The Latin below the\rpyramid on the $1 bill,\rNOVUS ORDO SECLORUM,\rmeans \"a new order for the ages.\" ",
			"At the base of the pyramid\ron the $1 bill you will find\r\"1776\" in Roman Numerals.",
			"On the $1 bill, there is an owl\rin the upper left-hand corner\rin the shield, and a spider in the\rfront upper right-hand corner.",
			"Almost half, 48 percent,\rof the notes printed by the\rBureau of Engraving and\rPrinting are $1 notes.",
			"Martha Washington is\rthe only woman whose\rportrait has appeared\ron a U.S. currency note.",
			"If you had $10 billion and spent\r$1 every second of every day,\rit would take 317 years\rfor you to go broke. ",
			"The $20 bill is\rsometimes called a\r\"double-sawbuck.\" ",
			"While he appears on the $20 bill,\rAndrew Jackson actually\rpreferred coins to paper currency.",
			"The $2 bill\rwas last issued\rin 2003.",
			"You\'d need to fold a bill of any\rdenomination about 8,000 times\r(first forward and then backwards)\rbefore it will tear.",
			"Most people save $2 bills,\rthinking they are rare\rand therefore valuable;\rthey\'re actually worth... $2.",
			"Enough people go to banks and\rother businesses to find $2 bills\rthat there\'s a name for it:\rTom Crawl.",
			"If you had $10 billion and spent\r$1 every second of every day,\rit would take 317 years\rfor you to go broke.",
			"The number 13\r(corresponding to the\r13 colonies) figures\rprominently on the $1 bill.",
			"Pocahontas appeared\ron the back of the\r$20 bill in 1875.",
			"Money isn\'t made out of paper,\rit\'s actually made out of linen.",
			"A fifty dollar bill is often\rcalled a Grant because\rit features a portrait of\rUlysses S. Grant.",
			"A $100 bill has many nicknames:\rC-note, Hundo, Hunksy, Franklin,\rBen, Benjy, Benny, Big one,\rand 100 bones.",
			"High-denomination bills\r($500-$100,000 notes) are\rtechnically legal tender, but\rwere last printed in 1945.",
			"The security thread in bills\r$5 and higher will turn blue\rif they are held under\rultraviolet light.",
			"The $1 bill\'s famous nickname\rof \"Greenback\" derives from\rthe black and green dollars\rcreated by Abraham Lincoln."
		];
		
		this.funFactOrder = Phaser.ArrayUtils.numberArray(0, 27);
		
		this.funFactNum = 0;
		
		this.funFact = game.add.bitmapText(0, -150, 'OgreBlack', this.funFactArray[this.funFactOrder[this.funFactNum]], 72);
		this.funFact.anchor.setTo(0.5,0);
		this.funFact.align = 'center';
		
		this.moneyFunFactsGroup.add(this.funFact);
        
        this.updateScreen();
	},
    
buildMoney: function(){
	
	//TEMPLATE 1–––––––––––––––––––––––––––––––––––––––––––––
    
    if (this.templateNum == 1) {
    
    this.moneyGroup = game.add.group();
    
    var background = game.add.sprite(0, 0, 'moneyBkgnds');
    background.frameName = 'MoneyBkgnd1.psd';
    background.anchor.setTo(0);
    this.moneyGroup.add(background);
    
    var title = game.add.bitmapText(350, 74, 'BigLimboBlack', this.moneyTitle, 40);
    title.anchor.setTo(0.5);
	if (title.width>400) { title.width = 400; };
    title.align = 'center';
    this.moneyGroup.add(title);
    
    var denom1 = game.add.bitmapText(31, 29, 'BigLimboBlack', this.denomNumArray[this.denomNum], 65);
    denom1.anchor.setTo(0);
    if (this.denomNum>10) { denom1.width = 80; };
    denom1.align = 'left';
    this.moneyGroup.add(denom1);
    
    var denom2 = game.add.bitmapText(667, 29, 'BigLimboBlack', this.denomNumArray[this.denomNum], 65);
    denom2.anchor.setTo(1,0);
    if (this.denomNum>10) { denom2.width = 80; };
    denom2.align = 'right';
    this.moneyGroup.add(denom2);
    
    var denom3 = game.add.bitmapText(72.3, 311, 'BigLimboBlack', this.denomNumArray[this.denomNum], 60);
    denom3.anchor.setTo(.5);
    denom3.align = 'center';
    if (this.denomNum>5) { denom3.width = 68; };
    this.moneyGroup.add(denom3);
    
    var denom4 = game.add.bitmapText(628, 311, 'BigLimboBlack', this.denomNumArray[this.denomNum], 60);
    denom4.anchor.setTo(.5);
    denom4.align = 'center';
    if (this.denomNum>5) { denom4.width = 68; }
    this.moneyGroup.add(denom4);
    
    var denom5 = game.add.bitmapText(559, 189, 'BigLimboBlack', this.denomSpelledArray[this.denomNum], 88);
    denom5.anchor.setTo(.5);
    denom5.align = 'center';
	if (this.denomNum > 7) { denom5.scale.setTo(1,.5);};
    denom5.width = 145;
    this.moneyGroup.add(denom5);
    
    var portrait = game.add.sprite(373.2025 , 97, 'gameImages');
    portrait.frameName = this.portraitArray[this.portraitNum];
    portrait.anchor.setTo(.5,0);
    portrait.scale.setTo(.65);
    this.moneyGroup.add(portrait);
    
    var portraitMask1 =  game.add.graphics(0, 0);
    portraitMask1.beginFill(0xffffff);
    portraitMask1.drawRect(240, 48, 262, 272);
    this.moneyGroup.add(portraitMask1);
    portrait.mask = portraitMask1;
    
    var portraitGroup = game.add.group();
    portraitGroup.add(portrait);
    this.moneyGroup.add(portraitGroup);
    
    var portraitMask2 =  game.add.graphics(0, 0);
    portraitMask2.beginFill(0x00ffff);
    portraitMask2.drawEllipse(373.2025, 216, 100 , 118);
    this.moneyGroup.add(portraitMask2);
    portraitGroup.mask = portraitMask2;
    
    }
	//TEMPLATE 2–––––––––––––––––––––––––––––––––––––––––––––
    
    if (this.templateNum == 2) {
    
    this.moneyGroup = game.add.group();
    
    var background = game.add.sprite(0, 0, 'moneyBkgnds');
    background.frameName = 'MoneyBkgnd2.psd';
    background.anchor.setTo(0);
    this.moneyGroup.add(background);
        
    var title = game.add.bitmapText(552, 95, 'BigLimboBlack', this.moneyTitle, 40);
    title.anchor.setTo(0.5);
	if (title.width>200) { title.width = 200; };
    title.align = 'center';
    this.moneyGroup.add(title);
    
    var denom1 = game.add.bitmapText(35, 24, 'BigLimboBlack', this.denomNumArray[this.denomNum], 40);
    denom1.anchor.setTo(0);
    denom1.scale.setTo(1.5,1);
    if (this.denomNum>10) { denom1.width = 80; };
    denom1.align = 'left';
    this.moneyGroup.add(denom1);
    
    var denom2 = game.add.bitmapText(667, 24, 'BigLimboBlack', this.denomNumArray[this.denomNum], 40);
    denom2.anchor.setTo(1,0);
    denom2.scale.setTo(1.5,1);
    if (this.denomNum>10) { denom2.width = 80; }; 
    denom2.align = 'right';
    this.moneyGroup.add(denom2);
    
    var denom3 = game.add.bitmapText(35, 354, 'BigLimboBlack', this.denomNumArray[this.denomNum], 40);
    denom3.anchor.setTo(0,1);
    denom3.scale.setTo(1.5,1);
    denom3.align = 'left';
    if (this.denomNum>10) { denom3.width = 80; };
    this.moneyGroup.add(denom3);
    
    var denom4 = game.add.bitmapText(552, 305, 'BigLimboBlack', this.denomNumArray[this.denomNum], 100);
    denom4.anchor.setTo(.5,1);
    denom4.align = 'center';
    denom4.scale.setTo(1,.75);
    if (this.denomNum>5) { denom4.width = 75; }
    this.moneyGroup.add(denom4);
        
    var portrait = game.add.sprite(347 , 37, 'gameImages');
    portrait.frameName = this.portraitArray[this.portraitNum];
    portrait.anchor.setTo(.5,0);
    this.moneyGroup.add(portrait);
        
    var portraitMask =  game.add.graphics(0, 0);
    portraitMask.beginFill(0x00ffff);
    portraitMask.drawRect(98, 34, 480, 306);
    this.moneyGroup.add(portraitMask);
    portrait.mask = portraitMask;
    
    }
    
    //TEMPLATE 3–––––––––––––––––––––––––––––––––––––––––––––
    
    if (this.templateNum == 3) {
    
    this.moneyGroup = game.add.group();
    
    var background = game.add.sprite(0, 0, 'moneyBkgnds');
    background.frameName = 'MoneyBkgnd3.psd';
    background.anchor.setTo(0);
    this.moneyGroup.add(background);
        
    var title = game.add.bitmapText(295, 69, 'BigLimboBlack', this.moneyTitle, 34);
    title.anchor.setTo(0.5);
	if (title.width>247) { title.width = 247; };
    title.align = 'center';
    this.moneyGroup.add(title);
        
    var denom1 = game.add.bitmapText(75, 70, 'BigLimboBlack', this.denomNumArray[this.denomNum], 56);
    denom1.anchor.setTo(.5,1);
    denom1.scale.setTo(1.5,1);
    if (this.denomNum>10) { denom1.width = 80; };
    denom1.align = 'center';
    this.moneyGroup.add(denom1);
    
    var denom2 = game.add.bitmapText(75, 369, 'BigLimboBlack', this.denomNumArray[this.denomNum], 56);
    denom2.anchor.setTo(.5,1);
    denom2.scale.setTo(1.5,1);
    if (this.denomNum>10) { denom2.width = 80; }; 
    denom2.align = 'center';
    this.moneyGroup.add(denom2);
    
    var denom3 = game.add.bitmapText(504, 170, 'BigLimboBlack', this.denomNumArray[this.denomNum], 140);
    denom3.anchor.setTo(.5,1);
    denom3.align = 'center';
    if (denom3.width>160) { denom3.width = 160; };
    this.moneyGroup.add(denom3);
    
    var denom4 = game.add.bitmapText(640, 180, 'BigLimboWhite', this.denomNumArray[this.denomNum], 70);
    denom4.anchor.setTo(.5);
    denom4.align = 'center';
    denom4.scale.setTo(1,.75);
    if (this.denomNum>5) { denom4.width = 75; }
    this.moneyGroup.add(denom4);
    
    var portrait = game.add.sprite(475 , 88, 'gameImages');
    portrait.frameName = this.portraitArray[this.portraitNum];
    portrait.anchor.setTo(.5,0);
    portrait.scale.setTo(.95);
    this.moneyGroup.add(portrait);
        
    var portraitMask =  game.add.graphics(0, 0);
    portraitMask.beginFill(0x00ffff);
    portraitMask.drawRect(0, 0, 700, 368);
    this.moneyGroup.add(portraitMask);
    portrait.mask = portraitMask;
    
    }
    
    //TEMPLATE 4–––––––––––––––––––––––––––––––––––––––––––––
    
    if (this.templateNum == 4) {
       
    this.moneyGroup = game.add.group();
    
    var background = game.add.sprite(0, 0, 'moneyBkgnds');
    background.frameName = 'MoneyBkgnd4.psd';
    background.anchor.setTo(0);
    this.moneyGroup.add(background);
        
    var title = game.add.bitmapText(350, 40, 'OgreBlack', this.moneyTitle, 20);
    title.anchor.setTo(0.5);
	if (title.width>400) { title.width = 400; };
    title.align = 'center';
    this.moneyGroup.add(title);
        
    var denom1 = game.add.bitmapText(140, 116, 'OgreBlack', this.denomNumArray[this.denomNum], 49);
    denom1.anchor.setTo(.5);
    if (denom1.width>95) { denom1.width = 95; };
    denom1.align = 'center';
    this.moneyGroup.add(denom1);
    
    var denom2 = game.add.bitmapText(560, 256, 'OgreBlack', this.denomNumArray[this.denomNum], 49);
    denom2.anchor.setTo(.5);
    if (denom2.width>95) { denom2.width = 95; }; 
    denom2.align = 'center';
    this.moneyGroup.add(denom2);
        
    var portrait = game.add.sprite(350 , 64, 'gameImages');
    portrait.frameName = this.portraitArray[this.portraitNum];
    portrait.anchor.setTo(.5,0);
    portrait.scale.setTo(.75);
    this.moneyGroup.add(portrait);
        
    var portraitMask =  game.add.graphics(0, 0);
    portraitMask.beginFill(0x00ffff);
    portraitMask.drawEllipse(350, 183.5, 106, 125);
    this.moneyGroup.add(portraitMask);
    portrait.mask = portraitMask;
    
    }
    
    //TEMPLATE 5–––––––––––––––––––––––––––––––––––––––––––––
    
    if (this.templateNum == 5) {
    
    this.moneyGroup = game.add.group();
    
    var background = game.add.sprite(0, 0, 'moneyBkgnds');
    background.frameName = 'MoneyBkgnd5.psd';
    background.anchor.setTo(0);
    this.moneyGroup.add(background);
        
    var denom1 = game.add.bitmapText(289, 159, 'OgreBlack', this.denomNumArray[this.denomNum], 64);
    denom1.anchor.setTo(.5);
    denom1.alpha = .1;
    if (denom1.width>150) { denom1.width = 150; };
    denom1.align = 'center';
    this.moneyGroup.add(denom1);
        
    var denom2 = game.add.bitmapText(289, 123, 'OgreBlack', this.denomNumArray[this.denomNum], 64);
    denom2.anchor.setTo(.5);
    denom2.alpha = .5;
    if (denom2.width>150) { denom2.width = 150; };
    denom2.align = 'center';
    this.moneyGroup.add(denom2);
        
    var denom3 = game.add.bitmapText(289, 87, 'OgreBlack', this.denomNumArray[this.denomNum], 64);
    denom3.anchor.setTo(.5);
    if (denom3.width>150) { denom3.width = 150; };
    denom3.align = 'center';
    this.moneyGroup.add(denom3);
        
    var portrait = game.add.sprite(508 , 38, 'gameImages');
    portrait.frameName = this.portraitArray[this.portraitNum];
    portrait.anchor.setTo(.5,0);
    this.moneyGroup.add(portrait);
        
    var portraitMask =  game.add.graphics(0, 0);
    portraitMask.beginFill(0x00ffff);
    portraitMask.drawRect(202.4691 , 37.7, 460.4938, 292.5926);
    this.moneyGroup.add(portraitMask);
    portrait.mask = portraitMask;
        
    var title = game.add.bitmapText(500, 61, 'OgreBlack', this.moneyTitle, 24);
    title.anchor.setTo(0.5);
	if (title.width>300) { title.width = 300; };
	if (title.width>300) { title.width = 300; };
    title.align = 'center';
    this.moneyGroup.add(title);
    }
    
    //TEMPLATE 6–––––––––––––––––––––––––––––––––––––––––––––
    
    if (this.templateNum == 6) {
    
    this.moneyGroup = game.add.group();
    
    var background = game.add.sprite(0, 0, 'moneyBkgnds');
    background.frameName = 'MoneyBkgnd6.psd';
    background.anchor.setTo(0);
    this.moneyGroup.add(background);
        
    var title = game.add.bitmapText(572, 182, 'BigLimboBlack', this.moneyTitle, 34);
    title.anchor.setTo(0.5);
	if (title.width>195) { title.width = 195; };
    title.align = 'center';
    this.moneyGroup.add(title);
        
    var denom1 = game.add.bitmapText(32, 27, 'BigLimboBlack', this.denomNumArray[this.denomNum], 65);
    denom1.anchor.setTo(0);
    if (denom1.width>100) { denom1.width = 100; };
    denom1.align = 'left';
    this.moneyGroup.add(denom1);
    
    var denom2 = game.add.bitmapText(667, 27, 'BigLimboBlack', this.denomNumArray[this.denomNum], 65);
    denom2.anchor.setTo(1,0);
    if (denom2.width>100) { denom2.width = 100; };
    denom2.align = 'right';
    this.moneyGroup.add(denom2);
    
    var denom3 = game.add.bitmapText(32, 360, 'BigLimboBlack', this.denomNumArray[this.denomNum], 60);
    denom3.anchor.setTo(0,1);
    denom3.align = 'left';
    if (denom3.width>100) { denom3.width = 100; };
    this.moneyGroup.add(denom3);
    
    var denom4 = game.add.bitmapText(667, 360, 'BigLimboBlack', this.denomNumArray[this.denomNum], 60);
    denom4.anchor.setTo(1,1);
    denom4.align = 'right';
    if (denom4.width>100) { denom4.width = 100; }
    this.moneyGroup.add(denom4);
        
    var portrait = game.add.sprite(350 , 68, 'gameImages');
    portrait.frameName = this.portraitArray[this.portraitNum];
    portrait.anchor.setTo(.5,0);
    portrait.scale.setTo(.75);
    this.moneyGroup.add(portrait);
        
    var portraitMask =  game.add.graphics(0, 0);
    portraitMask.beginFill(0x00ffff);
    portraitMask.drawEllipse(350 , 186, 122, 122);
    this.moneyGroup.add(portraitMask);
    portrait.mask = portraitMask;
    }
},
    
onTemplateBtnDown: function(templateNum) {
    this.ClickSound.play();
    this.templateNum = templateNum;
    this.refreshMoneyDisplay();
},

    
onDenomBtnDown: function(target,denomNum) {
	this.ClickSound.play();	
	this.denomNum = denomNum;
    this.refreshMoneyDisplay();
	for (var i = 0; i < this.denomBtnArray.length; i++) {
		this.denomBtnArray[i].frameName = 'RadioBtn.psd';
	}
	target.frameName = 'RadioBtnChecked.psd';
},
    
onPortraitBtnDown: function(portraitNum) {
    this.ClickSound.play();
	this.portraitNum = portraitNum-1;
    this.refreshMoneyDisplay();
    this.portraitBtnHilite.x = this.portaitBtnArray[portraitNum-1].x;
    this.portraitBtnHilite.y = this.portaitBtnArray[portraitNum-1].y;
},
	
onColorBtnDown: function(colorNum) {
    this.ClickSound.play();
	this.colorNum = colorNum;
	this.colorOverlay.tint = this.colorArray[colorNum-1];
},

//SELECTION BTNS––––––––––––––––––––––––––––––––––––––––––

onBackBtnDown: function() {
    this.BloopSound.play();
	if (this.step == 5){
        $("#inputbox1").show();
	}else{
        $("#inputbox1").hide();
    }

    if (this.step == 4){
       
		//this.moneyTitle = this.moneyTitleInput.value.toString();
        //this.moneyTitleInput.endFocus();
        this.moneyTitle = $("#inputbox1").val();
		this.refreshMoneyDisplay();
	}
    this.step--;
    if (this.step<1) {
        this.step=1;
    }
	
    this.updateScreen();
},
    
onNextBtnDown: function() {
    this.BloopSound.play();
    if(this.step==3){
        $("#inputbox1").show();    
    }else{
        
        $("#inputbox1").hide();
    }
	if (this.step == 4){
        
		//this.moneyTitle = this.moneyTitleInput.value.toString();
        //this.moneyTitleInput.endFocus();
        this.moneyTitle = $("#inputbox1").val();
        this.refreshMoneyDisplay();
	}
    this.step++;
    if (this.step>6) {
        this.step=6;
    }
    this.updateScreen();
},
    
onMoneyFunFactsBtnDown: function() {
    if (this.moneyFunFactsGroup.visible == false) {
        this.BloopSound.play();
		this.funFactNum++;
		if (this.funFactNum>27) {
			this.funFactNum = 0;
		}
		this.funFact.setText(this.funFactArray[this.funFactOrder[this.funFactNum]]);
        this.moneyFunFactsGroup.visible = true;
        this.moneyFunFactsGroup.scale.setTo(.5,.5);
        game.add.tween(this.moneyFunFactsGroup.scale).to({ x: 1,y: 1 }, 500, Phaser.Easing.Bounce.Out, true);
        this.grayScreen.visible = true;
		}
},
    
onMoreBtnDown: function() {
    this.BloopSound.play();
	this.funFactNum++;
	if (this.funFactNum>27) {
		this.funFactNum = 0;
	}
	this.funFact.setText(this.funFactArray[this.funFactOrder[this.funFactNum]]);
},
    
onDoneBtnDown: function() {
    game.add.tween(this.moneyFunFactsGroup.scale).to({ x: .5,y: .5 }, 500, Phaser.Easing.Elastic.In, true);
    game.time.events.add(500, function () { 
			this.PopSound.play();
			this.moneyFunFactsGroup.visible=false; 
            this.grayScreen.visible = false;}, this);
},
    
onXBtnDown: function() {
    game.add.tween(this.moneyFunFactsGroup.scale).to({ x: .5,y: .5 }, 500, Phaser.Easing.Elastic.In, true);
    game.time.events.add(500, function () { 
			this.PopSound.play();
			this.moneyFunFactsGroup.visible=false; 
            this.grayScreen.visible = false;}, this);
},
    

    
updateScreen: function() {
    this.stepOval.frameName = this.stepOvalArray[this.step-1];
    this.title.setText(this.titleArray[this.step-1]);
    for (var i=0; i<this.stepGroupArray.length; i++) {
        this.stepGroupArray[i].visible = false;
    } 
    this.stepGroupArray[this.step-1].visible = true;
    
    if (this.step==1) {
        this.backBtn.visible = false;
        this.nextBtn.visible = true;
        this.moneyDisplayGroup.visible = true;
        this.backBtn.x = 946;
        this.nextBtn.x = 1042;
    } 
    if (this.step==2) {
        this.backBtn.visible = true;
        this.nextBtn.visible = true;
        this.moneyDisplayGroup.visible = true;
        this.backBtn.x = 946;
        this.nextBtn.x = 1138;
    } 
    if (this.step==3) {
        this.backBtn.visible = true;
        this.nextBtn.visible = true;
        this.moneyDisplayGroup.visible = true;
        this.backBtn.x = 946;
        this.nextBtn.x = 1138;
    } 
    if (this.step==4) {
        this.backBtn.visible = true;
        this.nextBtn.visible = true;
        this.moneyDisplayGroup.visible = true;
        this.backBtn.x = 946;
        this.nextBtn.x = 1138;
        //this.moneyTitleInput.startFocus();
    } 
    if (this.step==5) {
        this.backBtn.visible = true;
        this.nextBtn.visible = true;
        this.moneyDisplayGroup.visible = true;
        this.backBtn.x = 946;
        this.nextBtn.x = 1138;
        this.sectionBkgnd.visible = true;
        this.title.y = 40;
    } 
    if (this.step==6) {
        this.backBtn.visible = true;
        this.nextBtn.visible = false;
        this.moneyDisplayGroup.visible = false;
        this.backBtn.x = 1042;
        this.sectionBkgnd.visible = false;
        this.title.y = 10;
    } 
},
    
onStartOverBtnDown: function() {
	this.BloopSound.play();
	this.templateNum = 1;
    this.denomNum = 0;
	for (var i = 0; i < this.denomBtnArray.length; i++) {
		this.denomBtnArray[i].frameName = 'RadioBtn.psd';
	}
	this.denom1Btn.frameName = 'RadioBtnChecked.psd';
    this.portraitNum = 0;
	this.portraitBtnHilite.x = this.portaitBtnArray[0].x;
    this.portraitBtnHilite.y = this.portaitBtnArray[0].y;
    this.moneyTitle = 'THE MONEY MAMMALS';
    //this.moneyTitleInput.resetText();
    //this.moneyTitleInput.setText('THE MONEY MAMMALS');
    
    $( "#inputbox1" )[0].placeholder ( "THE MONEY MAMMALS" );
    $( "#inputbox1" ).text ( "" );
    
    this.step = 1;
    this.colorOverlay.tint = this.colorArray[0];
    this.refreshMoneyDisplay();
    this.moneyDisplayGroup.visible = true;
	this.updateScreen();
},
    
refreshMoneyDisplay: function(){
    this.moneyHolderGroup.removeAll(true);
    this.buildMoney();
    this.moneyGroup.scale.setTo(1);
    this.moneyGroup.x = 680;
    this.moneyGroup.y = 250;
    this.moneyHolderGroup.add(this.moneyGroup);
},
	
onPrintMoneyBtnDown: function() {
	this.moneyPrintoutGroup.visible = true;
    
    var printoutBkgnd =  game.add.graphics(0, 0);
    printoutBkgnd.beginFill(0xFFFFFF);
    printoutBkgnd.drawRect(0, 0, 816, 1056);
    this.moneyPrintoutGroup.add(printoutBkgnd);
    
    for (i = 0; i < 10; i++) {
        var printoutCellGroup = game.add.group();
        this.buildMoney();
        this.moneyGroup.scale.setTo(.5714286);
        if (i < 5) {
            this.moneyGroup.x = 8.6182;
            this.moneyGroup.y = i * 209.2;
        } else {
            this.moneyGroup.x = 408;
            this.moneyGroup.y = (i-5) * 209.2;
        }
        printoutCellGroup.add(this.moneyGroup);
        this.moneyPrintoutGroup.add(printoutCellGroup); 
    }
    var colorOverlayPrint =  game.add.graphics(0, 0);
    colorOverlayPrint.beginFill(0xFFFFFF);
    colorOverlayPrint.drawRect(8.6182, 0, 798.7636, 1046);
    colorOverlayPrint.blendMode = Phaser.blendModes.MULTIPLY;
    colorOverlayPrint.tint = this.colorArray[this.colorNum-1];
    this.moneyPrintoutGroup.add(colorOverlayPrint);
    
    var printoutlines = game.add.image(0, 0, 'printoutLines');
    this.moneyPrintoutGroup.add(printoutlines);

    game.scale.setGameSize(816, 1056);
    game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE  ;
    game.scale.noMargins=true;
    game.scale.pageAlignHorizontally = false;
    setTimeout(function(){ printJS({printable: document.querySelector("canvas").toDataURL(), type: 'image', imageStyle: 'width:100%;height:100%',documentTitle:'Marmoset\'s Money Maker'});
    }, 100);
   
   var that = this;

    setTimeout(function(){ 
        game.scale.setGameSize(1440, 960);
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL  ;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.noMargins=false;
        game.scale.refresh(); 
       
        that.moneyPrintoutGroup.visible = false;
        that.moneyPrintoutGroup.removeAll(true);
        that.refreshMoneyDisplay();
 
     }, 500);
},
    
};