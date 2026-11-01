// Escolha do parceiro inicial.
class StarterScene extends Phaser.Scene {
  constructor() { super('StarterScene'); }

  create() {
    this.cameras.main.setBackgroundColor('#1b2a3a');
    this.cameras.main.fadeIn(250);
    this.add.text(400, 50, 'Escolha seu parceiro de jornada', {
      font: '28px monospace', color: '#ffd23f'
    }).setOrigin(0.5);

    this.ids = ['boitata', 'curupira', 'iara'];
    this.sel = 0;
    this.cards = [];

    this.ids.forEach((id, i) => {
      const x = 160 + i * 240;
      const c = CREATURES[id];
      const box = this.add.rectangle(x, 300, 210, 340, 0x24384d)
        .setStrokeStyle(4, 0x3d5a78)
        .setInteractive({ useHandCursor: true });
      const spr = this.add.image(x, 195, 'cr_' + id).setScale(1.2);
      this.add.text(x, 275, c.nome, { font: '22px monospace', color: '#ffffff' }).setOrigin(0.5);
      this.add.text(x, 303, 'Tipo: ' + TYPES[c.tipo].nome, { font: '16px monospace', color: TYPES[c.tipo].cor }).setOrigin(0.5);
      this.add.text(x, 335, c.desc, {
        font: '13px monospace', color: '#cfd8dc', align: 'center', wordWrap: { width: 185 }
      }).setOrigin(0.5, 0);
      box.on('pointerover', () => { this.sel = i; this.refresh(); });
      box.on('pointerdown', () => { this.sel = i; this.confirm(); });
      this.cards.push({ box, spr });
    });

    this.add.text(400, 555, 'Use ← → e ENTER (ou clique) para escolher', {
      font: '16px monospace', color: '#ffffff'
    }).setOrigin(0.5);

    this.input.keyboard.on('keydown', e => {
      if (e.code === 'ArrowLeft') { this.sel = Math.max(0, this.sel - 1); this.refresh(); }
      else if (e.code === 'ArrowRight') { this.sel = Math.min(2, this.sel + 1); this.refresh(); }
      else if (e.code === 'Enter' || e.code === 'Space') this.confirm();
      else if (e.code === 'Digit1') { this.sel = 0; this.confirm(); }
      else if (e.code === 'Digit2') { this.sel = 1; this.confirm(); }
      else if (e.code === 'Digit3') { this.sel = 2; this.confirm(); }
    });
    this.refresh();
  }

  refresh() {
    this.cards.forEach((c, i) => {
      c.box.setStrokeStyle(4, i === this.sel ? 0xffd23f : 0x3d5a78);
      c.spr.setScale(i === this.sel ? 1.4 : 1.2);
    });
  }

  confirm() {
    if (this.done) return;
    this.done = true;
    Sfx.play('select');
    GameState.reset(this.ids[this.sel]);
    this.cameras.main.fadeOut(300);
    this.time.delayedCall(320, () => this.scene.start('WorldScene'));
  }
}
