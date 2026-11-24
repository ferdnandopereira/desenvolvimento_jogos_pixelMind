
// Dados das criaturas, golpes e tipos. Todas as lendas são inspiradas no folclore brasileiro.
const TYPES = {
  fogo:   { nome: 'Fogo',   forte: 'planta', fraco: 'agua',   cor: '#ff7a1a' },
  agua:   { nome: 'Água',   forte: 'fogo',   fraco: 'planta', cor: '#29b6f6' },
  planta: { nome: 'Planta', forte: 'agua',   fraco: 'fogo',   cor: '#66bb6a' },
  normal: { nome: 'Comum',  forte: null,     fraco: null,     cor: '#bdbdbd' },
  sombra: { nome: 'Sombra', forte: null,     fraco: null,     cor: '#ab47bc' }
};

function typeMultiplier(atacante, defensor) {
  const t = TYPES[atacante];
  if (t.forte === defensor) return 1.5;
  if (t.fraco === defensor) return 0.67;
  return 1;
}

const MOVES = {
  investida:  { nome: 'Investida',    tipo: 'normal', poder: 40 },
  redemoinho: { nome: 'Redemoinho',   tipo: 'normal', poder: 55 },
  uivo:       { nome: 'Uivo Sombrio', tipo: 'normal', poder: 52 },
  labareda:   { nome: 'Labareda',     tipo: 'fogo',   poder: 55 },
  folhada:    { nome: 'Folhada',      tipo: 'planta', poder: 55 },
  jato:       { nome: "Jato d'água",  tipo: 'agua',   poder: 55 },
  feitico:    { nome: 'Feitiço',      tipo: 'sombra', poder: 55 }
};

const CREATURES = {
  boitata: {
    nome: 'Boitatá', tipo: 'fogo', base: { hp: 44, atk: 12, def: 9, spd: 10 },
    golpes: ['investida', 'labareda'],
    desc: 'Serpente de fogo que protege as matas. Ágil e muito ofensiva.'
  },
  curupira: {
    nome: 'Curupira', tipo: 'planta', base: { hp: 48, atk: 11, def: 10, spd: 9 },
    golpes: ['investida', 'folhada'],
    desc: 'Guardião da floresta de cabelos de fogo. Resistente e equilibrado.'
  },
  iara: {
    nome: 'Iara', tipo: 'agua', base: { hp: 46, atk: 11, def: 9, spd: 11 },
    golpes: ['investida', 'jato'],
    desc: 'Sereia dos rios com canto hipnotizante. Rápida e precisa.'
  },
  saci: {
    nome: 'Saci', tipo: 'normal', base: { hp: 38, atk: 10, def: 8, spd: 14 },
    golpes: ['investida', 'redemoinho'],
    desc: 'Travesso de uma perna só, nasce dos redemoinhos.'
  },
  lobiz: {
    nome: 'Lobisomem', tipo: 'normal', base: { hp: 50, atk: 12, def: 9, spd: 8 },
    golpes: ['investida', 'uivo'],
    desc: 'Lobo das noites de lua cheia. Forte, porém lento.'
  },
  mapinguari: {
    nome: 'Mapinguari', tipo: 'planta', base: { hp: 52, atk: 13, def: 11, spd: 6 },
    golpes: ['investida', 'folhada'],
    desc: 'Gigante peludo de um olho só. Um verdadeiro tanque.'
  },
  boto: {
    nome: 'Boto', tipo: 'agua', base: { hp: 42, atk: 11, def: 8, spd: 12 },
    golpes: ['investida', 'jato'],
    desc: 'Boto-cor-de-rosa que vira rapaz de chapéu nas festas.'
  },
  mula: {
    nome: 'Mula', tipo: 'fogo', base: { hp: 45, atk: 12, def: 9, spd: 11 },
    golpes: ['investida', 'labareda'],
    desc: 'Mula-sem-cabeça, galopa deixando um rastro de chamas.'
  },
  cuca: {
    nome: 'Cuca', tipo: 'sombra', base: { hp: 70, atk: 12, def: 10, spd: 12 },
    golpes: ['investida', 'feitico'],
    desc: 'A bruxa-jacaré, senhora das sombras do sertão.'
  }
};

// Lendas que podem aparecer na grama alta
const WILD_POOL = ['saci', 'lobiz', 'mapinguari', 'boto', 'mula', 'boitata', 'curupira', 'iara'];

function calcStats(id, nivel) {
  const b = CREATURES[id].base;
  return {
    hpMax: b.hp + (nivel - 1) * 5,
    atk: b.atk + (nivel - 1) * 2,
    def: b.def + (nivel - 1) * 2,
    spd: b.spd + (nivel - 1) * 2
  };
}

function createCreature(id, nivel = 5) {
  const d = CREATURES[id];
  const s = calcStats(id, nivel);
  return {
    id, nome: d.nome, tipo: d.tipo, nivel, xp: 0,
    hp: s.hpMax, hpMax: s.hpMax, atk: s.atk, def: s.def, spd: s.spd,
    golpes: [...d.golpes]
  };
}

function xpNeeded(c) {
  return c.nivel * 15;
}

function levelUp(c) {
  const oldMax = c.hpMax;
  c.nivel++;
  const s = calcStats(c.id, c.nivel);
  c.hpMax = s.hpMax; c.atk = s.atk; c.def = s.def; c.spd = s.spd;
  c.hp = Math.min(c.hpMax, c.hp + (c.hpMax - oldMax));
}

// Retorna quantos níveis a criatura subiu
function gainXp(c, amount) {
  c.xp += amount;
  let niveis = 0;
  while (c.xp >= xpNeeded(c)) {
    c.xp -= xpNeeded(c);
    levelUp(c);
    niveis++;
  }
  return niveis;
}
