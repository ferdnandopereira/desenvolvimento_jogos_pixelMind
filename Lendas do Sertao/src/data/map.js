// Mapa do mundo gerado por código (sem editor externo).
// Legenda: g=grama  G=grama alta (encontros)  t=árvore  w=água  p=trilha  f=fogueira (cura)  b=portal da Cuca
const TILE = 32;
const MAP_W = 30;
const MAP_H = 24;

function buildMap() {
  const m = [];
  for (let y = 0; y < MAP_H; y++) m.push(new Array(MAP_W).fill('g'));
  const rect = (x, y, w, h, t) => {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) m[yy][xx] = t;
  };

  // gerador pseudo-aleatório fixo: o mapa é sempre o mesmo
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  // grama alta
  rect(2, 12, 8, 6, 'G');
  rect(19, 12, 8, 7, 'G');
  rect(3, 4, 8, 5, 'G');
  rect(19, 4, 8, 5, 'G');
  rect(11, 14, 3, 3, 'G');

  // lagos
  rect(4, 10, 5, 1, 'w');
  rect(21, 10, 5, 2, 'w');

  // árvores espalhadas
  for (let i = 0; i < 110; i++) {
    const x = 1 + Math.floor(rnd() * (MAP_W - 2));
    const y = 1 + Math.floor(rnd() * (MAP_H - 2));
    if (m[y][x] === 'g' && Math.abs(x - 15) > 1 && y < 19) m[y][x] = 't';
  }

  // borda de árvores
  rect(0, 0, MAP_W, 1, 't');
  rect(0, MAP_H - 1, MAP_W, 1, 't');
  rect(0, 0, 1, MAP_H, 't');
  rect(MAP_W - 1, 0, 1, MAP_H, 't');

  // trilha central
  for (let y = 4; y <= 22; y++) m[y][15] = 'p';

  // área da Cuca
  rect(12, 1, 7, 2, 't');
  m[3][14] = 't';
  m[3][16] = 't';
  m[3][15] = 'b';

  // fogueira de cura perto do início
  m[20][17] = 'f';

  return m;
}

function isSolid(t) {
  return t === 't' || t === 'w';
}
