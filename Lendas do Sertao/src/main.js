// Ponto de entrada do jogo: configura o Phaser e registra as cenas.
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#101018',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MenuScene, StarterScene, WorldScene, BattleScene, GameOverScene, VictoryScene]
};

new Phaser.Game(config);
