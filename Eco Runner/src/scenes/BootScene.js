class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Tela de carregamento rápida
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const loadingText = this.add.text(width / 2, height / 2 - 20, 'Carregando o Santuário da Floresta...', {
      fontFamily: 'Courier New, monospace',
      fontSize: '20px',
      fill: '#52b788'
    }).setOrigin(0.5);

    const barBg = this.add.rectangle(width / 2, height / 2 + 30, 320, 20, 0x1b4332);
    const bar = this.add.rectangle(width / 2 - 156, height / 2 + 30, 0, 14, 0x74c69d).setOrigin(0, 0.5);

    this.tweens.add({
      targets: bar,
      width: 312,
      duration: 500,
      ease: 'Power2',
      onComplete: () => {
        // Gerar todas as texturas procedurais
        window.TextureGenerator.generateAll(this);
        this.scene.start('MenuScene');
      }
    });
  }
}

window.BootScene = BootScene;
