# Pixel Mind
# 🎮 Monster Hunter
**Disciplina: Desenvolvimento de Jogos Digitais**

<div align="center">

<p align="center">
  <img src="https://img.shields.io/badge/Disciplina-Desenvolvimento%20de%20Jogos%20Digitais-blue.svg" alt="Disciplina"/>
  <img src="https://img.shields.io/badge/Framework-Phaser-8b5cf6.svg" alt="Phaser"/>
  <img src="https://img.shields.io/badge/Projeto-Jogo%202D-6f42c1.svg" alt="Jogo 2D"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-Phaser%203-ff69b4.svg" alt="Phaser 3"/>
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg?logo=javascript&logoColor=black" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/HTML5-Canvas-E34F26.svg?logo=html5&logoColor=white" alt="HTML5"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"/>
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow.svg" alt="Status"/>
</p>

*Jogo 2D desenvolvido com o framework Phaser como projeto da disciplina de Desenvolvimento de Jogos Digitais*

[📖 Documentação](docs/) · [🖼️ Capturas de Tela](#capturas-de-tela) · [🚀 Como Jogar](#como-jogar) · [🤝 Equipe](#equipe)

</div>

---

## 📋 Índice

- [Visão Geral](#visao-geral)
- [Enredo e Objetivos](#enredo-e-objetivos)
- [Como Jogar](#como-jogar)
- [Ferramentas e Tecnologias](#ferramentas-e-tecnologias)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Instalação e Execução](#instalação-e-execução)
- [Capturas de Tela e Demonstração](#capturas-de-tela)
- [Contribuindo](#contribuindo)
- [Roadmap](#roadmap)
- [Licença](#licença)
- [Equipe](#equipe)
- [Contato](#contato)

---

<a id="visao-geral"></a>
## 🧠 Visão Geral

**Monster Hunter** é um jogo 2D desenvolvido no âmbito da disciplina de **Desenvolvimento de Jogos Digitais**, utilizando o framework **[Phaser](https://phaser.io/)** para a construção da lógica, física, animações e interações do jogo.

O projeto tem como objetivo construir, de forma incremental, um jogo completo de exploração, batalhas por turnos, gerenciamento de monstros, itens, progressão e narrativa. A implementação é organizada em etapas, começando pela infraestrutura básica do jogo e evoluindo para sistemas de batalha, tela de título, salvamento, carregamento e exploração do mundo.

Este repositório reúne todo o código-fonte, os assets (sprites, sons e cenários) e a documentação necessária para compreender, instalar e executar o jogo.

> **Status:** Em desenvolvimento 🚧

### Contexto

Este projeto foi desenvolvido como trabalho avaliativo, aplicando na prática os conceitos estudados em sala de aula sobre:

- ✅ **Game loop e ciclo de vida de cenas (scenes)**
- ✅ **Física e colisões 2D (Arcade Physics)**
- ✅ **Sprites, animações e spritesheets**
- ✅ **Entrada do jogador (teclado, mouse, touch)**
- ✅ **Sistema de pontuação, vidas e progressão de fases**

### Diferenciais

- 🎨 **Arte e trilha sonora originais/adaptadas** para compor a atmosfera do jogo
- 🧩 **Múltiplas fases/níveis** com dificuldade progressiva
- 🕹️ **Controles responsivos**, testados em desktop *(e mobile, se aplicável)*
- 📚 **Documentação clara** para instalação, execução e entendimento do código
- 🤝 **Desenvolvimento colaborativo em grupo**, com uso de Git/GitHub

---

<a id="enredo-e-objetivos"></a>
## 📖 Enredo e Objetivos

*(Descreva aqui o enredo/contexto do jogo.)*

> **Exemplo:** Em um mundo onde a energia está acabando, o jogador controla um pequeno robô explorador que precisa atravessar fases repletas de obstáculos e inimigos para coletar cristais de energia e restaurar a luz do planeta.

### 🎯 Objetivos do Jogador

<table>
  <tr>
    <td width="50%">
      <h4>🏁 Objetivo Principal</h4>
      <p>Concluir todas as fases do jogo, superando obstáculos e desafios até alcançar o final.</p>
    </td>
    <td width="50%">
      <h4>💎 Objetivos Secundários</h4>
      <p>Coletar itens/pontos ao longo do caminho e alcançar a maior pontuação possível.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h4>❤️ Sobrevivência</h4>
      <p>Evitar inimigos e armadilhas, gerenciando as vidas disponíveis.</p>
    </td>
    <td width="50%">
      <h4>🏆 Progressão</h4>
      <p>Avançar de fase em fase, com dificuldade crescente.</p>
    </td>
  </tr>
</table>

---

<a id="como-jogar"></a>
## 🕹️ Como Jogar

| Ação | Tecla / Controle |
|---|---|
| Mover para esquerda | ← ou A |
| Mover para direita | → ou D |
| Pular | Espaço ou W |
| Atacar / Interagir | Z ou Botão do mouse |
| Pausar | ESC |
| Reiniciar fase | R |

---

<a id="ferramentas-e-tecnologias"></a>
## ⚙️ Ferramentas e Tecnologias

### Stack Tecnológico

<div align="center">

| **🎮 Framework** | **💻 Linguagens** | **🎨 Assets** | **🛠️ Ferramentas** |
|:---:|:---:|:---:|:---:|
| [Phaser 3](https://phaser.io/) | JavaScript (ES6+) | Sprites / Spritesheets | VS Code |
| — | HTML5 | Tilemaps (Tiled) | Node.js / npm |
| — | CSS3 | Áudio (efeitos e trilha) | Git / GitHub |

</div>

### Ferramentas de Desenvolvimento

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

<a id="estrutura-do-repositório"></a>
## 🧱 Estrutura do Repositório

```
nome-do-jogo/
│
├── 📁 src/                         # Código-fonte do jogo
│   ├── scenes/                     # Cenas do Phaser
│   │   ├── BootScene.js            # Carregamento inicial de assets
│   │   ├── MenuScene.js            # Menu principal
│   │   ├── GameScene.js            # Cena principal do jogo
│   │   └── GameOverScene.js        # Tela de fim de jogo
│   ├── objects/                    # Classes de entidades (player, inimigos, itens)
│   ├── utils/                      # Funções utilitárias
│   └── main.js                     # Configuração principal do Phaser (config, dimensões, física)
│
├── 📁 assets/                      # Recursos do jogo
│   ├── sprites/                    # Spritesheets e imagens
│   ├── audio/                      # Músicas e efeitos sonoros
│   ├── tilemaps/                   # Mapas de fase
│   └── screenshots/                # Capturas de tela e GIFs para o README
│
├── 📁 docs/                        # Documentação adicional
│
├── 📄 index.html                   # Ponto de entrada do jogo
├── 📄 package.json                 # Dependências e scripts
├── 📄 LICENSE                      # Licença do projeto
└── 📄 README.md                    # Este arquivo
```

---

<a id="instalação-e-execução"></a>
## 🚀 Instalação e Execução

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

| Ferramenta | Versão Mínima | Instalação |
|---|---|---|
| **Node.js** | `>= 18.0` | [nodejs.org](https://nodejs.org/) |
| **npm** | `>= 9.0` | Instalado junto com o Node.js |
| **Navegador atualizado** | Chrome, Firefox ou Edge | — |
| **Git** | Qualquer versão recente | [git-scm.com](https://git-scm.com/) |

### Instalação Rápida

**1. Clone o repositório**
```bash
git clone https://github.com/usuario/nome-do-jogo.git
cd nome-do-jogo
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

> 💡 Caso o projeto não utilize um bundler (Vite/Webpack), basta abrir o arquivo `index.html` diretamente no navegador ou servir a pasta com uma extensão como *Live Server* (VS Code).

**4. Build para produção** *(se aplicável)*
```bash
npm run build
```
Os arquivos finais serão gerados na pasta `dist/`.

### Verificação da Instalação

Após executar `npm run dev`, o jogo deve carregar o menu principal automaticamente no navegador. Se a tela ficar em branco, verifique o console do navegador (F12) para mensagens de erro.

---

<a id="capturas-de-tela"></a>
## 🖼️ Capturas de Tela e Demonstração

*(Insira aqui imagens ou GIFs do jogo em funcionamento. Salve as mídias na pasta `assets/screenshots/` e referencie os caminhos abaixo.)*

| Tela Inicial | Gameplay | Game Over |
|---|---|---|
| ![Tela inicial](assets/screenshots/menu.png) | ![Gameplay](assets/screenshots/gameplay.gif) | ![Game Over](assets/screenshots/gameover.png) |

**[🎥 Vídeo de demonstração completo →](#)** *(link opcional para YouTube/Drive)*

---

<a id="contribuindo"></a>
## 🤝 Contribuindo

Contribuições dos integrantes do grupo devem seguir um fluxo organizado de Git para facilitar o trabalho colaborativo.

### Como Contribuir

1. **Clone o projeto**
   ```bash
   git clone https://github.com/usuario/nome-do-jogo.git
   ```
2. **Crie uma branch**
   ```bash
   git checkout -b feature/NomeDaFuncionalidade
   ```
3. **Faça suas alterações**
   - Siga os padrões de código do projeto
   - Teste as alterações antes de subir
   - Atualize a documentação, se necessário
4. **Commit semântico**
   ```bash
   git commit -m 'feat: adiciona sistema de pontuação'
   ```
5. **Push e Pull Request**
   ```bash
   git push origin feature/NomeDaFuncionalidade
   ```

### Padrões de Commit

| Prefixo | Uso |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `art` | Assets visuais/sonoros |
| `refactor` | Refatoração de código |
| `chore` | Manutenção geral |

---

<a id="roadmap"></a>
## 🗺️ Roadmap

** Etapa 1 — Setup do Projeto **
- [x] Definição do enredo e mecânicas principais
- [x] Criar página HTML básica
- [x] Configuração do projeto com Phaser
- [x] Criar instância básica do jogo
- [x] Configurar JavaScript Config para Phaser

** Etapa 2 — Jogo Assets Projeto**
- [x] Adicionar assets do projeto
- [x] Documentar fontes dos assets

** Etapa 3 — Sistema de Batalha**
- [ ] Carregar assets do jogo
- [ ] Criar layouts de Cena de Batalha
- [ ] Criar menu de diálogo
- [ ] Criar menu de opções
- [ ] Criar lista de ataques
- [ ] Implementar entrada do jogador
- [ ] Separar lógica em componentes
- [ ] Criar componente de vida
- [ ] Criar compoentes de monstro
- [ ] Implementar lógica básica de ataques
- [ ] Implementar dano
- [ ] Implementar nocaute
- [ ] Projetar máquina de estados
- [ ] Implementar estados de batalha
- [ ] Implementar estado de item
- [ ] Implementar estado de fuga
- [ ] Implementar estado de monstro
- [ ] Adicionar animações de texto
- [ ] Adicionar animações de monstros
- [ ] Adicionar animações de ataques
- [ ] Adicionar transições de cena

** Etapa 4 - Ferramentas de Desenvolvimento **
- [ ] Integrar Tweakpane
- [ ] Ajustar posicionamento de objetos
- [ ] Testar ataques
- [ ] Testar animações

** Etapa 5 - Tela de Titulo **
- [ ] Criar tela de título
- [ ] Criar menu de opções
- [ ] Implementar salvamento das opções
- [ ] Implementar carregamento das oções
- [ ] Integrar opções com a Battle Scene

** Etapa 6 - Mapa **
- [ ] Criar World Scene
- [ ] Implementar movimentação
- [ ] Implementar mapas
- [ ] Implementar colisões
- [ ] Implementar interação
- [ ] Integrar exploração e batalhas
- [ ] Expandir o mundo do jogo

> As tarefas de World Scene ainda estão em fase de planejamento e serão detalhadas conforme o desenvolvimento avançar.  
---

<a id="licença"></a>
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
    <td align="center">
      <sub><b>Luiz Fernando Pereira</b></sub><br>
      <sub>🎮 Programação (Game Logic)</sub><br>
      <a href="">GitHub</a> · <a href="">LinkedIn</a>
    </td>
    <td align="center">
      <sub><b>Tadeu Furtado Henriques</b></sub><br>
      <sub>🎨 Arte / Design</sub><br>
      <a href="">GitHub</a> · <a href="">LinkedIn</a>
    </td>
    <td align="center">
      <sub><b>Nome do Integrante 3</b></sub><br>
      <sub>🧩 Level Design / QA</sub><br>
      <a href="">GitHub</a> · <a href="">LinkedIn</a>
    </td>
  </tr>
</table>

### Orientação Acadêmica

| | |
|---|---|
| **Disciplina** | Desenvolvimento de Jogos Digitais |
| **Professor(a)** | *Christien Lana* |
| **Instituição** | *Centro Universitário - UniAcademia* |

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

Em caso de dúvidas sobre este projeto, entre em contato com qualquer integrante do grupo listado na seção [Equipe](#equipe).

---

<div align="center">

**Desenvolvido com 🎮 e ☕ pela equipe [Nome do Grupo]**

⭐ **Se este projeto foi útil, considere dar uma estrela!**

</div>
