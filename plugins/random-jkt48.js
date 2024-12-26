/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

let handler = async (m, { conn }) => {
  let generationMembers = {
    "Gen 1": [ "Ayana Shahab", "Beby Chaesara Anadila", "Cindy Gulla", "Cleopatra Djapri", "Rezky Wiranti Dhike", "Frieska Anastasia Laksani", "Gabriela Margareth Warouw", "Alissa Galliamova", "Ghaida Farisya", "Jessica Vania", "Devi Kinal Putri", "Rica Leyona", "Melody Nurramdhani Laksani", "Nabilah Ayu", "Rena Nozawa", "Sonya Pandarmawan", "Diasta Priswarini", "Delima Rizky", "Ochi Rosdiana", "Sendy Ariani", "Shania Junianatha", "Siti Gayatri", "Sonia Natalia", "Stella Cornelia", "Jessica Veranda"
    ],
    "Gen 2": [ "Alicia Chanzia", "Althea Callista", "Annisa Athia", "Cindy Yuvia", "Della Delila", "Dellia Erdita", "Dena Siti Rohyati", "Dwi Putri Bonita", "Fakhiryani Shafariyanti", "Intar Putri Kariina", "Jennifer Hanna", "Jennifer Rachel Natasya", "Lidya Maulida Djuhandar", "Nadhifa Karimah", "Nadila Cindi Wantari", "Natalia", "Noella Sisterina", "Novinta Dhini", "Nurhalima Oktavianti", "Octi Sevpin", "Olivia Robberecht", "Priscillia Sari Dewi", "Ratu Vienny Fitrilya", "Riskha Fairunissa", "Rona Anggreani", "Saktiya Oktapyani", "Shinta Naomi", "Sinka Juliani", "Thalia", "Thalia Ivanka Elizabeth", "Viviyona Apriani"
    ],
"Gen 3": [ "Alycia Ferryana", "Amanda Dwi Arista", "Andela Yuwono", "Anggie Putri Kurniasari", "Anindhita Rahma Cahyadi", "Ayu Safira Oktaviani", "Chikita Ravenska Mamesah", "Elaine Hartanto", "Farina Yogi Devani", "Feni Fitriyanti", "Fransisca Saraswati Puspa Dewi", "Indah Permata Sari", "Kezia Putri Aandinta", "Maria Genenoveva Natalia Desy Purnamasari Gunawan", "Martha Graciela", "Michelle Christa Kusnadi", "Milenia Christien Glory Goenawan", "Nadhifa Salsabila", "Ni Made Ayu Vania Aurellia", "Nina Hamidah", "Pipit Ananda", "Putri Farin Kartika", "Rizka Khalila", "Shaffa Nabila", "Shani Indira Natio", "Shania Gracia", "Sofia Meifaliani", "Stephanie Pricilla Indarto Putri", "Syahfira Angela Nurhaliza", "Triarona Kusuma", "Yansen Indiani", "Zeby Magnolia Fawwaz"
    ],
    "Gen 4": [ "Adriani Elisabeth", "Tan Zhi Hui Celine", "Christy Chriselle", "Cindy Hapsari Maharani Pujiantoro Putri", "Made Devi Ranita Ningtara", "Jessica Berliana Ekawardani", "Fidly Immanda Azzahra", "Jinan Safa Safira", "Sri Lintang", "Melati Putri Rahel Sesilia", "Mega Suryani", "Zahra Yuriva Dermawan"
    ],
   "Gen 5": [ "Adhisty Zara", "Anggita Destiana Dewi", "Citra Ayu Pranajaya Wibrado", "Chintya Hanindhitakirana Wirawan", "Diani Amalia Ramadhani", "Elizabeth Gloria Setiawan", "Eve Antoinette Ichwan", "Gabryela Marcelina", "Hasyakyla Utami Kusumawardhani", "Helma Sonya", "Nurhayati", "Puti Nadhira Azalia", "Regina Angelina", "Rissanda Putri Tuarissa", "Ruth Damayanti Sitanggang", "Sania Julia Montolalu", "Violeta Burhan"
   ],
  "Gen 6": [ "Amanda Priscella", "Anastasya Narwastu Tety Handuran", "Ariella Calista Ichwan", "Denise Caroline", "Erika Ebisawa Kuswan", "Erika Sintia", "Gita Sekar Andarini", "Graciella Ruth Wiranto", "Jihan Miftahul Jannah", "Kandiya Rafa Maulidita", "Putri Cahyaning Anggraini", "Rinanda Syahputri", "Riska Amelia Putri", "Shalza Grasita"
  ],
 "Gen 7": [ "Aiko Harumi", "Angelina Christy", "Aurel Mayori", "Azizi Asadel", "Calista Lea", "Dhea Angelia", "Febi Komaril", "Febrina Diponegoro", "Febriola Sinambela", "Freya Jayawardana", "Gabriel Angelina", "Helisma Putri", "Jessica Chandra", "Jesslyn Callista", "Kanya Caya", "Mutiara Azzahra", "Nabila Fitriana", "Rifa Fatmasari", "Viona Fadrin", "Yessica Tamara"
  ],
  "Gen 8": [ "Amanina Afiqah", "Amirah Fatin", "Cindy Nugroho", "Cornelia Vanisa", "Devytha Maharani", "Eriena Kartika", "Fiony Alveria", "Flora Shafiq", "Gabriella Stevany", "Keisya Ramadhani", "Lulu Salsabila", "Nyimas Ratu Rafa", "Pamela Krysanthe", "Reva Adriana", "Reva Fidela", "Salma Annisa", "Umega Maulana", "Zahra Nur"
 ],
 "Gen 9": [ "Adzana Shaliha", "Caithlyn Gwyneth", "Chalista Ellysia", "Christabel Jocelyn", "Indah Cahya", "Iris Vevina Prasetio", "Kathrina Irene", "Marsha Lenathea", "Nabila Gusmarlia", "Olivia Payten", "Putri Elzahra", "Shinta Devi", "Tiara Sasi"
 ],
 "Gen 10": [ "Abieza Syabira", "Alia Giselle Maharani", "Amanda Sukma", "Aurellia", "Callista Alifia", "Danessa Valerie Hertanto", "Gabriela Abigail", "Indira Seruni", "Jesslyn Elly", "Naura Safinatunnajah", "Raisha Syifa"
 ],
 "Gen 11": [ "Alya Amanda", "Anindya Ramadhani", "Aulia Asyira", "Cathleen Nixie", "Celline Thefani", "Chelsea Davina", "Cynthia Yaputera", "Dena Natalia", "Desy Natalia", "Gendis Mayrannisa", "Grace Octaviani", "Greesella Adhalia", "Jeane Victoria", "Michelle Alexandra"
 ],
 "Gen 12": [ "Abigail Rachel", "Adeline Wijaya", "Aisa Maharani", "Aurhel Alana", "Catherina Vallencia", "Fritzy Rosmerian", "Hillary Abigail", "Jazzlyn Trisha", "Letycia Moreen", "Michelle Levia", "Nayla Suji", "Nina Tutachia", "Oline Manuel", "Regina Wilian", "Ribka Budiman", "Shabilqis Naila", "Victoria Kimberly"
 ]  
  };

  let wota = {
    title: `JKT48 Members`,
    sections: []
  };

  for (let gen in generationMembers) {
    let members = generationMembers[gen];
    let rows = [];
    for (let member of members) {
      rows.push({
        title: member,
        description: `JKT48 ${gen}`,
        id: `.pin slide Jkt48 ${member}` // Set ID to `.pinslide (nama member yang dipilih)`
      });
    }
    wota.sections.push({
      title: gen,
      rows: rows
    });
  }
let aw = await style ("JKT48 adalah grup idola asal Indonesia dan grup saudari AKB48 yang pertama di luar Jepang.",1)
  conn.sendListButton(m.chat, aw, wota, 'Terdapat Image Gen 1 - 12');
};

handler.command = ['jkt48'];
handler.tags = ['random'];
handler.limit = true;
handler.register = true;

export default handler;