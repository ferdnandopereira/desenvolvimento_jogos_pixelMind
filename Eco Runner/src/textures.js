// Gerador Procedural de Texturas Canvas para o Phaser 3
// Gera sprites com estética pixel art e cores vibrantes diretamente em tempo de execução
class TextureGenerator {
  static generateAll(scene) {
    this.createPlayerTextures(scene);
    this.createPlatformTextures(scene);
    this.createCollectibles(scene);
    this.createEnemies(scene);
    this.createHazardsAndObjectives(scene);
    this.createParticlesAndUI(scene);
  }

  static createPlayerTextures(scene) {
    // 1. Player Idle (32x36)
    const cIdle = document.createElement('canvas');
    cIdle.width = 32;
    cIdle.height = 36;
    const ctxI = cIdle.getContext('2d');

    // Capuz e manto verde
    ctxI.fillStyle = '#2d6a4f';
    ctxI.fillRect(8, 6, 16, 14); // Cabeça/capuz
    ctxI.fillStyle = '#1b4332';
    ctxI.fillRect(6, 16, 20, 14); // Corpo/manto

    // Rosto do Guardião
    ctxI.fillStyle = '#ffe0bd';
    ctxI.fillRect(10, 10, 12, 8);
    // Olhos azuis brilhantes
    ctxI.fillStyle = '#52b788';
    ctxI.fillRect(12, 12, 3, 3);
    ctxI.fillRect(18, 12, 3, 3);

    // Diadema de Folha Dourada
    ctxI.fillStyle = '#d8f3dc';
    ctxI.fillRect(9, 6, 14, 3);
    ctxI.fillStyle = '#ffd166';
    ctxI.fillRect(14, 4, 4, 3);

    // Pernas / botas de couro
    ctxI.fillStyle = '#7f4f24';
    ctxI.fillRect(9, 30, 5, 6);
    ctxI.fillRect(18, 30, 5, 6);

    // Núcleo de seiva bioluminescente no peito
    ctxI.fillStyle = '#74c69d';
    ctxI.beginPath();
    ctxI.arc(16, 22, 3, 0, Math.PI * 2);
    ctxI.fill();

    scene.textures.addCanvas('player_idle', cIdle);

    // 2. Player Run 1
    const cRun1 = document.createElement('canvas');
    cRun1.width = 32;
    cRun1.height = 36;
    const ctxR1 = cRun1.getContext('2d');
    ctxR1.drawImage(cIdle, 0, 0);
    // Mudar pernas para passada 1
    ctxR1.fillStyle = '#52b788'; // Limpa pernas anteriores
    ctxR1.clearRect(6, 30, 20, 6);
    ctxR1.fillStyle = '#7f4f24';
    ctxR1.fillRect(6, 30, 6, 6); // Perna esquerda para frente
    ctxR1.fillRect(20, 28, 6, 6); // Perna direita para trás
    scene.textures.addCanvas('player_run1', cRun1);

    // 3. Player Run 2
    const cRun2 = document.createElement('canvas');
    cRun2.width = 32;
    cRun2.height = 36;
    const ctxR2 = cRun2.getContext('2d');
    ctxR2.drawImage(cIdle, 0, 0);
    ctxR2.clearRect(6, 30, 20, 6);
    ctxR2.fillStyle = '#7f4f24';
    ctxR2.fillRect(10, 28, 6, 6);
    ctxR2.fillRect(17, 30, 6, 6);
    scene.textures.addCanvas('player_run2', cRun2);

    // 4. Player Glide (com Asas de Folha abertas)
    const cGlide = document.createElement('canvas');
    cGlide.width = 44;
    cGlide.height = 36;
    const ctxG = cGlide.getContext('2d');

    // Asas de Folha esmeralda
    ctxG.fillStyle = '#40916c';
    ctxG.beginPath();
    ctxG.ellipse(7, 18, 8, 14, -Math.PI / 4, 0, Math.PI * 2);
    ctxG.fill();
    ctxG.beginPath();
    ctxG.ellipse(37, 18, 8, 14, Math.PI / 4, 0, Math.PI * 2);
    ctxG.fill();

    // Nervuras das asas
    ctxG.strokeStyle = '#95d5b2';
    ctxG.lineWidth = 1.5;
    ctxG.beginPath();
    ctxG.moveTo(8, 22); ctxG.lineTo(2, 14);
    ctxG.moveTo(36, 22); ctxG.lineTo(42, 14);
    ctxG.stroke();

    // Desenha corpo centralizado
    ctxG.drawImage(cIdle, 6, 0);
    scene.textures.addCanvas('player_glide', cGlide);
  }

  static createPlatformTextures(scene) {
    // 1. Plataforma de Chão Gramado (32x32 repetível)
    const cGrass = document.createElement('canvas');
    cGrass.width = 32;
    cGrass.height = 32;
    const ctxGr = cGrass.getContext('2d');

    // Terra
    ctxGr.fillStyle = '#583101';
    ctxGr.fillRect(0, 0, 32, 32);
    ctxGr.fillStyle = '#412200';
    ctxGr.fillRect(4, 16, 6, 4);
    ctxGr.fillRect(18, 22, 8, 4);
    ctxGr.fillRect(12, 8, 4, 4);

    // Grama superior
    ctxGr.fillStyle = '#38b000';
    ctxGr.fillRect(0, 0, 32, 8);
    // Pontas de grama suspensas
    ctxGr.fillStyle = '#70e000';
    for (let i = 0; i < 32; i += 4) {
      ctxGr.fillRect(i, 8, 3, (i % 8 === 0) ? 5 : 3);
    }
    scene.textures.addCanvas('tile_ground', cGrass);

    // 2. Plataforma Flutuante (128x32)
    const cPlat = document.createElement('canvas');
    cPlat.width = 128;
    cPlat.height = 32;
    const ctxP = cPlat.getContext('2d');

    // Base rochosa com cantos chanfrados
    ctxP.fillStyle = '#4a5568';
    ctxP.beginPath();
    ctxP.roundRect(0, 4, 128, 26, 8);
    ctxP.fill();

    // Camada de musgo/pedra
    ctxP.fillStyle = '#2d3748';
    ctxP.fillRect(10, 16, 24, 8);
    ctxP.fillRect(50, 18, 30, 6);
    ctxP.fillRect(94, 15, 20, 8);

    // Grama fofa no topo
    ctxP.fillStyle = '#38b000';
    ctxP.beginPath();
    ctxP.roundRect(0, 0, 128, 10, 4);
    ctxP.fill();
    ctxP.fillStyle = '#70e000';
    ctxP.fillRect(4, 0, 120, 4);

    // Vinhas penduradas
    ctxP.fillStyle = '#2d6a4f';
    ctxP.fillRect(16, 26, 3, 6);
    ctxP.fillRect(32, 28, 4, 8);
    ctxP.fillRect(80, 26, 3, 5);
    ctxP.fillRect(104, 27, 4, 7);

    scene.textures.addCanvas('platform_moss', cPlat);

    // 3. Plataforma Móvel de Cristal Vegetal (96x24)
    const cMoving = document.createElement('canvas');
    cMoving.width = 96;
    cMoving.height = 24;
    const ctxM = cMoving.getContext('2d');

    // Madeira nobre
    ctxM.fillStyle = '#6f1d1b';
    ctxM.fillRect(0, 2, 96, 20);
    // Cristais brilhantes de seiva
    ctxM.fillStyle = '#52b788';
    ctxM.fillRect(4, 0, 88, 4);
    ctxM.fillStyle = '#b7e4c7';
    ctxM.fillRect(20, 8, 12, 8);
    ctxM.fillRect(44, 8, 12, 8);
    ctxM.fillRect(68, 8, 12, 8);

    scene.textures.addCanvas('platform_crystal', cMoving);
  }

  static createCollectibles(scene) {
    // Semente Ancestral Dourada (24x24)
    const cSeed = document.createElement('canvas');
    cSeed.width = 24;
    cSeed.height = 24;
    const ctxS = cSeed.getContext('2d');

    // Brilho externo
    ctxS.fillStyle = 'rgba(255, 214, 10, 0.4)';
    ctxS.beginPath();
    ctxS.arc(12, 12, 11, 0, Math.PI * 2);
    ctxS.fill();

    // Miolo da semente
    ctxS.fillStyle = '#ffb703';
    ctxS.beginPath();
    ctxS.ellipse(12, 13, 6, 8, 0, 0, Math.PI * 2);
    ctxS.fill();

    // Broto verde brilhante saindo do topo
    ctxS.fillStyle = '#52b788';
    ctxS.beginPath();
    ctxS.moveTo(12, 6);
    ctxS.quadraticCurveTo(8, 2, 6, 4);
    ctxS.quadraticCurveTo(9, 7, 12, 7);
    ctxS.fill();

    // Ponto de luz
    ctxS.fillStyle = '#ffffff';
    ctxS.fillRect(10, 10, 2, 3);

    scene.textures.addCanvas('seed_item', cSeed);

    // Fonte de Seiva / Altar (48x48)
    const cFont = document.createElement('canvas');
    cFont.width = 48;
    cFont.height = 48;
    const ctxF = cFont.getContext('2d');

    // Base de pedra antiga
    ctxF.fillStyle = '#495057';
    ctxF.fillRect(6, 32, 36, 16);
    ctxF.fillRect(10, 20, 28, 12);
    ctxF.fillRect(14, 10, 20, 10);

    // Bacia de água mística
    ctxF.fillStyle = '#0077b6';
    ctxF.beginPath();
    ctxF.arc(24, 12, 8, 0, Math.PI * 2);
    ctxF.fill();

    // Cristal puro flutuando
    ctxF.fillStyle = '#48cae4';
    ctxF.beginPath();
    ctxF.moveTo(24, 2);
    ctxF.lineTo(29, 9);
    ctxF.lineTo(24, 16);
    ctxF.lineTo(19, 9);
    ctxF.closePath();
    ctxF.fill();

    scene.textures.addCanvas('fountain_altar', cFont);
  }

  static createEnemies(scene) {
    // 1. Drone Cortador Poluidor (32x28)
    const cDrone = document.createElement('canvas');
    cDrone.width = 32;
    cDrone.height = 28;
    const ctxD = cDrone.getContext('2d');

    // Hélice
    ctxD.fillStyle = '#ced4da';
    ctxD.fillRect(4, 2, 24, 2);

    // Corpo mecânico
    ctxD.fillStyle = '#343a40';
    ctxD.beginPath();
    ctxD.roundRect(6, 6, 20, 16, 4);
    ctxD.fill();

    // Olho laser vermelho
    ctxD.fillStyle = '#e63946';
    ctxD.fillRect(10, 12, 12, 5);
    ctxD.fillStyle = '#ff758f';
    ctxD.fillRect(14, 13, 4, 3);

    // Tubo de escape com faísca
    ctxD.fillStyle = '#6c757d';
    ctxD.fillRect(14, 22, 4, 4);

    scene.textures.addCanvas('enemy_drone', cDrone);

    // 2. Robô Patrulheiro de Fumaça (32x32)
    const cBot = document.createElement('canvas');
    cBot.width = 32;
    cBot.height = 32;
    const ctxB = cBot.getContext('2d');

    // Chassi
    ctxB.fillStyle = '#495057';
    ctxB.fillRect(4, 8, 24, 18);
    // Esteiras / pernas de ferro
    ctxB.fillStyle = '#212529';
    ctxB.fillRect(2, 24, 28, 8);
    // Chaminé soltando fuligem
    ctxB.fillStyle = '#6c757d';
    ctxB.fillRect(20, 2, 6, 8);

    // Visor âmbar
    ctxB.fillStyle = '#ffb703';
    ctxB.fillRect(6, 12, 10, 4);

    scene.textures.addCanvas('enemy_smog', cBot);
  }

  static createHazardsAndObjectives(scene) {
    // Barril de Resíduo Tóxico (30x34)
    const cTox = document.createElement('canvas');
    cTox.width = 30;
    cTox.height = 34;
    const ctxT = cTox.getContext('2d');

    ctxT.fillStyle = '#2b2d42';
    ctxT.beginPath();
    ctxT.roundRect(2, 4, 26, 28, 4);
    ctxT.fill();

    // Listras amarelas de aviso
    ctxT.fillStyle = '#ffb703';
    ctxT.fillRect(2, 12, 26, 4);
    ctxT.fillRect(2, 22, 26, 4);

    // Vazamento verde radioativo
    ctxT.fillStyle = '#70e000';
    ctxT.fillRect(8, 2, 14, 4);
    ctxT.beginPath();
    ctxT.arc(15, 30, 8, 0, Math.PI);
    ctxT.fill();

    scene.textures.addCanvas('hazard_toxic', cTox);

    // Portal do Grande Carvalho Ancestral (Vitória) (64x80)
    const cTree = document.createElement('canvas');
    cTree.width = 64;
    cTree.height = 80;
    const ctxTr = cTree.getContext('2d');

    // Tronco
    ctxTr.fillStyle = '#582f0e';
    ctxTr.fillRect(16, 28, 32, 52);

    // Copa da Árvore
    ctxTr.fillStyle = '#2d6a4f';
    ctxTr.beginPath();
    ctxTr.arc(32, 30, 28, 0, Math.PI * 2);
    ctxTr.fill();
    ctxTr.fillStyle = '#52b788';
    ctxTr.beginPath();
    ctxTr.arc(32, 26, 22, 0, Math.PI * 2);
    ctxTr.fill();

    // Portal místico de luz no tronco
    ctxTr.fillStyle = '#b7e4c7';
    ctxTr.beginPath();
    ctxTr.ellipse(32, 58, 10, 18, 0, 0, Math.PI * 2);
    ctxTr.fill();
    ctxTr.fillStyle = '#ffffff';
    ctxTr.beginPath();
    ctxTr.ellipse(32, 58, 5, 12, 0, 0, Math.PI * 2);
    ctxTr.fill();

    scene.textures.addCanvas('portal_oak', cTree);
  }

  static createParticlesAndUI(scene) {
    // Folha que cai / vento (10x10)
    const cLeaf = document.createElement('canvas');
    cLeaf.width = 10;
    cLeaf.height = 10;
    const ctxL = cLeaf.getContext('2d');
    ctxL.fillStyle = '#52b788';
    ctxL.beginPath();
    ctxL.ellipse(5, 5, 4, 2, Math.PI / 4, 0, Math.PI * 2);
    ctxL.fill();
    scene.textures.addCanvas('particle_leaf', cLeaf);

    // Partícula de Brilho (6x6)
    const cSp = document.createElement('canvas');
    cSp.width = 6;
    cSp.height = 6;
    const ctxSp = cSp.getContext('2d');
    ctxSp.fillStyle = '#ffd166';
    ctxSp.fillRect(2, 0, 2, 6);
    ctxSp.fillRect(0, 2, 6, 2);
    scene.textures.addCanvas('particle_sparkle', cSp);

    // Ícone de Vida / Coração de Seiva (20x20)
    const cHeart = document.createElement('canvas');
    cHeart.width = 20;
    cHeart.height = 20;
    const ctxH = cHeart.getContext('2d');
    ctxH.fillStyle = '#e63946';
    ctxH.beginPath();
    ctxH.moveTo(10, 18);
    ctxH.bezierCurveTo(2, 12, 0, 4, 6, 2);
    ctxH.bezierCurveTo(9, 1, 10, 4, 10, 6);
    ctxH.bezierCurveTo(10, 4, 11, 1, 14, 2);
    ctxH.bezierCurveTo(20, 4, 18, 12, 10, 18);
    ctxH.fill();
    scene.textures.addCanvas('ui_heart', cHeart);
  }
}

window.TextureGenerator = TextureGenerator;
