# Eco-Runner: O Guardião da Floresta Ancestral 🍃

![Phaser 3](https://img.shields.io/badge/Phaser-3.80.1-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![HTML5](https://img.shields.io/badge/HTML5-Game-orange)
![Status](https://img.shields.io/badge/Status-Concluído-success)

> **Projeto Prático da Disciplina**  
> **Grupo 02 — Jogo de Plataforma 2D com Phaser JS**  
> **Professor:** [Christien Rachid](https://github.com/christienrachid)  
> **Prazo:** 23/11/2026 | **Apresentação:** 24 e 25/11/2026

---

## 🎮 1. Nome e Descrição Geral

* **Título:** Eco-Runner: O Guardião da Floresta
* **Gênero:** Plataforma 2D de Ação e Conscientização Ecológica
* **Engine:** Phaser 3 (Arcade Physics)

### Enredo
As raízes do Grande Carvalho Ancestral mantinham o equilíbrio de um ecossistema milenar até a invasão da corporação mecanizada **"Gears of Smog"**. Com máquinas de fuligem e drones cortadores, eles começaram a drenar a seiva viva da floresta, deixando para trás resíduos tóxicos e destruição.

O jogador assume o manto de **Kael, o Guardião Silvestre**, uma entidade elemental nascida do coração da mata. Sua missão é atravessar os setores corrompidos da floresta, resgatar as **10 Sementes Ancestrais**, purificar as **Fontes Sagradas de Seiva** e alcançar o portal do Carvalho Sagrado para restaurar a vida verde.

### Objetivos do Jogador
1. **Sobrevivência:** Atravessar a floresta superando plataformas móveis, desfiladeiros de vento e poços de resíduos tóxicos.
2. **Resgate:** Coletar todas as 10 Sementes Ancestrais espalhadas pela fase.
3. **Purificação:** Ativar e purificar as 2 Fontes de Seiva sagradas (que também funcionam como *checkpoints*).
4. **Desativação Mecânica:** Neutralizar drones cortadores e robôs de fumaça saltando sobre eles.
5. **Vitória:** Alcançar o portal no final do percurso para salvar a floresta.

---

## 🕹️ 2. Mecânicas e Controles

| Ação | Teclas | Descrição |
| :--- | :--- | :--- |
| **Mover para a Esquerda** | `A` ou `◀` | Move Kael para a esquerda com animação de corrida e partículas. |
| **Mover para a Direita** | `D` ou `▶` | Move Kael para a direita. |
| **Pular** | `W`, `▲` ou `Espaço` | Salto vertical com física suave. |
| **Pulo Duplo** | Apertar Pulo no ar | Impulso místico adicional para atingir plataformas altas. |
| **Planar (Glide)** | **Segurar Pulo** ao cair | Abre as asas de folhas, desacelerando a queda (`terminal velocity = 80`) para cruzar longos abismos. |
| **Combate** | Pular em cima de inimigos | Elimina robôs e drones mecânicos, concedendo pontos e impulso para cima. |
| **Áudio / Mute** | Botão no HUD (`🔊 Som`) | Liga ou desliga efeitos sonoros e música sem pausar a ação. |

---

## 🛠️ 3. Ferramentas e Tecnologias Utilizadas

* **Linguagem:** JavaScript (ES6+ modular).
* **Framework de Jogos:** [Phaser 3](https://phaser.io/) (v3.80.1 via CDN oficial).
* **Física:** Phaser Arcade Physics (gravidade, colisões, atrito, impulsos e detecção de sobreposição).
* **Áudio:** Web Audio API nativa com sintetizador procedural (sem dependência de links externos ou problemas de CORS).
* **Gráficos e Sprites:** Gerador procedural em HTML5 Canvas, garantindo que o jogo rode em qualquer máquina de forma 100% autônoma.
* **Hospedagem:** GitHub Pages (acesso direto via navegador).

---

## 🚀 4. Instruções de Instalação e Execução

### Opção A: Jogar Online (Recomendado para Avaliação e Apresentação)
* Acesse o link oficial no GitHub Pages:  
  👉 **`https://<usuario-ou-organizacao>.github.io/<nome-do-repositorio>/`**  
  *(Substitua pelos dados reais do repositório após a publicação)*.

### Opção B: Execução Local no Computador
1. Clone este repositório:
   ```bash
   git clone https://github.com/<seu-usuario>/<nome-do-repositorio>.git
   cd <nome-do-repositorio>
   ```
2. **Método 1 (Extensão Live Server no VS Code):**
   * Abra a pasta no VS Code.
   * Clique com o botão direito em `index.html` e selecione **"Open with Live Server"**.
3. **Método 2 (Python HTTP Server):**
   ```bash
   python3 -m http.server 8000
   ```
   * Acesse no navegador: `http://localhost:8000`
4. **Método 3 (Navegador Direto):**
   * Dê um duplo clique no arquivo `index.html` para abrir diretamente no Google Chrome, Edge ou Firefox.

---

## 📁 5. Estrutura do Repositório

```text
├── index.html              # Página principal e montagem do canvas do jogo
├── style.css               # Estilização responsiva e tema visual do contêiner
├── README.md               # Documentação completa do projeto
└── src/
    ├── main.js             # Ponto de entrada e configuração do Phaser.Game
    ├── audio.js            # Sintetizador procedural de efeitos sonoros e BGM
    ├── textures.js         # Gerador de sprites e texturas em tempo de execução
    └── scenes/
        ├── BootScene.js    # Carregamento inicial de recursos e barra de progresso
        ├── MenuScene.js    # Tela inicial com história, botões e guia de controles
        ├── GameScene.js    # Lógica principal, física, câmera, HUD e mecânicas
        ├── GameOverScene.js# Tela de derrota com pontuação e reinício
        └── VictoryScene.js # Tela de vitória com relatório de tempo e sementes
```

---

## 👥 6. Integrantes do Grupo 02

* **Integrante 1:** [Nome Completo] - *Game Design e Level Design*
* **Integrante 2:** [Nome Completo] - *Física e Mecânicas do Jogador (Pulo/Planar)*
* **Integrante 3:** [Nome Completo] - *Inimigos, Inteligência Artificial e HUD*
* **Integrante 4:** [Nome Completo] - *Documentação, Áudio e Publicação no GitHub*

---
