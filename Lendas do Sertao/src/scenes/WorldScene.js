// Mundo aberto: exploração em grade, grama alta (encontros), fogueira (cura) e portal da Cuca (chefe).
class WorldScene extends Phaser.Scene {
  constructor() { super('WorldScene'); }

  create() {
    this.map = buildMap();
    this.moving = false;
    this.busy = false;

    for (let y = 0; y < MAP_H; y++) {
      for (let x = 0; x < MAP_W; x++) {
        const t = this.map[y][x];
        let key;
        switch (t) {
          case 'G': key = 'tallgrass'; break;
          case 't': key = 'tree'; break;
          case 'w': key = 'water'; break;
          case 'p': key = 'path'; break;
          case 'f': key = 'fire'; break;
          case 'b': key = 'portal'; break;
          default: key = ((x * 7 + y * 13) % 9 === 0) ? 'grass2' : 'grass';
        }
        this.add.image(x * TILE + TILE / 2, y * TILE + TILE / 2, key);
      }
    }

    this.gx = GameState.pos.x;
    this.gy = GameState.pos.y;
    this.player = this.add.image(this.gx * TILE + TILE / 2, this.gy * TILE + TILE / 2, 'player').setDepth(10);

    const cam = this.cameras.main;
    cam.setBounds(0, 0, MAP_W * TILE, MAP_H * TILE);
    cam.startFollow(this.player, true, 0.2, 0.2);
    cam.roundPixels = true;
    cam.fadeIn(300);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys('W,A,S,D');
    this.input.keyboard.on('keydown-M', this.onMute, this);

    this.hud = this.add.text(8, 8, '', {
      font: '13px monospace', color: '#ffffff', backgroundColor: '#000000aa', padding: { x: 6, y: 4 }
    }).setScrollFactor(0).setDepth(100);
    this.toastText = this.add.text(400, 570, '', {
      font: '16px monospace', color: '#ffffff', backgroundColor: '#000000cc', padding: { x: 10, y: 6 }
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100).setAlpha(0);

    this.events.on('resume', this.onResume, this);
    this.events.once('shutdown', () => {
      this.events.off('resume', this.onResume, this);
      this.input.keyboard.off('keydown-M', this.onMute, this);
    });

    Sfx.startMusic('world');
    this.updateHud();
    this.toast('Explore! Grama alta = encontros. Fogueira = cura.');
  }

  onMute() {
    const muted = Sfx.toggleMute();
    this.toast(muted ? 'Som desligado (M para ligar)' : 'Som ligado');
  }

  updateHud() {
    const lines = GameState.team.map(c =>
      `${c.nome.padEnd(10)} Nv${String(c.nivel).padEnd(2)} HP ${c.hp}/${c.hpMax}  XP ${c.xp}/${xpNeeded(c)}`);
    lines.push(`Cápsulas: ${GameState.capsulas}   |   Meta: nível ${BOSS_MIN_LEVEL}+ e enfrente a Cuca ao norte`);
    this.hud.setText(lines.join('\n'));
  }

  toast(msg) {
    this.tweens.killTweensOf(this.toastText);
    this.toastText.setText(msg).setAlpha(1);
    this.tweens.add({ targets: this.toastText, alpha: 0, delay: 2200, duration: 500 });
  }

  update() {
    if (this.moving || this.busy) return;
    let dx = 0, dy = 0;
    if (this.cursors.left.isDown || this.wasd.A.isDown) dx = -1;
    else if (this.cursors.right.isDown || this.wasd.D.isDown) dx = 1;
    else if (this.cursors.up.isDown || this.wasd.W.isDown) dy = -1;
    else if (this.cursors.down.isDown || this.wasd.S.isDown) dy = 1;
    if (dx || dy) this.tryMove(dx, dy);
  }

  tryMove(dx, dy) {
    if (dx !== 0) this.player.setFlipX(dx < 0);
    const nx = this.gx + dx;
    const ny = this.gy + dy;
    if (nx < 0 || ny < 0 || nx >= MAP_W || ny >= MAP_H) return;
    const t = this.map[ny][nx];
    if (isSolid(t)) return;

    if (t === 'b') {
      if (GameState.bossDefeated) { this.toast('A Cuca já foi derrotada. O sertão está em paz!'); return; }
      if (GameState.maxLevel() < BOSS_MIN_LEVEL) {
        this.toast(`Uma presença sombria bloqueia o portal... Alcance o nível ${BOSS_MIN_LEVEL}!`);
        return;
      }
    }

    this.moving = true;
    Sfx.play('step');
    this.tweens.add({
      targets: this.player,
      x: nx * TILE + TILE / 2,
      y: ny * TILE + TILE / 2,
      duration: 140,
      onComplete: () => {
        this.gx = nx; this.gy = ny;
        GameState.pos = { x: nx, y: ny };
        this.moving = false;
        this.onStep(t);
      }
    });
  }

  onStep(t) {
    if (t === 'f') {
      healTeam();
      this.updateHud();
      Sfx.play('heal');
      this.toast('A fogueira restaurou sua equipe e suas cápsulas!');
      return;
    }
    if (t === 'b') {
      this.startBattle(createCreature('cuca', 9), true);
      return;
    }
    if (t === 'G' && Math.random() < 0.2) {
      const lvl = Phaser.Math.Clamp(GameState.avgLevel() + Phaser.Math.Between(-2, 1), 2, 12);
      const id = Phaser.Utils.Array.GetRandom(WILD_POOL);
      this.startBattle(createCreature(id, lvl), false);
    }
  }

  startBattle(enemy, boss) {
    this.busy = true;
    Sfx.play('encounter');
    this.cameras.main.flash(250, 255, 255, 255);
    this.time.delayedCall(380, () => {
      this.scene.pause();
      this.scene.launch('BattleScene', { enemy, boss });
    });
  }

  onResume() {
    this.busy = false;
    this.moving = false;
    this.cameras.main.fadeIn(300);
    Sfx.startMusic('world');
    this.updateHud();

    const r = GameState.lastResult;
    GameState.lastResult = null;
    if (!r) return;

    if (r.result === 'lose') {
      this.busy = true;
      this.scene.start('GameOverScene');
    } else if (r.result === 'win' && r.boss) {
      GameState.bossDefeated = true;
      this.busy = true;
      this.scene.start('VictoryScene');
    } else if (r.result === 'captured') {
      this.toast('Uma nova lenda entrou para a sua equipe!');
    } else if (r.result === 'win') {
      this.toast('Vitória! Sua equipe ficou mais forte.');
    } else if (r.result === 'run') {
      this.toast('Você escapou da batalha.');
    }
  }
}
