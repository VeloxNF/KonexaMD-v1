/*
Kasih Weem Wak biar dikata sepuh, soalnya ini beton 😹😹
By : Jikuan
*/

let handler = async (m, { conn }) => {
  let generationMembers = {
    "Gen 1": [ "Jomok", "Jmk48"
    ],
    "Gen 2": [ "Jomok Hitam", "Jomok Ngawi"
    ],
"Gen 3": [ "Jomok Mentahan"
    ],
    "Gen 4": [ "Ambatukam", "Ambatron"
    ],
   "Gen 5": [ "Rusdi JMK48", "Rusdi Ngawi"
   ]  
  };

  let wota = {
    title: `Random JMK48`,
    sections: []
  };

  for (let gen in generationMembers) {
    let members = generationMembers[gen];
    let rows = [];
    for (let member of members) {
      rows.push({
        title: member,
        description: `JMK48 ${gen}`,
        id: `.pinslide ${member}` // Set ID to `.pinslide (nama member yang dipilih)`
      });
    }
    wota.sections.push({
      title: gen,
      rows: rows
    });
  }

  conn.sendListButton(m.chat, `Ini Random JMK48.`, wota, 'Terdapat Image JMK48 1-5');
};

handler.command = ['jmk48'];
handler.tags = ['random'];
handler.limit = true;
handler.register = true;

export default handler;