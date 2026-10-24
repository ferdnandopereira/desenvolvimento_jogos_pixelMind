// audio 100% procedural (Web Audio API): sem arquivos externos, sem direitos autorais.
const N = {
  A3: 220, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, C6: 1046.5, R: 0
};

const TRACKS = {
  menu: {
    beat: 0.38, wave: 'triangle', vol: 0.05,
    notes: [[N.G4,1],[N.C5,1],[N.E5,1],[N.C5,1],[N.D5,1],[N.G5,2],[N.E5,1],[N.C5,1],[N.A4,1],[N.C5,1],[N.D5,2],[N.R,1]]
  },
  world: {
    beat: 0.30, wave: 'triangle', vol: 0.05,
    notes: [[N.C5,1],[N.E5,1],[N.G5,1],[N.E5,1],[N.D5,1],[N.F5,1],[N.A5,1],[N.F5,1],
            [N.E5,1],[N.G5,1],[N.C6,2],[N.G5,1],[N.E5,1],[N.D5,2],[N.R,2]]
  },
  battle: {
    beat: 0.15, wave: 'square', vol: 0.03,
    notes: [[N.A3,1],[N.A3,1],[N.C4,1],[N.A3,1],[N.E4,1],[N.A3,1],[N.C4,1],[N.D4,1],
            [N.A3,1],[N.A3,1],[N.C4,1],[N.A3,1],[N.G4,1],[N.F4,1],[N.E4,1],[N.D4,1]]
  },
  boss: {
    beat: 0.13, wave: 'sawtooth', vol: 0.028,
    notes: [[N.A3,1],[N.R,1],[N.A3,1],[N.C4,1],[N.A3,1],[N.R,1],[246.94,1],[N.D4,1],
            [N.A3,1],[N.R,1],[N.A3,1],[N.E4,1],[N.D4,1],[N.C4,1],[N.A3,1],[N.R,1]]
  },
  victory: {
    beat: 0.25, wave: 'triangle', vol: 0.06,
    notes: [[N.C5,1],[N.E5,1],[N.G5,1],[N.C6,2],[N.G5,1],[N.C6,3],[N.R,2]]
  }
};

const Sfx = {
  ctx: null,
  muted: false,
  musicId: 0,
  current: null,

  // Navegadores só liberam áudio após uma interação do usuário.
  init() {
    try {
      if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) {
      this.ctx = null;
    }
  },

  tone(freq, dur = 0.12, type = 'square', vol = 0.06, delay = 0, slideTo = null) {
    if (!this.ctx || this.muted || !freq) return;
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  },

  play(name) {
    switch (name) {
      case 'step':    this.tone(120, 0.05, 'square', 0.015); break;
      case 'select':  this.tone(660, 0.07, 'square', 0.05); break;
      case 'hit':     this.tone(220, 0.16, 'sawtooth', 0.07, 0, 60); break;
      case 'super':   this.tone(220, 0.16, 'sawtooth', 0.08, 0, 60); this.tone(880, 0.12, 'square', 0.05, 0.08); break;
      case 'weak':    this.tone(160, 0.14, 'triangle', 0.06, 0, 90); break;
      case 'miss':    this.tone(260, 0.12, 'triangle', 0.04, 0, 120); break;
      case 'faint':   this.tone(420, 0.55, 'triangle', 0.08, 0, 60); break;
      case 'shake':   this.tone(300, 0.08, 'square', 0.05); break;
      case 'encounter': this.tone(200, 0.4, 'sawtooth', 0.06, 0, 900); break;
      case 'capture': [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => this.tone(f, 0.15, 'square', 0.06, i * 0.1)); break;
      case 'levelup': [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => this.tone(f, 0.12, 'triangle', 0.07, i * 0.09)); break;
      case 'heal':    [N.C5, N.D5, N.E5, N.G5, N.C6].forEach((f, i) => this.tone(f, 0.12, 'triangle', 0.06, i * 0.08)); break;
      case 'win':     [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => this.tone(f, 0.18, 'square', 0.05, i * 0.12)); break;
      case 'lose':    [N.G4, N.E4, N.C4, N.A3].forEach((f, i) => this.tone(f, 0.25, 'triangle', 0.07, i * 0.2)); break;
    }
  },

  startMusic(name) {
    if (this.current === name) return;
    this.current = name;
    this.musicId++;
    const id = this.musicId;
    const tr = TRACKS[name];
    if (!tr) return;
    let i = 0;
    const step = () => {
      if (id !== this.musicId) return;
      const [f, b] = tr.notes[i % tr.notes.length];
      if (f) this.tone(f, b * tr.beat * 0.9, tr.wave, tr.vol);
      i++;
      setTimeout(step, b * tr.beat * 1000);
    };
    step();
  },

  stopMusic() {
    this.musicId++;
    this.current = null;
  },

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }
};
