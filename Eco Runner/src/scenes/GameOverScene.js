class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
    this.seedsCollected = data.seeds || 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Fundo sombrio de fumaça e poluição
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a090d, 0x1a090d, 0x2b1e16, 0x081c15, 1);
    bg.fillRect(0, 0, width, height);

    // Título de Derrota
    this.add.text(width / 2, 140, 'A FLORESTA SILENCIOU', {
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: '44px',
      fontStyle: 'bold',
      fill: '#e63946',
      stroke: '#000',
      strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(width / 2, 200, 'A poluição da Gears of Smog superou o Guardião...', {
      fontFamily: 'Georgia, serif',
      fontSize: '18px',
      fontStyle: 'italic',
      fill: '#f8f9fa'
    }).setOrigin(0.5);

    // Caixa de Estatísticas
    const statsBox = this.add.rectangle(width / 2, 300, 440, 120, 0x0b1310, 0.9);
    statsBox.setStrokeStyle(2, 0x6c757d);

    this.add.text(width / 2, 280, `Pontuação Final: ${this.finalScore}`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '22px',
      fontStyle: 'bold',
      fill: '#ffd166'
    }).setOrigin(0.5);

    this.add.text(width / 2, 320, `Sementes Resgatadas: ${this.seedsCollected} / 10`, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fill: '#adb5bd'
    }).setOrigin(0.5);

    // Botões
    this.createButton(width / 2, 420, 'TENTAR NOVAMENTE', 0x2d6a4f, 0x40916c, () => {
      window.soundFX.startBGM();
      this.scene.start('GameScene');
    });

    this.createButton(width / 2, 490, 'MENU PRINCIPAL', 0x212529, 0x343a40, () => {
      this.scene.start('MenuScene');
    });
  }

  createButton(x, y, text, colorNorm, colorHover, callback) {
    const btn = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 260, 48, colorNorm, 1).setStrokeStyle(2, 0xffffff);
    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setOrigin(0.5);

    btn.add([bg, label]);
    btn.setSize(260, 48);
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

window.GameOverScene = GameOverScene;
