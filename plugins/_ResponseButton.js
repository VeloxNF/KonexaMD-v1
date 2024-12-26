const { proto, generateWAMessage, areJidsSameUser } = (await import('@adiwajshing/baileys')).default;

async function before(m, chatUpdate) {
    if (m.isBaileys) return;
    if (!m.message) return;
    if (m.mtype === "interactiveResponseMessage" && m.quoted.fromMe) {
        appendTextMessage(JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, chatUpdate);
    }

    async function appendTextMessage(text, chatUpdate) {
        // Create the message content
        let messageContent = { text: text };
        let messageOptions = {
            userJid: conn.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        };

        // Generate the message using generateWAMessage
        let generatedMessage = await generateWAMessage(m.chat, messageContent, messageOptions);
        generatedMessage.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
        generatedMessage.key.id = m.key.id;
        generatedMessage.pushName = m.pushName;

        if (m.isGroup) generatedMessage.participant = m.sender;

        // Prepare and send the message
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(generatedMessage)],
            type: 'append'
        };
        conn.ev.emit('messages.upsert', msg);
    }
}

export {
    before
};