let handler = async (m, { conn, args, usedPrefix, command }) => {
   try {
      conn.crate = conn.crate ? conn.crate : [];
      if (!m.quoted) return m.reply('🚩 Reply the mystery box.');
      if (!/ID[-]/.test(m.quoted.text)) return;
      
      const id = m.quoted.text.split('ID-')[1].split('*')[0].trim();
      if (!id) return;
      
      const exists = conn.crate.find(v => v._id === id);
      if (!exists) return m.reply('🚩 Maaf, Mystery box telah dibuka sebelumnya atau belum tersedia.');
      
      if (exists.reward.type === 'LIMIT') {
         conn.users[m.sender].limit += exists.reward._r;
         m.reply(`🎉 Congratulations! you got *${exists.reward._r}* limits.`).then(() => {
            conn.crate = conn.crate.filter(v => v._id !== id);
         });
      } else if (exists.reward.type === 'POINT') {
         conn.users[m.sender].point += exists.reward._r;
         m.reply(`🎉 Congratulations! you got *${exists.reward._r}* points.`).then(() => {
            conn.crate = conn.crate.filter(v => v._id !== id);
         });
      } else if (exists.reward.type === 'MONEY') {
         conn.users[m.sender].money += exists.reward._r;
         const USD = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
         });
         m.reply(`🎉 Congratulations! you got *${USD.format(exists.reward._r)}*.`).then(() => {
            conn.crate = conn.crate.filter(v => v._id !== id);
         });
      } else if (exists.reward.type === 'ZONK_L') {
         conn.users[m.sender].limit = Math.max(0, conn.users[m.sender].limit - exists.reward._r);
         m.reply(`💀 Zonk! Limit kamu dikurangi : -${exists.reward._r} limits.`).then(() => {
            conn.crate = conn.crate.filter(v => v._id !== id);
         });
      } else if (exists.reward.type === 'ZONK_P') {
         conn.users[m.sender].point = Math.max(0, conn.users[m.sender].point - exists.reward._r);
         m.reply(`💀 Zonk! Point kamu dikurangi : -${exists.reward._r} points.`).then(() => {
            conn.crate = conn.crate.filter(v => v._id !== id);
         });
      } else if (exists.reward.type === 'ZONK_M') {
         conn.users[m.sender].money = Math.max(0, conn.users[m.sender].money - exists.reward._r);
         const USD = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
         });
         m.reply(`💀 Zonk! Uang kamu dikurangi : -${USD.format(exists.reward._r)}.`).then(() => {
            conn.crate = conn.crate.filter(v => v._id !== id);
         });
      }
   } catch (e) {
      console.log(e);
      conn.reply(m.chat, e.toString(), m);
   }
};

handler.command = ['loot'];

export default handler;