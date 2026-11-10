# 🎮 Pixel Mind
**Disciplina: Desenvolvimento de Jogos Digitais**

<div align="center">

<p align="center">
  <img src="https://img.shields.io/badge/Disciplina-Desenvolvimento%20de%20Jogos%20Digitais-blue.svg" alt="Disciplina"/>
  <img src="https://img.shields.io/badge/Institui%C3%A7%C3%A3o-UniAcademia-1f6feb.svg" alt="UniAcademia"/>
  <img src="https://img.shields.io/badge/Jogos-2D%20%26%203D-6f42c1.svg" alt="Jogos 2D e 3D"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Phaser%203-ff69b4.svg" alt="Phaser 3"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg?logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/HTML5-Canvas-E34F26.svg?logo=html5&logoColor=white" alt="HTML5"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg" alt="Status"/>
</p>

*Estudo dos conceitos e técnicas de desenvolvimento de jogos digitais: programação, animações, sprites, interação com o jogador, colisões, engines e ferramentas*

[🎯 Objetivos](#objetivos) · [📚 Conteúdos](#conteudos) · [🛠️ Ferramentas](#ferramentas) · [🤝 Equipe](#equipe)

</div>

---

## 📋 Índice

- [Visão Geral](#visao-geral)
- [Objetivos da Disciplina](#objetivos)
- [Conteúdos Estudados](#conteudos)
- [Ferramentas e Tecnologias](#ferramentas)
- [Estrutura do Repositório](#estrutura)
- [Ambiente de Desenvolvimento](#ambiente)
- [Roadmap de Estudos](#roadmap)
- [Contribuindo](#contribuindo)
- [Licença](#licenca)
- [Equipe](#equipe)
- [Contato](#contato)

---

<a id="visao-geral"></a>
## 🧠 Visão Geral

Este repositório reúne os estudos, exercícios e implementações práticas da equipe **Pixel Mind** na disciplina de **Desenvolvimento de Jogos Digitais**, do **Centro Universitário UniAcademia**.

A disciplina tem como foco o estudo dos **conceitos e técnicas relacionados ao desenvolvimento de jogos**, abrangendo jogos **2D e 3D**, programação, animações, sprites, interação com o jogador, detecção de colisões e a utilização de engines e ferramentas de desenvolvimento.

Como framework principal de prática, utilizamos o **[Phaser](https://phaser.io/)**, que permite aplicar os conceitos da disciplina na construção de jogos 2D para a web.

> **Status:** Em desenvolvimento 🚧

---

<a id="objetivos"></a>
## 🎯 Objetivos da Disciplina

<table>
  <tr>
    <td width="50%">
      <h4>🧩 Fundamentos de Jogos</h4>
      <p>Compreender a arquitetura de um jogo digital: game loop, cenas, estados e ciclo de vida dos objetos.</p>
    </td>
    <td width="50%">
      <h4>💻 Programação de Jogos</h4>
      <p>Aplicar lógica de programação na implementação de mecânicas, regras e comportamentos.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>🎨 Arte e Animação</h4>
      <p>Trabalhar com sprites, spritesheets e animações para dar vida a personagens e cenários.</p>
    </td>
    <td width="50%">
      <h4>🕹️ Interação e Física</h4>
      <p>Implementar entrada do jogador e detecção de colisões, com resposta física entre os objetos.</p>
    </td>
  </tr>
</table>

---

<a id="conteudos"></a>
## 📚 Conteúdos Estudados

| Tema | O que é estudado |
|---|---|
| **Jogos 2D e 3D** | Diferenças de abordagem, sistemas de coordenadas, câmeras e renderização |
| **Programação** | Game loop, cenas, estados do jogo e organização do código em componentes |
| **Sprites** | Imagens, spritesheets, atlas de texturas e gerenciamento de assets |
| **Animações** | Animação quadro a quadro, transições e efeitos visuais |
| **Interação com o jogador** | Teclado, mouse, toque e feedback visual/sonoro |
| **Detecção de colisões** | Colisões entre objetos, áreas de sobreposição e física 2D |
| **Engines e ferramentas** | Uso de frameworks/engines, editores de mapas e ferramentas de arte e áudio |

---

<a id="ferramentas"></a>
## ⚙️ Ferramentas e Tecnologias

### Stack Tecnológico

<div align="center">

| **🎮 Framework** | **💻 Linguagens** | **🎨 Assets** | **🛠️ Ferramentas** |
|:---:|:---:|:---:|:---:|
| [Phaser 3](https://phaser.io/) | JavaScript (ES6+) | Sprites / Spritesheets | VS Code |
| — | HTML5 | Tilemaps (Tiled) | Node.js / npm |
| — | CSS3 | Áudio (efeitos e trilha) | Git / GitHub |

</div>

### Ferramentas de Apoio

<table>
  <tr>
    <td align="center" width="25%">
      <b>🧩 Level Design</b><br><br>
      • Tiled Map Editor<br>
      • Phaser Tilemaps
    </td>
    <td align="center" width="25%">
      <b>🎨 Arte</b><br><br>
      • Aseprite<br>
      • Piskel<br>
      • Figma
    </td>
    <td align="center" width="25%">
      <b>🔊 Áudio</b><br><br>
      • Bfxr / Sfxr<br>
      • Audacity
    </td>
    <td align="center" width="25%">
      <b>🔄 Versionamento</b><br><br>
      • Git<br>
      • GitHub<br>
      • GitHub Projects
    </td>
  </tr>
</table>

---

<a id="estrutura"></a>
## 🧱 Estrutura do Repositório

```
pixel-mind/
│
├── 📁 exercicios/                  # Exercícios e experimentos por tema
│   ├── 01-fundamentos/             # Game loop, cenas e configuração do Phaser
│   ├── 02-sprites-animacoes/       # Sprites, spritesheets e animações
│   ├── 03-interacao/               # Entrada do jogador (teclado, mouse, toque)
│   └── 04-colisoes-fisica/         # Colisões e física 2D
│
├── 📁 assets/                      # Recursos utilizados nos exercícios
│   ├── sprites/                    # Spritesheets e imagens
│   ├── audio/                      # Músicas e efeitos sonoros
│   └── tilemaps/                   # Mapas
│
├── 📁 docs/                        # Anotações e material de estudo
│
├── 📄 index.html                   # Ponto de entrada
├── 📄 package.json                 # Dependências e scripts
├── 📄 LICENSE                      # Licença do projeto
└── 📄 README.md                    # Este arquivo
```

---

<a id="ambiente"></a>
## 🚀 Ambiente de Desenvolvimento

### Pré-requisitos

| Ferramenta | Versão Mínima | Instalação |
|---|---|---|
| **Node.js** | `>= 18.0` | [nodejs.org](https://nodejs.org/) |
| **npm** | `>= 9.0` | Instalado junto com o Node.js |
| **Git** | Qualquer versão recente | [git-scm.com](https://git-scm.com/) |
| **Navegador atualizado** | Chrome, Firefox ou Edge | — |

### Instalação e Execução

**1. Clone o repositório**
```bash
git clone https://github.com/usuario/pixel-mind.git
cd pixel-mind
```

**2. Instale as dependências**
```bash
npm install
```

**3. Execute em modo de desenvolvimento**
```bash
npm run dev
```
Abra o navegador no endereço indicado no terminal (geralmente `http://localhost:8080` ou `http://localhost:5173`).

> 💡 Se o projeto não utilizar um bundler (Vite/Webpack), basta abrir o `index.html` no navegador ou servir a pasta com a extensão *Live Server* do VS Code.

Se a tela ficar em branco, verifique o console do navegador (F12) para mensagens de erro.

---

<a id="roadmap"></a>
## 🗺️ Roadmap de Estudos

**Etapa 1 — Fundamentos**
- [x] Conceitos de jogos digitais, 2D e 3D
- [x] Game loop e ciclo de vida de cenas
- [x] Configuração de um projeto com Phaser

**Etapa 2 — Sprites e Animações**
- [x] Carregamento e gerenciamento de assets
- [x] Sprites e spritesheets
- [ ] Animações de personagens e objetos

**Etapa 3 — Interação com o Jogador**
- [x] Entrada por teclado e mouse
- [x] Movimentação de personagens
- [ ] Feedback visual e sonoro

**Etapa 4 — Colisões e Física**
- [x] Detecção de colisões
- [x] Física 2D (Arcade Physics)
- [ ] Regras de interação entre objetos

**Etapa 5 — Engines e Ferramentas**
- [ ] Comparativo entre engines e frameworks
- [ ] Editores de mapas e ferramentas de arte e áudio
- [ ] Introdução ao desenvolvimento 3D

---

<a id="contribuindo"></a>
## 🤝 Contribuindo

Os integrantes da equipe seguem um fluxo organizado de Git para o trabalho colaborativo:

1. Crie uma branch: `git checkout -b feature/NomeDaFuncionalidade`
2. Faça as alterações e teste antes de subir
3. Commit semântico: `git commit -m 'feat: adiciona exemplo de colisão'`
4. Envie e abra um Pull Request: `git push origin feature/NomeDaFuncionalidade`

| Prefixo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `art` | Assets visuais/sonoros |
| `refactor` | Refatoração de código |
| `chore` | Manutenção geral |

---

<a id="licenca"></a>
## 📄 Licença

Este projeto é de uso acadêmico, desenvolvido para a disciplina de **Desenvolvimento de Jogos Digitais**, e está licenciado sob a **Licença MIT** — veja o arquivo [LICENSE](LICENSE) para detalhes completos.

- ✅ Uso educacional e não comercial
- ✅ Modificação e distribuição
- ⚠️ Sem garantias

---

<a id="equipe"></a>
## 👥 Equipe

<table>
  <tr>
    <td align="center" width="25%">
      <sub><b>Silvia Debussi de Paiva</b></sub><br>
      <a href="https://github.com/silviaDebussii">GitHub</a> · <a href="https://www.linkedin.com/in/silvia-debussi-5b1aa5232/">LinkedIn</a>
    </td>
    <td align="center" width="25%">
      <sub><b>Luiz Fernando Pereira</b></sub><br>
      <a href="https://github.com/ferdnandopereira">GitHub</a> · <a href="https://www.linkedin.com/in/luiz-fernando-pereira-software-engenheiro/">LinkedIn</a>
    </td>
    <td align="center" width="25%">
      <sub><b>Leornando de Souza Arrichette</b></sub><br>
      <a href="https://github.com/LArrichette">GitHub</a> · <a href="https://linkedin.com/in/usuario">LinkedIn</a>
    </td>
    <td align="center" width="25%">
      <sub><b>Tadeu Furtado Henriques</b></sub><br>
      <a href="https://github.com/usuario">GitHub</a> · <a href="https://linkedin.com/in/usuario">LinkedIn</a>
    </td>
  </tr>
</table>

### Orientação Acadêmica

| | |
|---|---|
| **Disciplina** | Desenvolvimento de Jogos Digitais |
| **Professor** | Christien Lana |
| **Instituição** | Centro Universitário UniAcademia |

---

## 📚 Recursos Adicionais

**Documentação oficial**
- [Documentação do Phaser](https://phaser.io/learn)
- [Phaser 3 API Docs](https://newdocs.phaser.io/docs/3.90.0)
- [Phaser Examples](https://phaser.io/examples)

**Comunidades**
- [Phaser Discord](https://discord.gg/phaser)
- [Phaser Forum](https://phaser.discourse.group/)

---

<a id="contato"></a>
## 📞 Contato

Em caso de dúvidas sobre este repositório, entre em contato com qualquer integrante da equipe listado na seção [Equipe](#equipe).

---

<div align="center">

**Desenvolvido com 🎮 e ☕ pela equipe Pixel Mind**

⭐ **Se este repositório foi útil, considere dar uma estrela!**

</div>
