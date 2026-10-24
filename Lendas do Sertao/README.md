# 🔥 Lendas do Sertão

> Capture, treine e enfrente a Cuca! Um RPG de captura de criaturas com batalhas por turnos, inspirado no folclore brasileiro.

**Disciplina:** Jogos Digitais — Atividade "Jogo Final"
**Ferramenta:** [Phaser 3](https://phaser.io/) (JavaScript)
**Integrantes:** _(preencher: Nome 1, Nome 2, Nome 3, Nome 4)_

---

## 📖 Descrição geral (enredo e objetivos)

O sertão está sob o domínio da **Cuca**, a bruxa-jacaré que prende as lendas do folclore em um portal sombrio.
Você é um jovem caçador de lendas que recebe um parceiro (**Boitatá**, **Curupira** ou **Iara**) e parte em uma jornada para:

1. **Explorar** o mapa e encontrar lendas selvagens na grama alta.
2. **Batalhar** por turnos, explorando vantagens de tipo (Fogo > Planta > Água > Fogo).
3. **Capturar** novas lendas com cápsulas (Saci, Lobisomem, Mapinguari, Boto, Mula e outras).
4. **Evoluir** a equipe até o nível 8 e **derrotar a Cuca** no portal ao norte do mapa.

### Mecânicas principais
- Exploração em grade com grama alta que dispara encontros aleatórios.
- Batalha por turnos: Atacar, Capturar, Equipe (trocar) e Fugir.
- Sistema de tipos (Fogo, Água, Planta, Comum, Sombra) com golpes super efetivos / pouco efetivos e golpes críticos.
- Captura: quanto menor a vida da criatura, maior a chance.
- XP e níveis (a equipe toda ganha experiência; quem lutou ganha mais).
- Fogueira que cura a equipe e reabastece as cápsulas.
- Chefe final com música própria. Se a equipe cair, você volta à fogueira sem perder o progresso.

### Originalidade
Todas as criaturas, o mundo, a história, a arte e o áudio são **originais**: as criaturas vêm do folclore brasileiro, a arte é desenhada por código (Phaser Graphics → texturas) e a música e os efeitos sonoros são gerados pela Web Audio API. O projeto **não usa** nenhum asset, nome ou personagem de franquias comerciais.

---

## 🎮 Controles

| Ação | Tecla |
|---|---|
| Mover | Setas ou W A S D |
| Navegar nos menus | Setas / mouse |
| Confirmar | Enter / Espaço / clique |
| Voltar (submenus) | Esc / Backspace |
| Ligar/desligar som | M |

---

## 🛠️ Instalação e execução

O jogo é 100% estático (HTML + JavaScript). O Phaser é carregado por CDN, então é necessário **internet** na primeira execução.

### Opção 1 — Abrir direto
Dê dois cliques em `index.html`. (Funciona na maioria dos navegadores.)

### Opção 2 — Servidor local (recomendado)
Dentro da pasta do projeto, use **um** dos comandos:

```bash
# Python
python -m http.server 8080

# ou Node.js
npx http-server -p 8080
```

Depois abra <http://localhost:8080> no navegador.

### Opção 3 — Jogar online (GitHub Pages)
1. No repositório: **Settings → Pages**.
2. Em *Build and deployment*, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Aguarde alguns minutos e o link jogável aparecerá no mesmo painel.
4. Cole o link aqui: **▶ Link jogável:** _(preencher)_

### Rodar offline (opcional)
Baixe `phaser.min.js` (versão 3.80.1) para a pasta `lib/` e troque no `index.html` a linha do `<script src="https://cdn.jsdelivr.net/...">` por `<script src="lib/phaser.min.js">`.

---

## 📸 Capturas de tela

```md
![Menu](docs/screenshots/menu.png)
![Exploração](docs/screenshots/mundo.png)
![Batalha](docs/screenshots/batalha.png)
![Chefe](docs/screenshots/chefe.png)
```

---

## 🗂️ Estrutura do projeto

```
lendas-do-sertao/
├── index.html
├── README.md
├── docs/
│   ├── ROTEIRO_APRESENTACAO.md
│   └── screenshots/
└── src/
    ├── main.js                 # configuração do Phaser
    ├── data/
    │   ├── creatures.js        # criaturas, golpes, tipos, XP
    │   ├── state.js            # estado global (equipe, cápsulas, progresso)
    │   └── map.js              # geração do mapa
    ├── systems/
    │   ├── audio.js            # música e efeitos (Web Audio)
    │   └── textures.js         # arte desenhada por código
    └── scenes/
        ├── BootScene.js        # gera as texturas
        ├── MenuScene.js        # tela inicial
        ├── StarterScene.js     # escolha do parceiro
        ├── WorldScene.js       # exploração
        ├── BattleScene.js      # batalha por turnos
        └── EndScenes.js        # game over e vitória
```

### Recursos do Phaser utilizados
`Scene` (7 cenas), `Graphics` + `generateTexture`, `Tweens` (movimento, animações de batalha, HP), `Camera` (follow, bounds, fade, flash, shake), `Input` (teclado e mouse), `Time` (delayedCall), `Scale` (FIT), `Math`/`Utils` e comunicação entre cenas (`pause`, `launch`, `resume`).

---

## 👥 Divisão de tarefas

| Integrante | Responsabilidade |
|---|---|
| _(Nome 1)_ | Exploração: mapa, movimentação, câmera |
| _(Nome 2)_ | Batalha: turnos, tipos, captura |
| _(Nome 3)_ | Arte, interface, áudio e menus |
| _(Nome 4)_ | Dados das criaturas, balanceamento, README e GitHub |

---

## 🧩 Créditos
- Engine: [Phaser 3](https://phaser.io/) (licença MIT).
- Folclore brasileiro: Boitatá, Curupira, Iara, Saci, Lobisomem, Mapinguari, Boto, Mula-sem-cabeça e Cuca (domínio público/cultura popular).
- Arte e áudio: criados por código pelo grupo.
