class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.seedsCollected = data.seeds || 0;
    this.totalSeeds = data.totalSeeds || 10;
    this.fountains = data.fountains || 0;
    this.timeSpent = data.time || 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Fundo esmeralda brilhante de vitória
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x081c15, 0x1b4332, 0x2d6a4f, 0x52b788, 1);
    bg.fillRect(0, 0, width, height);

    // Efeito de chuva de confetes/folhas
    for (let i = 0; i < 35; i++) {
      const leaf = this.add.image(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(-50, height),
        'particle_leaf'
      ).setScale(Phaser.Math.FloatBetween(1.2, 2.4));

      this.tweens.add({
        targets: leaf,
        y: height + 50,
        x: leaf.x + Phaser.Math.Between(-100, 100),
        angle: 720,
        duration: Phaser.Math.Between(3000, 6000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 2500)
      });
    }

    // Título de Vitória
    const title = this.add.text(width / 2, 110, 'SANTUÁRIO RESTAURADO!', {
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: '46px',
      fontStyle: 'bold',
      fill: '#ffd166',
      stroke: '#081c15',
      strokeThickness: 8,
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 6, fill: true }
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scale: 1.05,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    this.add.text(width / 2, 165, 'As sementes purificaram as raízes do Grande Carvalho!', {
      fontFamily: 'Georgia, serif',
      fontSize: '19px',
      fontStyle: 'italic',
      fill: '#d8f3dc'
    }).setOrigin(0.5);

    // Cartão de Resumo de Desempenho
    const card = this.add.rectangle(width / 2, 300, 520, 190, 0x081c15, 0.9);
    card.setStrokeStyle(3, 0x74c69d);

    const minutes = Math.floor(this.timeSpent / 60);
    const seconds = this.timeSpent % 60;
    const timeFormatted = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

    this.add.text(width / 2, 235, `🏆 PONTUAÇÃO TOTAL: ${this.finalScore} PTS`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#52b788'
    }).setOrigin(0.5);

    this.add.text(width / 2, 280, `🌱 Sementes Coletadas: ${this.seedsCollected} / ${this.totalSeeds}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fill: '#d8f3dc'
    }).setOrigin(0.5);

    this.add.text(width / 2, 315, `💧 Fontes Sagradas Purificadas: ${this.fountains} / 2`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fill: '#d8f3dc'
    }).setOrigin(0.5);

    this.add.text(width / 2, 350, `⏱️ Tempo de Expedição: ${timeFormatted}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fill: '#d8f3dc'
    }).setOrigin(0.5);

    // Botão de Jogar Novamente
    this.createButton(width / 2, 440, 'JOGAR NOVAMENTE', 0x2d6a4f, 0x40916c, () => {
      window.soundFX.startBGM();
      this.scene.start('GameScene');
    });

    this.createButton(width / 2, 505, 'MENU PRINCIPAL', 0x1b4332, 0x2d6a4f, () => {
      this.scene.start('MenuScene');
    });
  }

  createButton(x, y, text, colorNorm, colorHover, callback) {
    const btn = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 260, 46, colorNorm, 1).setStrokeStyle(2, 0x95d5b2);
    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setOrigin(0.5);

    btn.add([bg, label]);
    btn.setSize(260, 46);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      bg.setFillStyle(colorHover);
      btn.setScale(1.04);
    });
    btn.on('pointerout', () => {
      bg.setFillStyle(colorNorm);
      btn.setScale(1.0);
    });
    btn.on('pointerdown', () => {
      if (callback) callback();
    });

    return btn;
  }
}

window.VictoryScene = VictoryScene;
