// Batalha por turnos: atacar, capturar, trocar de criatura e fugir.
class BattleScene extends Phaser.Scene {
  constructor() { super('BattleScene'); }

  init(data) {
    this.enemy = data.enemy;
    this.isBoss = !!data.boss;
    this.menuActive = false;
    this.menuItems = [];
    this.menuOpts = [];
    this.menuIndex = 0;
    this.menuCols = 2;
    this.menuBack = null;
    this.ended = false;
    this.ui = {};
  }

  create() {
    Sfx.startMusic(this.isBoss ? 'boss' : 'battle');
    this.cameras.main.fadeIn(250);
    this.active = GameState.team.find(c => c.hp > 0);

    // cenário
    const sky = this.isBoss ? 0x2a1040 : 0x8fd3f4;
    const ground = this.isBoss ? 0x3a2455 : 0x7cc66b;
    this.add.rectangle(400, 225, 800, 450, sky);
    this.add.rectangle(400, 390, 800, 120, ground);
    this.add.ellipse(580, 255, 260, 56, 0x000000, 0.18);
    this.add.ellipse(210, 425, 300, 64, 0x000000, 0.18);

    this.pBase = { x: 210, y: 325 };
    this.eSprite = this.add.image(580, 175, 'cr_' + this.enemy.id).setScale(1.7);
    this.pSprite = this.add.image(this.pBase.x, this.pBase.y, 'cr_' + this.active.id).setScale(2.2).setFlipX(true);

    // painel inferior
    this.add.rectangle(400, 525, 800, 150, 0x1a1a2e).setStrokeStyle(4, 0xffffff);
    this.msg = this.add.text(24, 470, '', {
      font: '20px monospace', color: '#ffffff', wordWrap: { width: 370 }
    });

    this.makeInfo('enemy', 30, 30, this.enemy);
    this.makeInfo('player', 470, 330, this.active);

    this.input.keyboard.on('keydown', this.onKey, this);
    this.events.once('shutdown', () => this.input.keyboard.off('keydown', this.onKey, this));

    this.intro();
  }

  // ---------- interface ----------
  makeInfo(side, x, y, c) {
    this.add.rectangle(x + 130, y + 36, 260, 72, 0x10202e, 0.92).setStrokeStyle(3, 0xffffff);
    const nameText = this.add.text(x + 10, y + 6, '', { font: '15px monospace', color: '#ffffff' });
    this.add.text(x + 10, y + 31, 'HP', { font: '13px monospace', color: '#ffd23f' });
    const bar = this.add.graphics();
    const hpText = this.add.text(x + 10, y + 50, '', { font: '12px monospace', color: '#cfd8dc' });
    this.ui[side] = { x, y, creature: c, nameText, bar, hpText };
    this.refreshInfo(side);
  }

  refreshInfo(side) {
    const u = this.ui[side];
    const c = u.creature;
    u.nameText.setText(`${c.nome} Nv${c.nivel}  [${TYPES[c.tipo].nome}]`);
    this.drawBar(side, c.hp);
  }

  drawBar(side, value) {
    const u = this.ui[side];
    const c = u.creature;
    const pct = Phaser.Math.Clamp(value / c.hpMax, 0, 1);
    u.bar.clear();
    u.bar.fillStyle(0x333333, 1);
    u.bar.fillRect(u.x + 34, u.y + 33, 215, 10);
    const col = pct > 0.5 ? 0x4cd964 : (pct > 0.2 ? 0xffcc00 : 0xff3b30);
    u.bar.fillStyle(col, 1);
    u.bar.fillRect(u.x + 34, u.y + 33, 215 * pct, 10);
    u.hpText.setText(`${Math.ceil(value)}/${c.hpMax}`);
  }

  animateHp(side, from, to) {
    return new Promise(res => {
      this.tweens.addCounter({
        from, to, duration: 500,
        onUpdate: t => this.drawBar(side, t.getValue()),
        onComplete: () => { this.drawBar(side, to); res(); }
      });
    });
  }

  wait(ms) { return new Promise(res => this.time.delayedCall(ms, res)); }
  tween(cfg) { return new Promise(res => this.tweens.add({ ...cfg, onComplete: () => res() })); }
  async say(text, ms = 800) { this.msg.setText(text); await this.wait(ms); }

  // ---------- menus ----------
  showMenu(opts, cfg = {}) {
    this.clearMenu();
    this.menuOpts = opts;
    this.menuIndex = 0;
    this.menuCols = cfg.cols || 2;
    this.menuBack = cfg.back || null;
    opts.forEach((o, i) => {
      let x, y, font;
      if (this.menuCols === 1) { x = 420; y = 458 + i * 21; font = '15px monospace'; }
      else { x = 420 + (i % 2) * 190; y = 472 + Math.floor(i / 2) * 42; font = '18px monospace'; }
      const t = this.add.text(x, y, '', { font, color: '#ffffff' }).setInteractive({ useHandCursor: true });
      t.on('pointerover', () => { this.menuIndex = i; this.refreshMenu(); });
      t.on('pointerdown', () => this.choose(i));
      this.menuItems.push(t);
    });
    this.refreshMenu();
    this.menuActive = true;
  }

  refreshMenu() {
    this.menuItems.forEach((t, i) => {
      const o = this.menuOpts[i];
      t.setText((i === this.menuIndex ? '> ' : '  ') + o.label);
      t.setColor(o.enabled === false ? '#777777' : (i === this.menuIndex ? '#ffd23f' : '#ffffff'));
    });
  }

  clearMenu() {
    this.menuItems.forEach(t => t.destroy());
    this.menuItems = [];
    this.menuActive = false;
  }

  choose(i) {
    if (!this.menuActive) return;
    const o = this.menuOpts[i];
    if (!o || o.enabled === false) return;
    Sfx.play('select');
    this.clearMenu();
    o.cb();
  }

  onKey(e) {
    if (!this.menuActive) return;
    const n = this.menuOpts.length;
    let i = this.menuIndex;
    switch (e.code) {
      case 'ArrowLeft': if (this.menuCols === 2) i = Math.max(0, i - 1); break;
      case 'ArrowRight': if (this.menuCols === 2) i = Math.min(n - 1, i + 1); break;
      case 'ArrowUp': i = Math.max(0, i - this.menuCols); break;
      case 'ArrowDown': i = Math.min(n - 1, i + this.menuCols); break;
      case 'Enter':
      case 'Space':
        this.choose(this.menuIndex);
        return;
      case 'Escape':
      case 'Backspace':
        if (this.menuBack) { Sfx.play('select'); this.clearMenu(); this.menuBack(); }
        return;
      default: return;
    }
    this.menuIndex = i;
    this.refreshMenu();
  }

  playerTurn() {
    this.msg.setText(`O que ${this.active.nome} vai fazer?`);
    this.showMenu([
      { label: 'Atacar', cb: () => this.menuMoves() },
      { label: `Capturar (${GameState.capsulas})`, enabled: !this.isBoss && GameState.capsulas > 0, cb: () => this.act('capture') },
      { label: 'Equipe', cb: () => this.menuSwitch(false) },
      { label: 'Fugir', enabled: !this.isBoss, cb: () => this.act('run') }
    ]);
  }

  menuMoves() {
    this.msg.setText('Escolha um golpe.');
    const opts = this.active.golpes.map(id => ({
      label: `${MOVES[id].nome} (${TYPES[MOVES[id].tipo].nome})`,
      cb: () => this.act('move', id)
    }));
    opts.push({ label: 'Voltar', cb: () => this.playerTurn() });
    this.showMenu(opts, { cols: 1, back: () => this.playerTurn() });
  }

  menuSwitch(forced) {
    const opts = GameState.team.map(c => ({
      label: `${c.nome} Nv${c.nivel} ${c.hp}/${c.hpMax}`,
      enabled: c.hp > 0 && c !== this.active,
      cb: () => (forced ? this.forcedSwitch(c) : this.act('switch', c))
    }));
    if (!forced) opts.push({ label: 'Voltar', cb: () => this.playerTurn() });
    this.showMenu(opts, { cols: 1, back: forced ? null : () => this.playerTurn() });
  }

  // ---------- fluxo da batalha ----------
  async intro() {
    this.eSprite.x = 950;
    this.pSprite.x = -150;
    await Promise.all([
      this.tween({ targets: this.eSprite, x: 580, duration: 600, ease: 'Cubic.easeOut' }),
      this.tween({ targets: this.pSprite, x: this.pBase.x, duration: 600, ease: 'Cubic.easeOut' })
    ]);
    await this.say(this.isBoss
      ? 'A Cuca surge das sombras e bloqueia o caminho!'
      : `Um ${this.enemy.nome} selvagem apareceu!`, 1100);
    this.playerTurn();
  }

  pickEnemyMove() {
    const moves = this.enemy.golpes;
    if (Math.random() < 0.6) {
      let best = moves[0], bestM = 0;
      moves.forEach(id => {
        const m = MOVES[id].poder * typeMultiplier(MOVES[id].tipo, this.active.tipo);
        if (m > bestM) { bestM = m; best = id; }
      });
      return best;
    }
    return Phaser.Utils.Array.GetRandom(moves);
  }

  async act(kind, arg) {
    if (kind === 'move') {
      const pFirst = this.active.spd > this.enemy.spd ||
        (this.active.spd === this.enemy.spd && Math.random() < 0.5);
      const order = pFirst ? ['p', 'e'] : ['e', 'p'];
      for (const who of order) {
        if (who === 'p') {
          if (await this.attack(this.active, this.enemy, arg, true)) { await this.win(); return; }
        } else if (await this.enemyTurn()) {
          return;
        }
      }
    } else if (kind === 'capture') {
      if (await this.tryCapture()) return;
      if (await this.enemyTurn()) return;
    } else if (kind === 'switch') {
      await this.switchTo(arg, false);
      if (await this.enemyTurn()) return;
    } else if (kind === 'run') {
      if (await this.tryRun()) return;
      if (await this.enemyTurn()) return;
    }
    this.playerTurn();
  }

  // Retorna true se a criatura do jogador desmaiou (e já trata o desmaio)
  async enemyTurn() {
    if (await this.attack(this.enemy, this.active, this.pickEnemyMove(), false)) {
      await this.playerFainted();
      return true;
    }
    return false;
  }

  async attack(att, def, moveId, attIsPlayer) {
    const mv = MOVES[moveId];
    const nome = (attIsPlayer || this.isBoss) ? att.nome : `${att.nome} selvagem`;
    await this.say(`${nome} usou ${mv.nome}!`, 650);

    const spr = attIsPlayer ? this.pSprite : this.eSprite;
    const tgt = attIsPlayer ? this.eSprite : this.pSprite;
    const dir = attIsPlayer ? 1 : -1;
    await this.tween({ targets: spr, x: spr.x + 50 * dir, duration: 110, yoyo: true });

    if (Math.random() > 0.95) {
      Sfx.play('miss');
      await this.say('Mas errou o alvo!', 700);
      return false;
    }

    const mult = typeMultiplier(mv.tipo, def.tipo);
    const crit = Math.random() < 0.0625;
    const base = ((2 * att.nivel / 5 + 2) * mv.poder * att.atk / def.def) / 24 + 2;
    const dmg = Math.max(1, Math.floor(base * mult * (0.85 + Math.random() * 0.15) * (crit ? 1.5 : 1)));

    Sfx.play(mult > 1 ? 'super' : (mult < 1 ? 'weak' : 'hit'));
    this.cameras.main.shake(150, 0.006);
    await this.tween({ targets: tgt, alpha: 0.2, duration: 70, yoyo: true, repeat: 2 });
    tgt.setAlpha(1);

    const side = attIsPlayer ? 'enemy' : 'player';
    const from = def.hp;
    def.hp = Math.max(0, def.hp - dmg);
    await this.animateHp(side, from, def.hp);

    if (crit) await this.say('Golpe crítico!', 600);
    if (mult > 1) await this.say('Foi super efetivo!', 700);
    else if (mult < 1) await this.say('Não foi muito efetivo...', 700);
    return def.hp <= 0;
  }

  async switchTo(c, forced) {
    if (!forced) {
      await this.say(`Volte, ${this.active.nome}!`, 600);
      await this.tween({ targets: this.pSprite, alpha: 0, duration: 200 });
    }
    this.active = c;
    this.ui.player.creature = c;
    this.pSprite.setTexture('cr_' + c.id).setPosition(this.pBase.x, this.pBase.y).setAlpha(0);
    this.refreshInfo('player');
    await this.tween({ targets: this.pSprite, alpha: 1, duration: 250 });
    await this.say(`Vai, ${c.nome}!`, 700);
  }

  async forcedSwitch(c) {
    await this.switchTo(c, true);
    this.playerTurn();
  }

  async playerFainted() {
    Sfx.play('faint');
    await this.tween({ targets: this.pSprite, alpha: 0, y: this.pSprite.y + 50, duration: 500 });
    await this.say(`${this.active.nome} desmaiou!`, 900);
    if (!GameState.team.some(c => c.hp > 0)) {
      await this.say('Sua equipe inteira desmaiou...', 1000);
      Sfx.play('lose');
      this.endBattle('lose');
      return;
    }
    this.msg.setText('Escolha o próximo parceiro!');
    this.menuSwitch(true);
  }

  async win() {
    Sfx.play('faint');
    await this.tween({ targets: this.eSprite, alpha: 0, y: this.eSprite.y + 50, duration: 500 });
    await this.say(this.isBoss ? `${this.enemy.nome} perdeu a luta!` : `${this.enemy.nome} selvagem perdeu a luta!`, 900);
    Sfx.play('win');
    const gain = Math.floor(this.enemy.nivel * 10 * (this.isBoss ? 3 : 1));
    for (const c of GameState.team) {
      if (c.hp <= 0) continue;
      const g = (c === this.active) ? gain : Math.floor(gain / 2);
      const lv = gainXp(c, g);
      if (c === this.active) await this.say(`${c.nome} ganhou ${g} de XP!`, 800);
      if (lv > 0) {
        Sfx.play('levelup');
        await this.say(`${c.nome} subiu para o nível ${c.nivel}!`, 1000);
        if (c === this.active) this.refreshInfo('player');
      }
    }
    this.endBattle('win');
  }

  async tryCapture() {
    GameState.capsulas--;
    await this.say('Você lançou uma cápsula!', 500);
    const cap = this.add.image(260, 330, 'capsula').setScale(1.8).setDepth(20);
    await this.tween({ targets: cap, x: this.eSprite.x, y: this.eSprite.y, duration: 450 });
    this.eSprite.setVisible(false);
    await this.tween({ targets: cap, y: cap.y + 70, duration: 300, ease: 'Bounce.easeOut' });

    const e = this.enemy;
    const chance = Phaser.Math.Clamp(0.15 + (1 - e.hp / e.hpMax) * 0.65, 0.1, 0.9);
    const ok = Math.random() < chance;
    const shakes = ok ? 3 : Phaser.Math.Between(1, 2);
    for (let i = 0; i < shakes; i++) {
      await this.wait(300);
      Sfx.play('shake');
      await this.tween({ targets: cap, angle: 25, duration: 120, yoyo: true });
    }
    await this.wait(400);

    if (ok) {
      Sfx.play('capture');
      await this.say(`${e.nome} foi capturado!`, 1000);
      if (GameState.team.length < 6) {
        GameState.team.push(e);
        await this.say(`${e.nome} entrou para a sua equipe.`, 900);
      } else {
        GameState.box.push(e);
        await this.say(`Equipe cheia! ${e.nome} foi para o acampamento.`, 1000);
      }
      cap.destroy();
      this.endBattle('captured');
      return true;
    }
    cap.destroy();
    this.eSprite.setVisible(true);
    await this.say(`${e.nome} escapou da cápsula!`, 900);
    return false;
  }

  async tryRun() {
    if (this.isBoss) {
      await this.say('Não há como fugir da Cuca!', 900);
      return false;
    }
    const chance = this.active.spd >= this.enemy.spd ? 0.9 : 0.6;
    if (Math.random() < chance) {
      await this.say('Você fugiu em segurança!', 800);
      this.endBattle('run');
      return true;
    }
    await this.say('Não conseguiu fugir!', 800);
    return false;
  }

  endBattle(result) {
    if (this.ended) return;
    this.ended = true;
    GameState.lastResult = { result, boss: this.isBoss };
    this.clearMenu();
    this.cameras.main.fadeOut(300);
    this.time.delayedCall(320, () => {
      this.scene.stop();
      this.scene.resume('WorldScene');
    });
  }
}
