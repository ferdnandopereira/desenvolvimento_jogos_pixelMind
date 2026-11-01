// Estado global da partida (equipe, capsulas, progresso).
const START_POS = { x: 15, y: 21 };
const BOSS_MIN_LEVEL = 8;

const GameState = {
  team: [],
  box: [],
  capsulas: 5,
  bossDefeated: false,
  lastResult: null,
  pos: { ...START_POS },

  reset(starterId) {
    this.team = [createCreature(starterId, 5)];
    this.box = [];
    this.capsulas = 5;
    this.bossDefeated = false;
    this.lastResult = null;
    this.pos = { ...START_POS };
  },

  maxLevel() {
    return this.team.reduce((m, c) => Math.max(m, c.nivel), 0);
  },

  avgLevel() {
    return Math.round(this.team.reduce((s, c) => s + c.nivel, 0) / this.team.length);
  }
};

function healTeam() {
  GameState.team.forEach(c => { c.hp = c.hpMax; });
  GameState.box.forEach(c => { c.hp = c.hpMax; });
  if (GameState.capsulas < 5) GameState.capsulas = 5;
}
