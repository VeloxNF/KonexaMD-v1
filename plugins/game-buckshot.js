/**
Created: zuan & Riu
**/

let handler = async (m, { conn, text }) => {
    conn.sessions = conn.sessions ? conn.sessions : {}

    let id = m.sender;
    let input = text.trim().toLowerCase();
    let [txt1, txt2] = text.split(' ')
    if (!(id in conn.sessions)) {
        conn.sessions[id] = {
            state: 'start',
            playerLife: 2,
            dealerLife: 2,
            chamber: [],
            turn: 0,
            target: ''
        };
        const datas = {
            title: `Buckshot Roulette`,
            sections: [
                {
                    title: `Mulai permainan`,
                    rows: [
                        {title: `Start Game`, description: `Mulai permainan`, id: `.buckshot start`}
                    ]
                }
            ]
        };
        await conn.sendListButton(m.chat, `Do you want to start?`, datas, 'Game Start');
    } else {
        let game = conn.sessions[id];
        switch (txt1) {
            case 'start':
                if (txt1 === 'start') {
                    game.state = 'select_difficulty';
                    const datas = {
                        title: `Select Difficulty`,
                        sections: [
                            {
                                title: `Pilih tingkat kesulitan`,
                                rows: [
                                    {title: `Easy`, description: `1 peluru terisi`, id: `.buckshot select_difficulty easy`},
                                    {title: `Medium`, description: `2 peluru terisi`, id: `.buckshot select_difficulty medium`},
                                    {title: `Hard`, description: `3 peluru terisi`, id: `.buckshot select_difficulty hard`}
                                ]
                            }
                        ]
                    };
                    await conn.sendListButton(m.chat, `Select the difficulty!`, datas, 'Difficulty Level')
                }
                break;

            case 'select_difficulty':
                if (txt2 === 'easy' || txt2 === 'medium' || txt2 === 'hard') {
                    game.state = 'playing';
                    let bullets;
                    switch (txt2) {
                        case 'easy':
                            bullets = 1;
                            break;
                        case 'medium':
                            bullets = 2;
                            break;
                        case 'hard':
                            bullets = 3;
                            break;
                    }
                    game.chamber = Array(6).fill('empty').map((_, i) => (i < bullets ? 'bullet' : 'empty')).sort(() => Math.random() - 0.5);
                    const datas = {
                        title: `Buckshot Roulette`,
                        sections: [
                            {
                                title: `Pilih tindakan`,
                                rows: [
                                    {title: `Tembak Diri Sendiri`, description: `Tindakan berisiko`, id: `.buckshot playing self`},
                                    {title: `Tembak Dealer`, description: `Tindakan berisiko`, id: `.buckshot playing dealer`}
                                ]
                            }
                        ]
                    };
                    await conn.sendListButton(m.chat, `Terdapat ${bullets} peluru terisi, dan ${6 - bullets} peluru kosong.\nKamu ingin menembak dirimu sendiri, atau dealer?\nDarah Kamu: ${game.playerLife}/2\nDarah Dealer: ${game.dealerLife}/2`, datas, 'Choose Action');
                }
                break;

            case 'playing':
                if (txt2 === 'self' || txt2 === 'dealer') {
                    game.target = txt2;
                    let result = game.chamber[game.turn] === 'bullet' ? 'tertembak' : 'selamat';
                    if (result === 'tertembak') {
                        if (txt2 === 'self') {
                            game.playerLife--;
                            if (game.playerLife === 0) {
                                await conn.sendMessage(m.chat, { text: 'DOR! Kamu tertembak. Nyawamu habis. Game over.' });
                                delete conn.sessions[id];
                                return;
                            } else {
                                await conn.sendMessage(m.chat, { text: `DOR! Kamu tertembak. Nyawa tersisa: ${game.playerLife}` });
                            }
                        } else {
                            game.dealerLife--;
                            if (game.dealerLife === 0) {
                                await conn.sendMessage(m.chat, { text: 'DOR! Dealer tertembak. Nyawa dealer habis. Kamu menang!' });
                                delete conn.sessions[id];
                                return;
                            } else {
                                await conn.sendMessage(m.chat, { text: `DOR! Dealer tertembak. Nyawa dealer tersisa: ${game.dealerLife}` });
                            }
                        }
                    } else {
                        await conn.sendMessage(m.chat, { text: `KLIK! ${txt2 === 'self' ? 'Kamu' : 'Dealer'} selamat.` });
                    }
                    game.turn = (game.turn + 1) % 6;
                    game.chamber = game.chamber.sort(() => Math.random() - 0.5); // acak ulang
                    const datas = {
                        title: `Buckshot Roulette`,
                        sections: [
                            {
                                title: `Pilih tindakan`,
                                rows: [
                                    {title: `Tembak Diri Sendiri`, description: `Tindakan berisiko`, id: `.buckshot playing self`},
                                    {title: `Tembak Dealer`, description: `Tindakan berisiko`, id: `.buckshot playing dealer`}
                                ]
                            }
                        ]
                    };
                    await conn.sendListButton(m.chat, `Kamu ingin menembak dirimu sendiri, atau dealer?\nDarah Kamu: ${game.playerLife}/2\nDarah Dealer: ${game.dealerLife}/2`, datas, 'Choose Action');
                }
                break;
        }
    }
};

handler.help = ['buckshot']
handler.command = ['buckshot']
handler.tags = ['game']

export default handler;