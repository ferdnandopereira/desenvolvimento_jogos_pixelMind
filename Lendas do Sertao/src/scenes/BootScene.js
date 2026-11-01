// Gera as texturas e inicia o menu.
class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }

  create() {
    this.add.text(400, 300, 'Carregando...', { font: '24px monospace', color: '#ffffff' }).setOrigin(0.5);
    generateTextures(this);
    this.scene.start('MenuScene');
  }
}
