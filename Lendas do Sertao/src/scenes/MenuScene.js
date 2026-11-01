// Tela inicial.
class MenuScene extends Phaser.Scene {
  constructor() { super('MenuScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#16324f');
    this.cameras.main.fadeIn(300);
    Sfx.startMusic('menu');

    // fundo decorativo
    for (let i = 0; i < 40; i++) {
      const s = this.add.circle(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 300), Phaser.Math.Between(1, 2), 0xffffff, 0.8);
      this.tweens.add({ targets: s, alpha: 0.2, duration: Phaser.Math.Between(600, 1600), yoyo: true, repeat: -1 });
    }
    this.add.rectangle(400, 560, 800, 140, 0x2e7d32);

    this.add.text(400, 90, 'LENDAS DO SERTÃO', {
      font: 'bold 52px monospace', color: '#ffd23f', stroke: '#7a3b00', strokeThickness: 8
    }).setOrigin(0.5);
    this.add.text(400, 145, 'Capture, treine e enfrente a Cuca', {
      font: '20px monospace', color: '#ffffff'
    }).setOrigin(0.5);

    const ids = ['boitata', 'saci', 'cuca', 'iara', 'curupira'];
    ids.forEach((id, i) => {
      const spr = this.add.image(110 + i * 145, 400, 'cr_' + id).setScale(1.3);
      this.tweens.add({ targets: spr, y: spr.y - 14, duration: 700 + i * 90, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });

    const start = this.add.text(400, 260, 'Pressione ENTER ou clique para jogar', {
      font: '24px monospace', color: '#ffffff', backgroundColor: '#00000066', padding: { x: 14, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.tweens.add({ targets: start, alpha: 0.4, duration: 700, yoyo: true, repeat: -1 });

    this.add.text(400, 548, 'Setas/WASD: mover   |   ENTER: confirmar   |   M: som', {
      font: '16px monospace', color: '#ffffff'
    }).setOrigin(0.5);
    this.add.text(400, 576, 'Feito com Phaser 3  •  Jogos Digitais', {
      font: '13px monospace', color: '#c8e6c9'
    }).setOrigin(0.5);

    const go = () => {
      Sfx.init();
      Sfx.play('select');
      this.scene.start('StarterScene');
    };
    start.on('pointerdown', go);
    this.input.keyboard.once('keydown-ENTER', go);
    this.input.keyboard.once('keydown-SPACE', go);
  }
}
