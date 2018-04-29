window.addEventListener("load",function() {

	var Q = window.Q = Quintus({ audioSupported: ['ogg','mp3']})
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, TMX, Audio")
		.setup({ maximize:false, width: 320, height:  480, })
		.controls().touch()
		.enableSound()

	var maxLevel = 3;
	Q.loadTMX("level1.tmx, sprites.json, level2.tmx, level3.tmx",  function() {
        Q.state.reset({ coins: 0, lives: 3});
		Q.stageScene("mainTitle");
	});

	Q.scene("level1", function(stage) {
		Q.stageTMX("level1.tmx", stage);
		Q.audio.stop();
		Q.audio.play('music_main.mp3',{ loop: true });
		var player = stage.insert(new Q.Mario({x:100}));
		stage.add("viewport").follow(player, { x: true, y: false });
		stage.viewport.offsetX = -100;
		stage.centerOn(150,370);

		//Enemys
		stage.insert(new Q.Goomba({x:1500}));
		stage.insert(new Q.Bloopa({x:300}));
		//Coins
		stage.insert(new Q.Coin({x:400}));
		stage.insert(new Q.Coin({x:450}));
		stage.insert(new Q.Coin({x:500}));

		//Blocks of mushroom, flower and star
		stage.insert(new Q.QuestionBlockMushroom({x:570, y: 455}));
		stage.insert(new Q.QuestionBlockFlower({x:770, y: 455}));
		stage.insert(new Q.QuestionBlockStar({x:950, y: 455}));
		//Princess
		stage.insert(new Q.Peach({x:1950}));
	});

	Q.scene("level2", function(stage) {
		Q.stageTMX("level2.tmx", stage);
		Q.audio.stop();
		Q.audio.play('music_main.mp3',{ loop: true });
		var player = stage.insert(new Q.Mario({x:100}));
		stage.add("viewport").follow(player, { x: true, y: false });
		stage.viewport.offsetX = -100;
		stage.centerOn(150,370);
		
		//Enemys
		stage.insert(new Q.Goomba({x:230}));
		stage.insert(new Q.Goomba({x:1292}));

		stage.insert(new Q.Bloopa({x:525}));
		stage.insert(new Q.Bloopa({x:593}));
		stage.insert(new Q.Bloopa({x:661}));
		stage.insert(new Q.Bloopa({x:729}));
		stage.insert(new Q.Bloopa({x:797}));
		stage.insert(new Q.Bloopa({x:865}));

		stage.insert(new Q.Bloopa({x:1632}));
		stage.insert(new Q.Bloopa({x:1700}));
		stage.insert(new Q.Bloopa({x:1768}));
		//Coins
		//Princess
		var princess= stage.insert(new Q.Peach({x:1920, y:360}));
	});

	Q.scene("level3", function(stage) {
		Q.stageTMX("level3.tmx", stage);
		Q.audio.stop();
		Q.audio.play('music_main.mp3',{ loop: true });
		var player = stage.insert(new Q.Mario({x:100}));
		stage.add("viewport").follow(player, { x: true, y: true });
		stage.viewport.offsetX = -100;
		stage.viewport.offsetY = 100;
		stage.centerOn(150,370);
		
		//Enemys
		stage.insert(new Q.Goomba({x:204}));
		stage.insert(new Q.Goomba({x:646}));
		stage.insert(new Q.Goomba({x:1360, y:600}));
		stage.insert(new Q.Goomba({x:1394, y:600}));

		stage.insert(new Q.Bloopa({x:544}));
		stage.insert(new Q.Bloopa({x:782}));
		stage.insert(new Q.Bloopa({x:1020}));
		stage.insert(new Q.Bloopa({x:1292, y:456}));
		stage.insert(new Q.Bloopa({x:1564}));
		stage.insert(new Q.Bloopa({x:1598}));

		//Coins
		stage.insert(new Q.Coin({x:374, y:490}));
		stage.insert(new Q.Coin({x:646, y:490}));
		stage.insert(new Q.Coin({x:918, y:490}));
		stage.insert(new Q.Coin({x:1054, y:286}));
		stage.insert(new Q.Coin({x:1088, y:286}));
		//Princess
		stage.insert(new Q.Peach({x:1920, y:360}));
	});

	Q.scene("HUD", function(stage) {
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0)" 
		}));
		stage.insert(new Q.Coins(),container);
		stage.insert(new Q.Lives(),container);
	});


	Q.scene('endGame',function(stage) {
		Q.pauseGame();
		var container = stage.insert(new Q.UI.Container({
		x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));
		if(Q.state.get("lives") == 0 || Q.state.get("level") == maxLevel){
			var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
			label: "Play Again" }))
			var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
			label: stage.options.label }));
		}
		else{
			var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
			label: "Next Level" }))
			var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
			label: stage.options.label }));
		}
		// When the button is clicked, clear all the stages
		// and restart the game.
		Q.input.on("confirm", function(){
			Q.clearStages();
			if(Q.state.get("lives") == 0 || Q.state.get("level") > maxLevel)
				Q.stageScene('mainTitle');
			else{
					level = "level" + Q.state.get("level");
					Q.stageScene(level);
					Q.stageScene("HUD",1);
				}
		});
		
		button.on("click",function() {
			Q.clearStages();
			if(Q.state.get("lives") == 0|| Q.state.get("level") > maxLevel)
				Q.stageScene('mainTitle');
			else{
				level = "level" + Q.state.get("level");
				Q.stageScene(level);
				Q.stageScene("HUD",1);
			}
		});

	// Expand the container to visibily fit it's contents
	// (with a padding of 20 pixels)
	container.fit(20);
	});

	Q.scene('mainTitle', function(stage){
		var button = new Q.UI.Button({
			x: Q.width/2, y: Q.height/2, asset : "mainTitle.png"
		});
		stage.insert(button);
		Q.state.reset({ coins: 0, lives: 3, level: 1});
      	Q.audio.stop();
		Q.audio.play('music_water.mp3',{ loop: true });

		Q.input.on("confirm", function(){
			Q.clearStages();
			Q.stageScene('level3');
			Q.stageScene("HUD",1);
		});

		button.on("click", function(){
			Q.clearStages();
			Q.stageScene("level1");
			Q.stageScene("HUD",1);
		});
	});

	Q.UI.Text.extend("Coins",{ 
  		init: function(p) {
	    this._super({
	      label: "Coins: " + Q.state.get("coins"),
	      color: "white",
	      x: -95,
	      y: -220
	    });
	    Q.state.on("change.coins",this,"coins");
  },
  coins: function(coins) {
  	this.p.label = "Coins: " + coins;
  }
});

	Q.UI.Text.extend("Lives",{ 
  		init: function(p) {
	    this._super({
	      label: "Lives: " + Q.state.get("lives"),
	      color: "white",
	      x: 90,
	      y: -220
	    });
	    Q.state.on("change.lives",this,"lives");
  },
  lives: function(lives) {
  	this.p.label = "Lives: " + lives;
  }
});

	Q.Sprite.extend("Mario", {
		init: function(p) {
			this._super(p, {
			sprite: "mario_anim",
			sheet: "marioR",
			dead: false,
			big: false,
			fire: false,
			immortal: false,
			growing:false,
			star_powered: false,
			star_time: 0,
			immortal_time: 0,
			offsetAdjusted: false,
			x: 150, 
			y: 380
		});
			this.add('2d, platformerControls, animation');
			Q.input.on("fire", this, "shoot");
			this.on("grown", this, "end_grow");
		},

		step: function(dt) {
			if(this.p.immortal){
				this.p.immortal_time -= dt;
				if(this.p.immortal_time <= 0)
					this.p.immortal = false;
			}

			if(!this.p.dead && !this.p.growing){
				if(this.p.landed < 0){
					this.play("jump_" + this.p.direction);
				}
				else{
					if(this.p.vx > 0){
						this.play("run_right");
						this.stage.viewport.offsetX = -100;
					}
					else if (this.p.vx < 0){
						this.play("run_left");
						this.stage.viewport.offsetX = 100;
					}
					else
						this.play("stand_" + this.p.direction);
				}
			}
			if (this.p.y > 700) { //se ha caido del mapa
				Q.state.dec("lives", 1);
				if (Q.state.get("lives") == 0){
					this.destroy();
					Q.audio.stop();
					Q.audio.play('music_die.mp3',{ loop: false });
					Q.stageScene("endGame",1,{label: "You died!"});
				}
				else{
					level = "level" + Q.state.get("level");
					Q.clearStages();
					Q.stageScene(level);
					Q.stageScene("HUD",1);
				}
			}

			//Para el poder de estrella
			if(this.p.star_powered){
				this.p.star_time -=dt;
				if(this.p.star_time <= 0){
					this.p.star_powered = false;
					Q.audio.stop();
					Q.audio.play('music_main.mp3');
					if(this.p.fire)
						this.sheet("marioFireR", true);
					else if(this.p.big)
						this.sheet("marioLargeR", true);
					else
						this.sheet("marioR", true);
				}

			}
		},

		die: function(){;
			if(!this.p.immortal){
				if(this.p.fire){
					Q.audio.play('bullet_bill_shot.mp3',{ loop: false });
					this.sheet("marioLargeR", true);
					this.p.fire = false;
					this.p.immortal = true;
					this.p.immortal_time = 1;
				}
				else if(this.p.big){
					Q.audio.play('bullet_bill_shot.mp3',{ loop: false });
					this.sheet("marioR", true);
					this.p.big = false;
					this.p.immortal = true;
					this.p.immortal_time = 1;
				}
				else {
					this.p.dead = true;
					this.p.collisionMask = Q.SPRITE_NONE;
					this.p.vy = -300;
					this.play("die");
				}
		}
		},

		grow: function(){
			this.p.big = true;
			this.p.growing = true;
			this.sheet("grow_right", true);
			this.p.sprite = "growing";
			if (this.p.direction == "right")
				this.play("grow_right");
			else 
				this.play("grow_left");

		},

		end_grow: function(dt){
			this.p.growing = false;
			this.p.sprite = "mario_anim";
			if(!this.p.fire)
				this.sheet("marioLargeR", true);
			else
				this.sheet("marioFireR", true);
		},

		catch_fire: function(){
			this.p.big = true;
			this.p.fire = true;
			this.p.growing = true;
			this.sheet("grow_right", true);
			this.p.sprite = "growing";
			if (this.p.direction == "right")
				this.play("grow_right");
			else 
				this.play("grow_left");
		},

		shoot: function(){
			if(this.p.fire){
				if(this.p.direction == "right")
					this.stage.insert(new Q.Fireball({x:this.p.x + 30, y:this.p.y}));
				else
					this.stage.insert(new Q.Fireball({x:this.p.x - 30, y:this.p.y, vx:-300}));
			}
		},

		star_power: function(){
			this.p.star_powered = true;
			this.p.star_time = 10;
			if(this.p.big){
				this.sheet("marioLStarR", true);
			}
			else
				this.sheet("marioStarR", true);
		}
	});

	Q.Sprite.extend("Goomba", {
		init: function(p) {
			this._super(p, {
			sprite: "goomba_anim",
			sheet: "goomba",
			y: 380,
			vx: 50
		});
			this.add('2d, aiBounce, animation, defaultEnemy');
		},

		step: function(dt){
			this.play("run");
		},
	});

	Q.Sprite.extend("Bloopa", {
		init: function(p) {
			this._super(p, {
			sprite: "bloopa_anim",
			sheet: "bloopa",
			gravity:0.5,
			vy:0.1,
			y: 380
		});
			this.add("2d, animation, defaultEnemy");
			this.on("bump.bottom",this, "jump");
		},

		step: function(dt){
			if(this.p.vy < 0)
				this.play("go_up");
			else 
				this.play("go_down");
		},

		jump: function(dt){
				this.p.vy=-360;
		}

	});

	Q.Sprite.extend("Peach", {
		init: function(p) {
			this._super(p, {
			asset: "princess.png",
			y: 450,
			sensor: true,
			won: false
		});
			this.on("hit",this,"sensor");
		},

		sensor: function(collision){
			if(collision.obj.isA("Mario") && !this.won){
				this.won = true;
				Q.audio.stop();
				Q.audio.play('music_level_complete.mp3',{ loop: false });
				collision.obj.destroy(); this.destroy();
				Q.stageScene("endGame",1,{label: "LEVEL " + Q.state.get("level") + " WON!"});
				Q.state.inc("level", 1);
			}
		},
	});

	Q.Sprite.extend("Coin", {
		init: function(p) {
			this._super(p, {
			sprite: "coin_anim",
			sheet: "coin",
			caught: false,
			sensor: true,
			gravity: 0,
			y: 470
		});
			this.add("tween, animation");
			this.on("hit",this,"hit");
		},

		step: function(dt){
			this.play("shine");
		},

		hit: function(collision){
			if(collision.obj.isA("Mario")){
				if(!this.caught){		
				Q.audio.play('coin.mp3',{ loop: false });
					this.caught = true;
					Q.state.inc("coins",1);
					this.animate(
						{y: this.p.y-50}, 0.3, Q.Easing.Linear, 
						{ callback: function(){ this.destroy() } });
				}
			}
		},
	});

	Q.Sprite.extend("Mushroom", {
		init: function(p) {
			this._super(p, {
			asset: "mushroom.gif",
			sensor: true,
			vx: 90
		});
			this.add("2d, aiBounce");
			this.on("hit",this,"hit");
		},


		hit: function(collision){
			if(collision.obj.isA("Mario")){
				if(!collision.obj.p.big){
					Q.audio.play('bigness.mp3',{ loop: false });
					this.destroy();
					collision.obj.grow();
				}
				else{
					Q.audio.play('1up.mp3',{ loop: false });
					this.destroy();
					Q.state.inc("lives",1);
				}
			}
		}
	});

	Q.Sprite.extend("Fire_flower", {
		init: function(p) {
			this._super(p, {
			asset: "flower.gif",
			sensor: true
		});
			this.add("animation");
			this.on("hit",this,"hit");
		},

		hit: function(collision){
			if(collision.obj.isA("Mario")){
				if(!collision.obj.p.fire){
					collision.obj.catch_fire();
					Q.audio.play('item_rise_big.mp3',{ loop: false });
					this.destroy();
				}
				else{
					Q.audio.play('1up.mp3',{ loop: false });
					this.destroy();
					Q.state.inc("lives",1);
				}
			}
		}
	});

	Q.Sprite.extend("Fireball", {
		init: function(p) {
			this._super(p, {
			asset: "fireball.gif",
			exploding: false,
			vx: 300
		});
			Q.audio.play('fireball.mp3',{ loop: false });
			this.add("2d, animation");
			this.on("bump.bottom",this,"hit");
			this.on("exploded", this, "destroy");
		},

		step: function(dt){
			if(this.p.vx == 0 && !this.p.exploding)
				this.destroy();
			if(this.p.exploding)
				this.p.vx = 0;
		},

		hit: function(collision){
			Q.audio.play('fireball.mp3',{ loop: false });
			this.p.vy = -300;
			},

		explode: function(){
			this.p.exploding = true;
			this.p.sprite = "explosion_anim";
			this.sheet("explosion", true);
			this.play("explode");
		}
	});

	Q.Sprite.extend("QuestionBlockMushroom", {
		init: function(p){
			this._super(p, {
				asset: "question.gif",
				gravity: 0,
				open: false

			});
			this.add("2d");
			this.on("bump.bottom", this, "hit");
		},

		hit: function(collision){
			if (!this.p.open){
				Q.audio.play('item_rise_big.mp3', {loop: false});
				this.stage.insert(new Q.Mushroom({x: this.p.x, y: this.p.y-34}));
				this.p.asset = "block.gif";
				this.p.open = true;
			}
			else
				Q.audio.play('hit_head.mp3', {loop: false});
		}
	});

	Q.Sprite.extend("QuestionBlockFlower", {
		init: function(p){
			this._super(p, {
				asset: "question.gif",
				gravity: 0,
				open: false

			});
			this.add("2d");
			this.on("bump.bottom", this, "hit");
		},

		hit: function(collision){
			if (!this.p.open){
				Q.audio.play('item_rise_big.mp3', {loop: false});
				this.stage.insert(new Q.Fire_flower({x: this.p.x, y: this.p.y-34}));
				this.p.asset = "block.gif";
				this.p.open = true;
			}
			else
				Q.audio.play('hit_head.mp3', {loop: false});
		}
	});

	Q.Sprite.extend("QuestionBlockStar", {
		init: function(p){
			this._super(p, {
				asset: "question.gif",
				gravity: 0,
				open: false

			});
			this.add("2d");
			this.on("bump.bottom", this, "hit");
		},

		hit: function(collision){
			if (!this.p.open){
				Q.audio.play('item_rise_big.mp3', {loop: false});
				this.stage.insert(new Q.Star({x: this.p.x, y: this.p.y-34}));
				this.p.asset = "block.gif";
				this.p.open = true;
			}
			else
				Q.audio.play('hit_head.mp3', {loop: false});
		}
	});

	Q.Sprite.extend("Star", {
		init: function(p) {
			this._super(p, {
			asset: "star.gif",
			sensor: true,
			vx: 120
		});
			this.add("2d, animation");
			this.on("hit",this,"hit");
		},

		hit: function(collision){
			if(collision.obj.isA("Mario")){
				if(!collision.obj.p.starpowered){
					collision.obj.star_power();
					Q.audio.stop();
					Q.audio.play('music_starpower.mp3',{ loop: true });
					this.destroy();
				}
				else{
					Q.audio.play('1up.mp3',{ loop: false });
					this.destroy();
					Q.state.inc("lives",1);
				}
			}
		}
	});

	Q.component("defaultEnemy", {

		added: function() {
		///	this.entity.p.collisionMask = Q.SPRITE_ENEMY | Q.SPRITE_ACTIVE | Q.SPRITE_DEFAULT;
			//this.entity.p.type = Q.SPRITE_ENEMY;

			this.entity.on("dead",this.entity,"die");
			this.entity.on("bump.left,bump.right,bump.bottom",function(collision) {
				if(collision.obj.isA("Mario")) { 
					if(!collision.obj.p.star_powered)
						collision.obj.die();
					else{
						Q.audio.play('kill_enemy.mp3',{ loop: false });
						this.play("die", 1);}
					}
				else if (collision.obj.isA("Fireball")){
					collision.obj.explode();
					Q.audio.play('kill_enemy.mp3',{ loop: false });
					this.play("die", 1);
				}
			});

			this.entity.on("bump.top",function(collision) {
				if((collision.obj.isA("Mario") && !collision.obj.p.dead) || collision.obj.isA("Fireball")) {
					if (collision.obj.isA("Fireball"))
						collision.obj.explode();
					Q.audio.play('kill_enemy.mp3',{ loop: false });
					this.play("die", 1);
					if (!collision.obj.isA("Fireball")) //para que no rebote la explosion
						collision.obj.p.vy = -400;
				}
			});
		},

		extend: {
			die: function(p) {
				this.destroy();
			}
		}
	});

	Q.animations("mario_anim", {
		run_right: { frames: [1,2,3], rate: 1/5},
		run_left: { frames: [14,15,16], rate: 1/5 },
		jump_right: { frames: [3], loop: false},
		jump_left: { frames: [17], loop: false},
		stand_right: { frames: [0], loop: false },
		stand_left: { frames: [14], loop: false },
		die: {frames: [12], loop: false }
	});

	Q.animations("growing", {
		grow_right: {frames: [0,1,2], loop: false, rate: 1/5, trigger: "grown" },
		grow_left: {frames: [3,4,5], loop: false, rate: 1/2, trigger: "grown"}
	});

	Q.animations("goomba_anim", {
		run: { frames: [0, 1], rate: 1/5 },
		die: { frames: [2], rate: 1/5, loop: false, trigger: "dead" },
	});

	Q.animations("bloopa_anim", {
		go_up: { frames: [0], rate: 1/5},
		go_down: { frames: [1], rate: 1/5 },
		die: { frames: [2], rate: 1/2, loop: false, trigger: "dead" }
	});

	Q.animations("coin_anim", {
		shine: {frames: [0,1,2], rate: 1/3}
	});

	Q.animations("explosion_anim", {
		explode: {frames: [0,1,2], rate: 1/9, loop: false, trigger: "exploded"}
	});


	Q.load(["mario_small.png", "mario_small.json", "goomba.png", "goomba.json",
		"bloopa.png", "bloopa.json", "princess.png", "mainTitle.png",
		"coin.png", "coin.json", "music_main.mp3", "coin.mp3",
		"music_die.mp3", "music_level_complete.mp3", "kill_enemy.mp3",
		"mario_large.gif", "mario_large.json", "mushroom.gif","bigness.mp3",
		"1up.mp3", "bullet_bill_shot.mp3", "music_water.mp3", "hit_head.mp3","item_rise_big.mp3", 
		"flower.gif", "mario_flower_power.gif", "mario_flower_power.json",
		"fireball.mp3", "fireball.gif", "explosion.gif", "explosion.json",
		"grow.gif", "grow.json", "block.gif", "question.gif", "star.gif",
		"music_starpower.mp3", "music_starpower.ogg", "star_power_small.gif",
		"star_power_large.gif", "star_power_small.json", "star_power_large.json"], function() {

		Q.compileSheets("mario_small.png","mario_small.json");
		Q.compileSheets("goomba.png","goomba.json");
		Q.compileSheets("bloopa.png","bloopa.json");
		Q.compileSheets("coin.png","coin.json");
		Q.compileSheets("mario_large.gif","mario_large.json");
		Q.compileSheets("mario_flower_power.gif","mario_flower_power.json");
		Q.compileSheets("grow.gif","grow.json");
		Q.compileSheets("explosion.gif", "explosion.json");
		Q.compileSheets("star_power_small.gif", "star_power_small.json");
		Q.compileSheets("star_power_large.gif", "star_power_large.json");
	});
});