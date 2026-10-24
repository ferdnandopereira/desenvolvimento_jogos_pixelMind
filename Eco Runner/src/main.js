window.addEventListener('load', () => {
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#081c15',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 850 },
        debug: false
      }
    },
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
      window.BootScene,
      window.MenuScene,
      window.GameScene,
      window.GameOverScene,
      window.VictoryScene
    ]
  };

  const game = new Phaser.Game(config);
});
