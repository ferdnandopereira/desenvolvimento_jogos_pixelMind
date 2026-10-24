class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Fundo gradiente florestal
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x081c15, 0x081c15, 0x1b4332, 0x2d6a4f, 1);
    bg.fillRect(0, 0, width, height);

    // Efeito de folhas caindo no fundo
    for (let i = 0; i < 20; i++) {
      const leaf = this.add.image(
        Phaser.Math.Between(0, width),
        Phaser.Math.Between(0, height),
        'particle_leaf'
      ).setScale(Phaser.Math.FloatBetween(1, 2)).setAlpha(0.6);

      this.tweens.add({
        targets: leaf,
        y: height + 20,
        x: leaf.x + Phaser.Math.Between(-80, 80),
        angle: 360,
        duration: Phaser.Math.Between(4000, 9000),
        repeat: -1,
        delay: Phaser.Math.Between(0, 3000)
      });
    }

    // Título Principal
    const title = this.add.text(width / 2, 110, 'ECO-RUNNER', {
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: '56px',
      fontStyle: 'bold',
      fill: '#74c69d',
      stroke: '#081c15',
      strokeThickness: 8,
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 6, fill: true }
    }).setOrigin(0.5);

    // Subtítulo
    const subtitle = this.add.text(width / 2, 165, 'O Guardião da Floresta Ancestral', {
      fontFamily: 'Georgia, serif',
      fontSize: '24px',
      fontStyle: 'italic',
      fill: '#d8f3dc'
    }).setOrigin(0.5);

    // Efeito de flutuação no título
    this.tweens.add({
      targets: [title, subtitle],
      y: '+=8',
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Sinopse da História
    const loreBox = this.add.rectangle(width / 2, 260, 680, 95, 0x0b2518, 0.85);
    loreBox.setStrokeStyle(2, 0x52b788);

    this.add.text(width / 2, 260, 
      'A floresta viva está sob o cerco das máquinas poluidoras da "Gears of Smog".\n' +
      'Assuma o controle de Kael, o Guardião Silvestre: colete as 10 Sementes Ancestrais,\n' +
      'purifique as fontes corrompidas e alcance o Grande Carvalho Sagrado!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fill: '#b7e4c7',
      align: 'center',
      lineSpacing: 5
    }).setOrigin(0.5);

    // Botão INICIAR JOGO
    const playBtn = this.createButton(width / 2, 380, 'JOGAR AGORA', 0x2d6a4f, 0x40916c, () => {
      window.soundFX.init();
      window.soundFX.startBGM();
      this.scene.start('GameScene');
    });

    // Botão CONTROLES E INSTRUÇÕES
    const controlsBtn = this.createButton(width / 2, 455, 'COMO JOGAR', 0x1b4332, 0x2d6a4f, () => {
      this.showInstructionsModal();
    });

    // Rodapé informativo
    this.add.text(width / 2, 555, 'Desenvolvido com Phaser 3 | Trabalho Prático de Engenharia de Software', {
      fontFamily: 'Courier New, monospace',
      fontSize: '13px',
      fill: '#74c69d'
    }).setOrigin(0.5);

    // Tecla de atalho direto para iniciar (Espaço ou Enter)
    this.input.keyboard.once('keydown-SPACE', () => {
      window.soundFX.init();
      window.soundFX.startBGM();
      this.scene.start('GameScene');
    });
    this.input.keyboard.once('keydown-ENTER', () => {
      window.soundFX.init();
      window.soundFX.startBGM();
      this.scene.start('GameScene');
    });
  }

  createButton(x, y, text, colorNorm, colorHover, callback) {
    const btn = this.add.container(x, y);
    const bg = this.add.rectangle(0, 0, 240, 50, colorNorm, 1).setStrokeStyle(2, 0x95d5b2);
    const label = this.add.text(0, 0, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#ffffff'
    }).setOrigin(0.5);

    btn.add([bg, label]);
    btn.setSize(240, 50);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerover', () => {
      bg.setFillStyle(colorHover);
      btn.setScale(1.05);
    });

    btn.on('pointerout', () => {
      bg.setFillStyle(colorNorm);
      btn.setScale(1.0);
    });

    btn.on('pointerdown', () => {
      btn.setScale(0.97);
      if (callback) callback();
    });

    return btn;
  }

  showInstructionsModal() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const modalGroup = this.add.group();

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
      .setInteractive();
    
    const panel = this.add.rectangle(width / 2, height / 2, 560, 390, 0x081c15, 0.95)
      .setStrokeStyle(3, 0x74c69d);

    const mTitle = this.add.text(width / 2, height / 2 - 150, 'GUIA DO GUARDIÃO', {
      fontFamily: 'Trebuchet MS, sans-serif',
      fontSize: '26px',
      fontStyle: 'bold',
      fill: '#52b788'
    }).setOrigin(0.5);

    const instructions = this.add.text(width / 2, height / 2 - 10,
      '🎮 CONTROLES:\n' +
      ' • [A] / [D] ou [SETAS ESQ/DIR]: Movimentar Kael\n' +
      ' • [W], [SETA CIMA] ou [ESPAÇO]: Pular\n' +
      ' • [PULO NO AR]: Pulo duplo místico\n' +
      ' • [SEGURAR PULO AO CAIR]: Planar suavemente com as asas de folha!\n\n' +
      '✨ OBJETIVOS E PONTUAÇÃO:\n' +
      ' • Colete 10 Sementes Ancestrais (+150 pts cada)\n' +
      ' • Purifique as Fontes tocando nelas (+500 pts cada & Checkpoint)\n' +
      ' • Elimine Drones e Robôs saltando sobre suas cabeças (+200 pts)\n' +
      ' • Evite resíduos tóxicos e abismos!', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '15px',
      fill: '#d8f3dc',
      lineSpacing: 6
    }).setOrigin(0.5);

    const closeBtn = this.createButton(width / 2, height / 2 + 140, 'ENTENDI', 0x2d6a4f, 0x40916c, () => {
      overlay.destroy();
      panel.destroy();
      mTitle.destroy();
      instructions.destroy();
      closeBtn.destroy();
    });

    modalGroup.addMultiple([overlay, panel, mTitle, instructions, closeBtn]);
  }
}

window.MenuScene = MenuScene;
