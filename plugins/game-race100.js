import axios from 'axios';

class RaceTo100Game {
  constructor(sMsg) {
    this.sendMsg = sMsg;
    this.players = [];
    this.currentPositions = {};
    this.currentPlayerIndex = 0;
    this.targetScore = 100;
    this.started = false;
  }

  initializeGame() {
    this.players.forEach(player => (this.currentPositions[player] = 0));
    this.currentPlayerIndex = 0;
    this.started = true;
  }

  rollDice = () => Math.floor(Math.random() * 6) + 1;

  startGame = async (m, player1, player2) => {
    await m.reply(`🏁 *Race to 100 dimulai!* \n${this.formatPlayerName(player1)} *vs* ${this.formatPlayerName(player2)}`, null, {
      mentions: [player1, player2]
    });
    this.players = [player1, player2];
    this.initializeGame();
  };

  formatPlayerName = (player) => `@${player.split('@')[0]}`;

  playTurn = async (m, player) => {
    if (!this.players.length) return m.reply('🛑 Tidak ada permainan aktif.\nGunakan "!race100 start" untuk memulai permainan baru.');
    if (player !== this.players[this.currentPlayerIndex]) return m.reply(`🕒 Bukan giliranmu. Sekarang giliran ${this.formatPlayerName(this.players[this.currentPlayerIndex])}`, null, {
      mentions: [this.players[this.currentPlayerIndex]]
    });

    const diceRoll = this.rollDice();
    let currentPosition = this.currentPositions[player];
    let newPosition = currentPosition + diceRoll;

    if (newPosition > this.targetScore) {
      await m.reply(`🚫 ${this.formatPlayerName(player)} mendapat *${diceRoll}* dan melebihi 100. Tetap di kotak *${currentPosition}*.`);
    } else {
      this.currentPositions[player] = newPosition;
      await m.reply(`🎲 ${this.formatPlayerName(player)} mendapat *${diceRoll}*\nPindah dari kotak *${currentPosition}* ke kotak *${newPosition}*`);

      if (newPosition === this.targetScore) {
        await m.reply(`🎉 ${this.formatPlayerName(player)} mencapai 100 dan memenangkan permainan!`);
        this.resetGame();
        return;
      }
    }

    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
  };

  resetGame = () => {
    this.players = [];
    this.currentPositions = {};
    this.currentPlayerIndex = 0;
    this.started = false;
  };

  addPlayer = (player) => this.players.length < 2 && !this.players.includes(player) && player !== '' && (this.players.push(player), true);

  isGameStarted = () => this.started;
}

class RaceSession {
  constructor(id, sMsg) {
    this.id = id;
    this.players = [];
    this.game = new RaceTo100Game(sMsg);
  }
}

const handler = async (m, { conn, args }) => {
  const sessions = global.race100_sessions = global.race100_sessions || {};
  const sessionId = m.chat;

  // Ensure the session exists or create a new one
  if (!sessions[sessionId]) {
    sessions[sessionId] = new RaceSession(sessionId, conn);
  }
  
  const session = sessions[sessionId];
  const game = session.game;

  // Initialize the game state
  if (!global.race100) global.race100 = {};
  if (!global.race100[sessionId]) global.race100[sessionId] = { state: false };

  switch (args[0]) {
    case 'join':
      if (global.race100[sessionId].state) return m.reply('🛑 Permainan sudah dimulai. Tidak dapat bergabung.');
      const playerName = m.sender;
      const joinSuccess = game.addPlayer(playerName);
      joinSuccess ? m.reply(`👋 ${game.formatPlayerName(playerName)} bergabung dalam permainan.`) : m.reply('Anda sudah bergabung atau permainan sudah penuh.');
      break;

    case 'start':
      if (global.race100[sessionId].state) return m.reply('🛑 Permainan sudah dimulai. Tidak dapat memulai ulang.');
      global.race100[sessionId].state = true;
      if (game.players.length === 2) {
        await game.startGame(m, game.players[0], game.players[1]);
        return;
      } else {
        await m.reply('👥 Tidak cukup pemain untuk memulai permainan. Diperlukan minimal 2 pemain.');
        return;
      }
      break;

    case 'roll':
      if (!global.race100[sessionId].state) return m.reply('🛑 Permainan belum dimulai. Ketik "!race100 start" untuk memulai.');
      if (game.isGameStarted()) {
        const currentPlayer = game.players[game.currentPlayerIndex];
        if (m.sender !== currentPlayer) {
          await m.reply(`🕒 Bukan giliranmu. Sekarang giliran ${game.formatPlayerName(currentPlayer)}`, null, {
            mentions: [currentPlayer]
          });
          return;
        } else {
          await game.playTurn(m, currentPlayer);
          return;
        }
      } else {
        await m.reply('🛑 Permainan belum dimulai. Ketik "!race100 start" untuk memulai.');
        return;
      }
      break;

    case 'reset':
      global.race100[sessionId].state = false;
      session.game.resetGame();
      delete sessions[sessionId];
      await m.reply('🔄 Sesi permainan direset.');
      break;

    case 'help':
      await m.reply(`🏁 *Race to 100* 🏁\n\n*Commands:*\n- *!race100 join :* Bergabung ke dalam permainan.\n- *!race100 start :* Memulai permainan.\n- *!race100 roll :* Melempar dadu untuk bergerak.\n- *!race100 reset :* Mereset sesi permainan.`);
      break;

    default:
      m.reply('❓ Perintah tidak valid. Gunakan "!race100 help" untuk melihat daftar perintah.');
  }
};

handler.help = ['race100 <join|start|roll|reset|help>'];
handler.tags = ['game'];
handler.command = /^race100$/i;

export default handler;