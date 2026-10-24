// Toda a arte do jogo é desenhada por código e transformada em textura.
// Assim o projeto não depende de imagens externas (e não há problema de direitos autorais).

function makeTex(scene, key, w, h, drawFn) {
  const g = scene.make.graphics({ x: 0, y: 0, add: false });
  drawFn(g);
  g.generateTexture(key, w, h);
  g.destroy();
}

function generateTextures(scene) {
  const grassBase = (g, c1, c2) => {
    g.fillStyle(c1, 1).fillRect(0, 0, 32, 32);
    g.fillStyle(c2, 1);
    for (let i = 0; i < 7; i++) g.fillRect(Phaser.Math.Between(1, 28), Phaser.Math.Between(1, 28), 2, 3);
  };

  makeTex(scene, 'grass', 32, 32, g => grassBase(g, 0x4caf50, 0x3f9b44));
  makeTex(scene, 'grass2', 32, 32, g => {
    grassBase(g, 0x4caf50, 0x3f9b44);
    g.fillStyle(0xffeb3b, 1).fillCircle(9, 10, 2);
    g.fillStyle(0xf8bbd0, 1).fillCircle(23, 22, 2);
  });
  makeTex(scene, 'tallgrass', 32, 32, g => {
    grassBase(g, 0x388e3c, 0x2e7d32);
    g.fillStyle(0x1b6b2a, 1);
    for (let i = 0; i < 6; i++) {
      const x = 1 + i * 5;
      g.fillTriangle(x, 31, x + 3, 6 + (i % 2) * 5, x + 6, 31);
    }
    g.fillStyle(0x66bb6a, 1);
    for (let i = 0; i < 5; i++) {
      const x = 3 + i * 6;
      g.fillTriangle(x, 31, x + 2, 12 + (i % 2) * 4, x + 4, 31);
    }
  });
  makeTex(scene, 'tree', 32, 32, g => {
    grassBase(g, 0x4caf50, 0x3f9b44);
    g.fillStyle(0x6d4c41, 1).fillRect(13, 18, 6, 13);
    g.fillStyle(0x2e7d32, 1).fillCircle(16, 14, 13);
    g.fillStyle(0x43a047, 1).fillCircle(12, 10, 6);
  });
  makeTex(scene, 'water', 32, 32, g => {
    g.fillStyle(0x2f80d0, 1).fillRect(0, 0, 32, 32);
    g.fillStyle(0x5aa8f0, 1);
    g.fillRect(4, 8, 10, 2);
    g.fillRect(16, 20, 12, 2);
    g.fillRect(6, 27, 8, 2);
  });
  makeTex(scene, 'path', 32, 32, g => {
    g.fillStyle(0xd2b27a, 1).fillRect(0, 0, 32, 32);
    g.fillStyle(0xb8955c, 1);
    for (let i = 0; i < 6; i++) g.fillRect(Phaser.Math.Between(1, 28), Phaser.Math.Between(1, 28), 3, 2);
  });
  makeTex(scene, 'fire', 32, 32, g => {
    grassBase(g, 0x4caf50, 0x3f9b44);
    g.fillStyle(0x5d4037, 1).fillRect(6, 24, 20, 5);
    g.fillStyle(0xff5722, 1).fillTriangle(9, 25, 16, 4, 23, 25);
    g.fillStyle(0xffc107, 1).fillTriangle(12, 25, 16, 11, 20, 25);
  });
  makeTex(scene, 'portal', 32, 32, g => {
    g.fillStyle(0xd2b27a, 1).fillRect(0, 0, 32, 32);
    g.fillStyle(0x3b1a52, 1).fillCircle(16, 16, 15);
    g.fillStyle(0x7b2cbf, 1).fillCircle(16, 16, 10);
    g.fillStyle(0xe0aaff, 1).fillCircle(16, 16, 5);
  });

  makeTex(scene, 'player', 32, 32, g => {
    g.fillStyle(0x37474f, 1).fillRect(11, 26, 4, 5).fillRect(17, 26, 4, 5);
    g.fillStyle(0x1e88e5, 1).fillRect(10, 15, 12, 11);
    g.fillStyle(0xf1c27d, 1).fillCircle(16, 10, 6);
    g.fillStyle(0xc62828, 1).fillRect(9, 3, 14, 4).fillRect(11, 0, 10, 4);
    g.fillStyle(0x000000, 1).fillRect(13, 10, 2, 2).fillRect(18, 10, 2, 2);
  });

  makeTex(scene, 'capsula', 24, 24, g => {
    g.fillStyle(0xffffff, 1).fillCircle(12, 12, 11);
    g.fillStyle(0xe53935, 1);
    g.beginPath();
    g.arc(12, 12, 11, Math.PI, 0, false);
    g.closePath();
    g.fillPath();
    g.fillStyle(0x222222, 1).fillRect(1, 11, 22, 2);
    g.fillStyle(0xffffff, 1).fillCircle(12, 12, 4);
    g.lineStyle(2, 0x222222, 1).strokeCircle(12, 12, 4);
  });

  Object.keys(CREATURES).forEach(id => {
    makeTex(scene, 'cr_' + id, 96, 96, g => drawCreature(g, id));
  });
}

function eyes(g, x1, x2, y, r = 6) {
  g.fillStyle(0xffffff, 1).fillCircle(x1, y, r).fillCircle(x2, y, r);
  g.fillStyle(0x000000, 1).fillCircle(x1 + 1, y + 1, r / 2).fillCircle(x2 + 1, y + 1, r / 2);
}

function drawCreature(g, id) {
  switch (id) {
    case 'boitata':
      g.fillStyle(0xff7a1a, 1).fillEllipse(48, 62, 66, 50);
      g.fillStyle(0xffd23f, 1).fillEllipse(48, 70, 40, 26);
      g.fillStyle(0xff7a1a, 1).fillCircle(48, 36, 21);
      g.fillStyle(0xffc107, 1)
        .fillTriangle(34, 24, 40, 4, 48, 22)
        .fillTriangle(42, 22, 50, 0, 58, 22)
        .fillTriangle(52, 22, 62, 6, 64, 26);
      g.fillStyle(0xff7a1a, 1).fillTriangle(74, 70, 92, 86, 70, 84);
      eyes(g, 40, 56, 36);
      break;
    case 'curupira':
      g.fillStyle(0x4caf50, 1).fillEllipse(48, 64, 60, 48);
      g.fillStyle(0x2e7d32, 1).fillEllipse(18, 56, 20, 10).fillEllipse(78, 56, 20, 10);
      g.fillStyle(0xffccbc, 1).fillCircle(48, 36, 20);
      g.fillStyle(0xe53935, 1)
        .fillTriangle(28, 30, 38, 4, 50, 26)
        .fillTriangle(44, 26, 56, 2, 68, 30);
      eyes(g, 41, 56, 38);
      g.fillStyle(0x6d4c41, 1).fillRect(36, 84, 10, 8).fillRect(52, 84, 10, 8);
      break;
    case 'iara':
      g.fillStyle(0x1a237e, 1).fillEllipse(26, 46, 16, 48).fillEllipse(70, 46, 16, 48);
      g.fillStyle(0x29b6f6, 1).fillEllipse(48, 62, 46, 48);
      g.fillStyle(0x0288d1, 1).fillTriangle(28, 90, 48, 68, 68, 90);
      g.fillStyle(0xffe0b2, 1).fillCircle(48, 34, 18);
      eyes(g, 41, 56, 34, 5);
      g.fillStyle(0xe91e63, 1).fillEllipse(48, 44, 8, 4);
      break;
    case 'saci':
      g.fillStyle(0x3e2723, 1).fillEllipse(48, 58, 50, 44);
      g.fillStyle(0x3e2723, 1).fillRect(44, 76, 9, 16);
      g.fillStyle(0x3e2723, 1).fillCircle(48, 34, 19);
      g.fillStyle(0xd32f2f, 1).fillTriangle(28, 24, 52, 0, 68, 24).fillRect(26, 22, 44, 5);
      eyes(g, 41, 56, 36, 5);
      g.fillStyle(0x795548, 1).fillRect(52, 44, 18, 4);
      g.fillStyle(0xff9800, 1).fillCircle(72, 42, 4);
      break;
    case 'lobiz':
      g.fillStyle(0x757575, 1).fillEllipse(48, 64, 64, 46);
      g.fillStyle(0x757575, 1).fillCircle(48, 38, 22);
      g.fillStyle(0x757575, 1).fillTriangle(28, 24, 30, 2, 44, 18).fillTriangle(52, 18, 66, 2, 68, 24);
      g.fillStyle(0xbdbdbd, 1).fillEllipse(48, 46, 22, 14);
      g.fillStyle(0x000000, 1).fillCircle(48, 42, 3);
      g.fillStyle(0xffffff, 1).fillTriangle(40, 50, 43, 50, 41, 57).fillTriangle(53, 50, 56, 50, 55, 57);
      eyes(g, 39, 57, 32, 4);
      break;
    case 'mapinguari':
      g.fillStyle(0x6d4c41, 1).fillEllipse(48, 58, 78, 66);
      g.fillStyle(0x8d6e63, 1);
      for (let i = 0; i < 6; i++) g.fillRect(14 + i * 12, 20 + (i % 2) * 6, 4, 14);
      g.fillStyle(0xffffff, 1).fillCircle(48, 40, 13);
      g.fillStyle(0xc62828, 1).fillCircle(48, 40, 7);
      g.fillStyle(0x000000, 1).fillCircle(48, 40, 3);
      g.fillStyle(0x8b0000, 1).fillEllipse(48, 68, 36, 14);
      g.fillStyle(0xffffff, 1);
      for (let i = 0; i < 4; i++) g.fillTriangle(34 + i * 9, 63, 40 + i * 9, 63, 37 + i * 9, 69);
      break;
    case 'boto':
      g.fillStyle(0xf48fb1, 1).fillEllipse(48, 66, 72, 42);
      g.fillStyle(0xf48fb1, 1).fillCircle(48, 42, 20);
      g.fillStyle(0xf8bbd0, 1).fillEllipse(48, 54, 12, 26);
      g.fillStyle(0xffffff, 1).fillEllipse(48, 24, 52, 8).fillRect(38, 8, 20, 16);
      g.fillStyle(0xf06292, 1).fillTriangle(8, 70, 20, 56, 20, 78).fillTriangle(88, 70, 76, 56, 76, 78);
      eyes(g, 38, 58, 40, 4);
      break;
    case 'mula':
      g.fillStyle(0xa1887f, 1).fillEllipse(48, 64, 66, 46);
      g.fillStyle(0xa1887f, 1).fillCircle(48, 38, 19);
      g.fillStyle(0xa1887f, 1).fillTriangle(32, 26, 34, 6, 44, 22).fillTriangle(52, 22, 62, 6, 64, 26);
      g.fillStyle(0xff5722, 1)
        .fillTriangle(60, 28, 72, 6, 80, 40)
        .fillTriangle(62, 44, 80, 30, 84, 56);
      g.fillStyle(0xffc107, 1).fillTriangle(66, 30, 72, 16, 76, 38);
      eyes(g, 41, 55, 36, 5);
      g.fillStyle(0x5d4037, 1).fillCircle(44, 48, 2).fillCircle(52, 48, 2);
      break;
    case 'cuca':
      g.fillStyle(0x6a1b9a, 1).fillEllipse(48, 66, 76, 58);
      g.fillStyle(0x7cb342, 1).fillCircle(48, 40, 21);
      g.fillStyle(0x7cb342, 1).fillEllipse(48, 50, 34, 16);
      g.fillStyle(0xffffff, 1);
      for (let i = 0; i < 5; i++) g.fillTriangle(34 + i * 7, 50, 39 + i * 7, 50, 36 + i * 7, 56);
      g.fillStyle(0xfdd835, 1).fillCircle(40, 34, 5).fillCircle(57, 34, 5);
      g.fillStyle(0x000000, 1).fillRect(39, 31, 2, 7).fillRect(56, 31, 2, 7);
      g.fillStyle(0x311b92, 1).fillTriangle(28, 24, 48, 0, 68, 24).fillEllipse(48, 24, 52, 8);
      break;
  }
}
