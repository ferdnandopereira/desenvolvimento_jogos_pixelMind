class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  init() {
    this.score = 0;
    this.lives = 3;
    this.seedsCollected = 0;
    this.totalSeeds = 10;
    this.fountainsPurified = 0;
    this.totalFountains = 2;
    this.isInvulnerable = false;
    this.jumpCount = 0;
    this.checkpoint = { x: 80, y: 450 };
    this.startTime = Date.now();
  }

  create() {
    const worldWidth = 3400;
    const worldHeight = 600;

    // Configurar limites do mundo e física
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

    // 1. Cenário de Fundo (Parallax)
    this.createParallaxBackground(worldWidth, worldHeight);

    // 2. Grupos de Física
    this.platforms = this.physics.add.staticGroup();
    this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
    this.hazards = this.physics.add.staticGroup();
    this.seeds = this.physics.add.group();
    this.altars = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group();

    // 3. Construção da Fase (Level Design)
    this.buildLevel();

    // 4. Jogador (Kael - O Guardião)
    this.createPlayer();

    // 5. Inimigos
    this.spawnEnemies();

    // 6. Colisões e Interações
    this.setupCollisions();

    // 7. Câmera
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    // 8. Controles de Teclado
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      W: Phaser.Input.Keyboard.KeyCodes.W,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE
    });

    // 9. Interface (HUD) Fixa na Tela
    this.createHUD();

    // 10. Tutorial Popup Inicial
    this.showGlideHint();
  }

  createParallaxBackground(w, h) {
    // Gradiente de céu
    const bgGraphics = this.add.graphics().setScrollFactor(0);
    bgGraphics.fillGradientStyle(0x0a2f1d, 0x0a2f1d, 0x1f5436, 0x2d6a4f, 1);
    bgGraphics.fillRect(0, 0, 800, 600);

    // Montanhas distantes (scroll 0.1)
    const mountains = this.add.graphics().setScrollFactor(0.1);
    mountains.fillStyle(0x081c15, 0.6);
    for (let x = 0; x < w * 1.2; x += 180) {
      mountains.beginPath();
      mountains.moveTo(x, 480);
      mountains.lineTo(x + 90, 260 + (x % 70));
      mountains.lineTo(x + 180, 480);
      mountains.closePath();
      mountains.fill();
    }

    // Árvores ancestrais médias (scroll 0.3)
    const midTrees = this.add.graphics().setScrollFactor(0.3);
    midTrees.fillStyle(0x133c2a, 0.7);
    for (let x = 50; x < w * 1.2; x += 140) {
      midTrees.fillRect(x + 20, 320, 16, 200);
      midTrees.beginPath();
      midTrees.arc(x + 28, 300, 40, 0, Math.PI * 2);
      midTrees.fill();
    }
  }

  buildLevel() {
    // Método auxiliar para criar trechos de chão
    const makeGround = (startX, endX, y) => {
      for (let x = startX; x < endX; x += 32) {
        this.platforms.create(x, y, 'tile_ground').setOrigin(0, 0).refreshBody();
      }
    };

    // Chão inicial da clareira
    makeGround(0, 520, 540);

    // Altar 1 (Fonte de Seiva)
    const altar1 = this.altars.create(440, 492, 'fountain_altar').setOrigin(0.5, 0.5);
    altar1.purified = false;
    altar1.id = 1;

    // Resíduo tóxico no chão (poço inicial)
    this.hazards.create(560, 546, 'hazard_toxic').setOrigin(0.5, 0.5).refreshBody();
    this.hazards.create(600, 546, 'hazard_toxic').setOrigin(0.5, 0.5).refreshBody();

    // Plataformas flutuantes sobre o poço
    this.platforms.create(580, 440, 'platform_moss').refreshBody();
    this.platforms.create(750, 380, 'platform_moss').refreshBody();

    // Chão intermediário 1
    makeGround(880, 1250, 540);

    // Plataforma Móvel 1 (vai e volta horizontalmente sobre o abismo)
    const movePlat1 = this.movingPlatforms.create(1350, 420, 'platform_crystal');
    this.tweens.add({
      targets: movePlat1,
      x: 1600,
      duration: 3200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Plataforma alta para atalho
    this.platforms.create(1150, 320, 'platform_moss').refreshBody();
    this.platforms.create(1450, 240, 'platform_moss').refreshBody();

    // Chão do Santuário 2
    makeGround(1700, 2200, 540);

    // Altar 2 (Fonte de Seiva)
    const altar2 = this.altars.create(1950, 492, 'fountain_altar').setOrigin(0.5, 0.5);
    altar2.purified = false;
    altar2.id = 2;

    // Grande Abismo / Desfiladeiro de Vento (exige mecânica de Planar!)
    // O jogador pula de uma plataforma elevada em 2200 e plana até 2550
    this.platforms.create(2180, 360, 'platform_moss').refreshBody();
    this.platforms.create(2360, 260, 'platform_moss').refreshBody(); // Alta para impulso

    // Plataforma Móvel Vertical
    const movePlat2 = this.movingPlatforms.create(2520, 480, 'platform_crystal');
    this.tweens.add({
      targets: movePlat2,
      y: 300,
      duration: 2500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Chão Final do Carvalho Sagrado
    makeGround(2650, 3400, 540);

    // Obstáculos de espinhos tóxicos na reta final
    this.hazards.create(2850, 508, 'hazard_toxic').refreshBody();
    this.hazards.create(3020, 508, 'hazard_toxic').refreshBody();

    this.platforms.create(2850, 410, 'platform_moss').refreshBody();
    this.platforms.create(3020, 380, 'platform_moss').refreshBody();

    // Portal do Grande Carvalho Ancestral (Vitória)
    this.portal = this.physics.add.staticSprite(3280, 460, 'portal_oak');
    this.portal.setSize(40, 60);

    // Distribuir as 10 Sementes Ancestrais
    const seedPositions = [
      { x: 220, y: 490 },
      { x: 440, y: 380 },
      { x: 580, y: 390 },
      { x: 750, y: 330 },
      { x: 1020, y: 490 },
      { x: 1450, y: 190 },
      { x: 1800, y: 490 },
      { x: 2360, y: 210 },
      { x: 2520, y: 240 },
      { x: 3020, y: 330 }
    ];

    seedPositions.forEach(pos => {
      const seed = this.seeds.create(pos.x, pos.y, 'seed_item');
      seed.body.setAllowGravity(false);
      // Animação de flutuação e rotação sutil
      this.tweens.add({
        targets: seed,
        y: pos.y - 10,
        duration: 1200 + Phaser.Math.Between(0, 400),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(this.checkpoint.x, this.checkpoint.y, 'player_idle');
    this.player.setCollideWorldBounds(true);
    this.player.setSize(20, 32);
    this.player.setOffset(6, 4);

    // Partículas de folhas ao correr/planar
    this.leafEmitter = this.add.particles(0, 0, 'particle_leaf', {
      speed: { min: 20, max: 60 },
      angle: { min: 140, max: 220 },
      scale: { start: 1.2, end: 0.2 },
      alpha: { start: 0.8, end: 0 },
      lifespan: 500,
      gravityY: 100,
      emitting: false
    });
  }

  spawnEnemies() {
    // Inimigos do tipo Robô Smog (terrestres)
    const smogPatrols = [
      { x: 950, y: 500, minX: 900, maxX: 1120 },
      { x: 2020, y: 500, minX: 1900, maxX: 2150 },
      { x: 2720, y: 500, minX: 2680, maxX: 2820 }
    ];

    smogPatrols.forEach(cfg => {
      const bot = this.enemies.create(cfg.x, cfg.y, 'enemy_smog');
      bot.setCollideWorldBounds(true);
      bot.setVelocityX(60);
      bot.minX = cfg.minX;
      bot.maxX = cfg.maxX;
      bot.enemyType = 'smog';
      bot.body.setSize(28, 28);
    });

    // Inimigos do tipo Drone Cortador (aéreos)
    const dronePatrols = [
      { x: 750, y: 260, minX: 680, maxX: 820 },
      { x: 1550, y: 340, minX: 1400, maxX: 1700 },
      { x: 2420, y: 340, minX: 2320, maxX: 2520 },
      { x: 2950, y: 300, minX: 2880, maxX: 3050 }
    ];

    dronePatrols.forEach(cfg => {
      const drone = this.enemies.create(cfg.x, cfg.y, 'enemy_drone');
      drone.body.setAllowGravity(false);
      drone.setVelocityX(80);
      drone.minX = cfg.minX;
      drone.maxX = cfg.maxX;
      drone.enemyType = 'drone';
      drone.body.setSize(26, 22);

      // Movimento oscilatório vertical suave no drone
      this.tweens.add({
        targets: drone,
        y: cfg.y + 16,
        duration: 1000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    });
  }

  setupCollisions() {
    // Player e plataformas
    this.physics.add.collider(this.player, this.platforms, () => {
      this.jumpCount = 0;
    });

    this.physics.add.collider(this.player, this.movingPlatforms, () => {
      this.jumpCount = 0;
    });

    // Inimigos e plataformas
    this.physics.add.collider(this.enemies, this.platforms);

    // Coleta de Sementes
    this.physics.add.overlap(this.player, this.seeds, (player, seed) => {
      this.collectSeed(seed);
    });

    // Purificação de Fontes (Altars)
    this.physics.add.overlap(this.player, this.altars, (player, altar) => {
      this.purifyAltar(altar);
    });

    // Colisão com Inimigos (Pular na cabeça mata, toque lateral dá dano)
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      this.handleEnemyInteraction(enemy);
    });

    // Colisão com Resíduos Tóxicos
    this.physics.add.overlap(this.player, this.hazards, () => {
      this.takeDamage('toxic');
    });

    // Portal Final
    this.physics.add.overlap(this.player, this.portal, () => {
      this.completeLevel();
    });
  }

  createHUD() {
    const hudBg = this.add.graphics().setScrollFactor(0);
    hudBg.fillStyle(0x081c15, 0.85);
    hudBg.fillRoundedRect(12, 12, 776, 52, 10);
    hudBg.lineStyle(2, 0x52b788, 1);
    hudBg.strokeRoundedRect(12, 12, 776, 52, 10);

    // Corações de Vida
    this.hearts = [];
    for (let i = 0; i < 3; i++) {
      const h = this.add.image(40 + i * 26, 38, 'ui_heart').setScrollFactor(0);
      this.hearts.push(h);
    }

    // Contador de Sementes
    this.add.image(150, 38, 'seed_item').setScale(1.1).setScrollFactor(0);
    this.seedText = this.add.text(170, 27, `0 / ${this.totalSeeds}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#ffd166'
    }).setScrollFactor(0);

    // Fontes Purificadas
    this.add.image(280, 38, 'fountain_altar').setScale(0.6).setScrollFactor(0);
    this.fountainText = this.add.text(305, 27, `Fontes: 0 / ${this.totalFountains}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      fill: '#95d5b2'
    }).setScrollFactor(0);

    // Pontuação
    this.scoreText = this.add.text(480, 27, 'Pontos: 0', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setScrollFactor(0);

    // Botão de Áudio (Mute / Unmute)
    const soundBtn = this.add.text(710, 27, '🔊 Som', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      fill: '#74c69d',
      backgroundColor: '#1b4332',
      padding: { x: 8, y: 4 }
    }).setScrollFactor(0).setInteractive({ useHandCursor: true });

    soundBtn.on('pointerdown', () => {
      const isMuted = window.soundFX.toggleMute();
      soundBtn.setText(isMuted ? '🔇 Mudo' : '🔊 Som');
    });
  }

  showGlideHint() {
    const hint = this.add.text(400, 95, '🍃 Dica: Segure [CIMA] ou [W] ao cair no ar para PLANAR!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      fill: '#d8f3dc',
      backgroundColor: 'rgba(27, 67, 50, 0.9)',
      padding: { x: 12, y: 6 }
    }).setOrigin(0.5).setScrollFactor(0);

    this.time.delayedCall(6000, () => {
      this.tweens.add({
        targets: hint,
        alpha: 0,
        duration: 800,
        onComplete: () => hint.destroy()
      });
    });
  }

  update() {
    if (!this.player || !this.player.body) return;

    // Checar queda no abismo
    if (this.player.y > 580) {
      this.takeDamage('void');
      return;
    }

    // Patrulha dos inimigos (inverter direção nos limites)
    this.enemies.getChildren().forEach(enemy => {
      if (enemy.x <= enemy.minX) {
        enemy.setVelocityX(Math.abs(enemy.body.velocity.x) || 70);
        enemy.setFlipX(false);
      } else if (enemy.x >= enemy.maxX) {
        enemy.setVelocityX(-Math.abs(enemy.body.velocity.x) || -70);
        enemy.setFlipX(true);
      }
    });

    // Movimentação Horizontal
    const isLeft = this.cursors.left.isDown || this.keys.A.isDown;
    const isRight = this.cursors.right.isDown || this.keys.D.isDown;
    const isJumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) || 
                          Phaser.Input.Keyboard.JustDown(this.keys.W) || 
                          Phaser.Input.Keyboard.JustDown(this.keys.SPACE);
    const isJumpHeld = this.cursors.up.isDown || this.keys.W.isDown || this.keys.SPACE.isDown;

    const onFloor = this.player.body.touching.down || this.player.body.blocked.down;

    if (isLeft) {
      this.player.setVelocityX(-220);
      this.player.setFlipX(true);
      if (onFloor) {
        this.player.setTexture(this.time.now % 300 < 150 ? 'player_run1' : 'player_run2');
        this.leafEmitter.emitParticleAt(this.player.x + 8, this.player.y + 14);
      }
    } else if (isRight) {
      this.player.setVelocityX(220);
      this.player.setFlipX(false);
      if (onFloor) {
        this.player.setTexture(this.time.now % 300 < 150 ? 'player_run1' : 'player_run2');
        this.leafEmitter.emitParticleAt(this.player.x - 8, this.player.y + 14);
      }
    } else {
      this.player.setVelocityX(0);
      if (onFloor) {
        this.player.setTexture('player_idle');
      }
    }

    // Pulo e Pulo Duplo
    if (isJumpPressed) {
      if (onFloor) {
        this.player.setVelocityY(-440);
        this.jumpCount = 1;
        window.soundFX.playJump();
      } else if (this.jumpCount === 1) {
        this.player.setVelocityY(-390);
        this.jumpCount = 2;
        window.soundFX.playDoubleJump();
        // Efeito de brilho no pulo duplo
        for (let i = 0; i < 6; i++) {
          this.leafEmitter.emitParticleAt(this.player.x, this.player.y + 10);
        }
      }
    }

    // MECÂNICA DE PLANAR (GLIDE)
    // Se o jogador estiver caindo (velocity.y > 0) e segurar o botão de pulo:
    if (!onFloor && this.player.body.velocity.y > 0 && isJumpHeld) {
      // Limita a velocidade de queda a 80 px/s (queda suave)
      this.player.setVelocityY(80);
      this.player.setTexture('player_glide');
      this.leafEmitter.emitParticleAt(this.player.x + Phaser.Math.Between(-10, 10), this.player.y + 8);
      if (this.time.now % 250 < 30) {
        window.soundFX.playGlide();
      }
    } else if (!onFloor && this.player.body.velocity.y < 0) {
      this.player.setTexture('player_idle');
    }
  }

  collectSeed(seed) {
    seed.disableBody(true, true);
    this.seedsCollected++;
    this.score += 150;
    this.seedText.setText(`${this.seedsCollected} / ${this.totalSeeds}`);
    this.scoreText.setText(`Pontos: ${this.score}`);

    window.soundFX.playSeedCollect();

    // Feedback visual (efeito de pontuação flutuante)
    const floatText = this.add.text(seed.x, seed.y - 10, '+150 Semente', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#ffd166'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: floatText,
      y: seed.y - 45,
      alpha: 0,
      duration: 700,
      onComplete: () => floatText.destroy()
    });
  }

  purifyAltar(altar) {
    if (altar.purified) return;
    altar.purified = true;
    this.fountainsPurified++;
    this.score += 500;
    this.fountainText.setText(`Fontes: ${this.fountainsPurified} / ${this.totalFountains}`);
    this.scoreText.setText(`Pontos: ${this.score}`);

    // Atualiza checkpoint para este altar
    this.checkpoint = { x: altar.x, y: altar.y - 30 };

    window.soundFX.playPurify();

    // Brilho esmeralda na fonte
    const halo = this.add.graphics();
    halo.fillStyle(0x52b788, 0.4);
    halo.fillCircle(altar.x, altar.y, 45);

    this.tweens.add({
      targets: halo,
      scaleX: 1.6,
      scaleY: 1.6,
      alpha: 0,
      duration: 1000,
      onComplete: () => halo.destroy()
    });

    const msg = this.add.text(altar.x, altar.y - 50, '✨ FONTE PURIFICADA! (Checkpoint Salvo)', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fontStyle: 'bold',
      fill: '#74c69d',
      backgroundColor: '#081c15',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5);

    this.tweens.add({
      targets: msg,
      y: altar.y - 85,
      alpha: 0,
      duration: 1500,
      onComplete: () => msg.destroy()
    });
  }

  handleEnemyInteraction(enemy) {
    // Se o jogador estiver caindo e acima do inimigo -> derrota o inimigo!
    if (this.player.body.velocity.y > 0 && this.player.y < enemy.y - 12) {
      enemy.disableBody(true, true);
      this.player.setVelocityY(-320); // Impulso para cima
      this.score += 200;
      this.scoreText.setText(`Pontos: ${this.score}`);
      window.soundFX.playEnemyDefeat();

      const killMsg = this.add.text(enemy.x, enemy.y, '+200 Desarmado!', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        fontStyle: 'bold',
        fill: '#74c69d'
      }).setOrigin(0.5);

      this.tweens.add({
        targets: killMsg,
        y: enemy.y - 40,
        alpha: 0,
        duration: 800,
        onComplete: () => killMsg.destroy()
      });
    } else {
      this.takeDamage('enemy');
    }
  }

  takeDamage(source) {
    if (this.isInvulnerable) return;

    this.lives--;
    window.soundFX.playHit();

    // Atualiza corações no HUD
    if (this.hearts[this.lives]) {
      this.hearts[this.lives].setAlpha(0.2);
    }

    // Se perdeu todas as vidas -> Game Over
    if (this.lives <= 0) {
      window.soundFX.stopBGM();
      this.scene.start('GameOverScene', { score: this.score, seeds: this.seedsCollected });
      return;
    }

    // Se caiu no abismo, reposiciona no último checkpoint
    if (source === 'void') {
      this.player.setPosition(this.checkpoint.x, this.checkpoint.y);
      this.player.setVelocity(0, 0);
    } else {
      // Knockback
      this.player.setVelocityY(-200);
      this.player.setVelocityX(this.player.flipX ? 180 : -180);
    }

    // Período de invulnerabilidade com piscar
    this.isInvulnerable = true;
    this.tweens.add({
      targets: this.player,
      alpha: 0.3,
      duration: 120,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        this.player.setAlpha(1);
        this.isInvulnerable = false;
      }
    });
  }

  completeLevel() {
    window.soundFX.stopBGM();
    window.soundFX.playVictory();

    const timeSpent = Math.floor((Date.now() - this.startTime) / 1000);
    const bonusSeeds = (this.seedsCollected === this.totalSeeds) ? 1000 : 0;
    const finalScore = this.score + bonusSeeds;

    this.scene.start('VictoryScene', {
      score: finalScore,
      seeds: this.seedsCollected,
      totalSeeds: this.totalSeeds,
      fountains: this.fountainsPurified,
      time: timeSpent
    });
  }
}

window.GameScene = GameScene;
