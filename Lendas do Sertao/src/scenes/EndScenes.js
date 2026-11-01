// Telas finais: derrota (recomeça na fogueira) e vitória.
class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOverScene'); }

  create() {
    Sfx.stopMusic();
    this.cameras.main.setBackgroundColor('#1a0d1f');
    this.cameras.main.fadeIn(400);
    this.add.text(400, 200, 'Sua equipe desmaiou...', { font: 'bold 40px monospace', color: '#ff6b6b' }).setOrigin(0.5);
    this.add.text(400, 270, 'Mas toda lenda merece uma segunda chance.', { font: '20px monospace', color: '#ffffff' }).setOrigin(0.5);
    const t = this.add.text(400, 360, 'ENTER ou clique: voltar à fogueira', {
      font: '22px monospace', color: '#ffd23f', backgroundColor: '#00000066', padding: { x: 12, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.tweens.add({ targets: t, alpha: 0.4, duration: 700, yoyo: true, repeat: -1 });

    const go = () => {
      if (this.done) return;
      this.done = true;
      Sfx.play('select');
      healTeam();
      GameState.pos = { ...START_POS };
      this.scene.start('WorldScene');
    };
    t.on('pointerdown', go);
    this.input.keyboard.once('keydown-ENTER', go);
    this.input.keyboard.once('keydown-SPACE', go);
  }
}

class VictoryScene extends Phaser.Scene {
  constructor() { super('VictoryScene'); }

  create() {
    Sfx.startMusic('victory');
    this.cameras.main.setBackgroundColor('#16324f');
    this.cameras.main.fadeIn(500);
    for (let i = 0; i < 60; i++) {
      const s = this.add.circle(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), Phaser.Math.Between(1, 3), 0xffd23f, 0.9);
      this.tweens.add({ targets: s, y: s.y + 40, alpha: 0.1, duration: Phaser.Math.Between(900, 2000), yoyo: true, repeat: -1 });
    }
    this.add.text(400, 90, 'VITÓRIA!', { font: 'bold 60px monospace', color: '#ffd23f', stroke: '#7a3b00', strokeThickness: 8 }).setOrigin(0.5);
    this.add.text(400, 160, 'A Cuca foi derrotada e o sertão está em paz.', { font: '20px monospace', color: '#ffffff' }).setOrigin(0.5);

    const team = GameState.team;
    const startX = 400 - (team.length - 1) * 70;
    team.forEach((c, i) => {
      const spr = this.add.image(startX + i * 140, 320, 'cr_' + c.id).setScale(1);
      this.tweens.add({ targets: spr, y: spr.y - 16, duration: 600 + i * 80, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.add.text(startX + i * 140, 385, `${c.nome}\nNv${c.nivel}`, { font: '14px monospace', color: '#ffffff', align: 'center' }).setOrigin(0.5, 0);
    });

    const t = this.add.text(400, 520, 'ENTER ou clique: voltar ao menu', {
      font: '22px monospace', color: '#ffffff', backgroundColor: '#00000066', padding: { x: 12, y: 8 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.tweens.add({ targets: t, alpha: 0.4, duration: 700, yoyo: true, repeat: -1 });

    const go = () => {
      if (this.done) return;
      this.done = true;
      Sfx.play('select');
      this.scene.start('MenuScene');
    };
    t.on('pointerdown', go);
    this.input.keyboard.once('keydown-ENTER', go);
    this.input.keyboard.once('keydown-SPACE', go);
  }
}
