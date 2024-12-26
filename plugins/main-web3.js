import fs from 'fs'

let handler = async (m, { conn, text, participants }) => {

/*let a = text.split(',')[0]
let b = text.split(',')[1]
let c = text.split(',')[2]
let d = text.split(',')[3]
let cap = `[!] 𝗜𝗡𝗩𝗔𝗟𝗜𝗗

Example: /web teks1,teks2,teks3,teks4
Exampe: /web hai,apa kabar,ini aku,hehe

*NOTE*: _jangan lupa gunakan tanda koma untuk batas teks_
`
if (!a) return m.reply(cap)
if (!b) return m.reply(cap)
if (!c) return m.reply(cap)
if (!d) return m.reply(cap)
*/
const A = `<!DOCTYPE html>
<html lang="en">
  <!-- 
  Code Made By Deka Tutorial
  Youtube: Deka Tutorial
  Tiktok: @deka_tutorial
  Instagram : @deka_tutorial
  -->
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin /><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp" /><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script><script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.4/dist/sweetalert2.all.min.js"></script><style>@import url("https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"); @import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"); * { padding: 0; margin: 0; font-family: "Ubuntu"; } p.cr { position: fixed; z-index: 9998; bottom: 10px; left: 10px; color: white; opacity: 0.25; display: block; font-size: 0.9;} p.cr::after { content: "Youtube : Deka Tutorial"; } .preload { position: fixed; z-index: 9999; top: 0; bottom: 0; left: 0; right: 0; background: black; display: flex; justify-content: center; align-items: center; } .preload p { color: #fff; animation: load 3s ease; -webkit-animation: load 1s ease infinite; } @keyframes load { 0% { opacity: 1; } 50% { opacity: 0.2; } 100% { opacity: 1; } } .bg { position: fixed; z-index: -1; top: 0; left: 0; bottom: 0; right: 0; background-color: black; } .content .open { position: fixed; z-index: 10; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; overflow-x: hidden; background-color: black; background-size: cover; } .content .open div { display: flex; flex-direction: column; align-items: center; justify-content: center; } .content .open div.lope { height: 70px; width: 70px; margin: 20px 0; background: rgb(255, 255, 255); display: flex; align-items: center; justify-content: center; cursor: pointer; border-radius: 50%; -webkit-border-radius: 50%; -moz-border-radius: 50%; -ms-border-radius: 50%; -o-border-radius: 50%; animation: anm 1s infinite ease; -webkit-animation: anm 1s infinite ease; box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.2); } .content .open i { font-size: 2.3em; color: red; } .content .open h3 { font-weight: 500; color: white; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); } .content .main .foto { width: 200px; margin: auto; margin-top: 50px; padding: 10px; box-sizing: border-box; border-radius: 30px; display: flex; justify-content: center; align-items: center; border: white 4px dashed; transform: rotateY(90deg); -webkit-transform: rotateY(90deg); -moz-transform: rotateY(90deg); -ms-transform: rotateY(90deg); -o-transform: rotateY(90deg); opacity: 0; transition: all 1.5s ease; -webkit-transition: all 1.5s ease; -moz-transition: all 1.5s ease; -ms-transition: all 1.5s ease; -o-transition: all 1.5s ease; -webkit-border-radius: 30px; -moz-border-radius: 30px; -ms-border-radius: 30px; -o-border-radius: 30px; } .content .main .foto img { width: 100%; border-radius: 20px; -webkit-border-radius: 20px; -moz-border-radius: 20px; -ms-border-radius: 20px; -o-border-radius: 20px; } @keyframes anm { 0% { transform: scale(1); -webkit-transform: scale(1); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); } 50% { transform: scale(1.05); -webkit-transform: scale(1.05); -moz-transform: scale(1.05); -ms-transform: scale(1.05); -o-transform: scale(1.05); } 100% { transform: scale(1); -webkit-transform: scale(1); -moz-transform: scale(1); -ms-transform: scale(1); -o-transform: scale(1); } } .main .hia { display: flex; justify-content: center; } .hai { margin: 30px auto 20px auto; font-size: 1.1em; font-weight: 500; color: white; display: inline-block; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); transition: all 0.7s; transform: translateY(20px); opacity: 0; -webkit-transition: all 0.7s; -moz-transition: all 0.7s; -ms-transition: all 0.7s; -o-transition: all 0.7s; -webkit-transform: translateY(20px); -moz-transform: translateY(20px); -ms-transform: translateY(20px); -o-transform: translateY(20px); } .pesan { font-size: 1.03em; margin: 0 15px; color: white; text-align: center; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); background: rgb(0, 0, 0, 0.2); padding: 25px; border-radius: 20px; border: dotted 4px white; opacity: 0; transition: all 2s ease; -webkit-transition: all 2s ease; -moz-transition: all 2s ease; -ms-transition: all 2s ease; -o-transition: all 2s ease; } .main .kado { transform: translateY(20px); -webkit-transform: translateY(20px); -moz-transform: translateY(20px); -ms-transform: translateY(20px); -o-transform: translateY(20px); transition: all 0.7s ease; -webkit-transition: all 0.7s ease; -moz-transition: all 0.7s ease; -ms-transition: all 0.7s ease; -o-transition: all 0.7s ease; opacity: 0; } .main .kado img { height: 60px; display: block; margin: 40px auto 0 auto; animation: loncat 5s infinite; -webkit-animation: loncat 3.5s infinite ease; } .main .kado p { font-size: 1em; text-align: center; margin-top: 10px; margin-bottom: 50px; color: #fff; text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); } @keyframes loncat { 0% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 19% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 35% { transform: translateY(-10px); -webkit-transform: translateY(-10px); -moz-transform: translateY(-10px); -ms-transform: translateY(-10px); -o-transform: translateY(-10px); } 48% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 60% { transform: translateY(-7px); -webkit-transform: translateY(-7px); -moz-transform: translateY(-7px); -ms-transform: translateY(-7px); -o-transform: translateY(-7px); } 69% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 75% { transform: translateY(-5px); -webkit-transform: translateY(-5px); -moz-transform: translateY(-5px); -ms-transform: translateY(-5px); -o-transform: translateY(-5px); } 81% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 85% { transform: translateY(-3px); -webkit-transform: translateY(-3px); -moz-transform: translateY(-3px); -ms-transform: translateY(-3px); -o-transform: translateY(-3px); } 87% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 90% { transform: translateY(-1px); -webkit-transform: translateY(-1px); -moz-transform: translateY(-1px); -ms-transform: translateY(-1px); -o-transform: translateY(-1px); } 92% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } 100% { transform: translateY(0); -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); } } .modal { position: fixed; height: 100vh; width: 100vw; top: 60vh; opacity: 0; background: white; text-align: center; display: none; justify-content: center; padding-top: 100px; transition: all 300ms ease; -webkit-transition: all 300ms ease; -moz-transition: all 300ms ease; -ms-transition: all 300ms ease; -o-transition: all 300ms ease; } /* .modal .hadiah { display: none; } */ .modal i { position: absolute; right: 15px; top: 15px; font-weight: 900; cursor: pointer; font-size: 2em; transition: all 0.3s ease; -webkit-transition: all 0.3s ease; -moz-transition: all 0.3s ease; -ms-transition: all 0.3s ease; -o-transition: all 0.3s ease; } .modal h3 { font-size: 1.4em; color: rgb(56, 56, 56); } .modal p { font-size: 1.2em; margin-top: 5px; margin-bottom: 30px; color: rgb(56, 56, 56); } .modal .pilihkado div { background: rgb(245, 245, 245); border: dashed 3px #b983ff; display: inline-flex; position: relative; margin: 20px; padding: 20px; border-radius: 15px; cursor: pointer; -webkit-border-radius: 15px; -moz-border-radius: 15px; -ms-border-radius: 15px; -o-border-radius: 15px; transition: all 300ms ease; -webkit-transition: all 300ms ease; -moz-transition: all 300ms ease; -ms-transition: all 300ms ease; -o-transition: all 300ms ease; box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2); } .modal .pilihkado div:hover { transform: scale(0.98); box-shadow: none; -webkit-transform: scale(0.98); -moz-transform: scale(0.98); -ms-transform: scale(0.98); -o-transform: scale(0.98); } .modal .pilihkado img { height: 90px; } .modal .pilihkado p { font-weight: 600; font-size: 1em; position: absolute; margin: 0; left: 10px; bottom: 10px; padding: 4px 8px; background: white; border: 1px solid #b983ff; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; -ms-border-radius: 5px; -o-border-radius: 5px; } .border-radius { border-radius: 20px !important; padding: 20px 0 !important; -webkit-border-radius: 20px !important; -moz-border-radius: 20px !important; -ms-border-radius: 20px !important; -o-border-radius: 20px !important; } .border-radius h2 { font-size: 1.6em !important; } .border-radius .swal2-confirm { color: white !important; background: #b983ff !important; border-radius: 10px !important; -webkit-border-radius: 10px !important; -moz-border-radius: 10px !important; -ms-border-radius: 10px !important; -o-border-radius: 10px !important; } </style>
    <title>Special For You</title>
  </head>
  <body>
    <div class="preload"><p>Loading dulu . . .</p></div>
    <div class="bg"></div>
    <div class="content">
      <div class="open">
        <div>
          <div class="lope" onclick="ilang()">
            <i class="love material-icons-sharp"> favorite </i>
          </div>
          <h3>Pencet Love nya</h3>
        </div>
      </div>
      <div class="main">
        <div class="foto">
          <div class="img"><img src="" class="fotoku" /></div>
        </div>
        <div class="hia">
          <h4 class="hai"></h4>
        </div>
        <p class="pesan"></p>
        <div class="hadiah"></div>
        <div class="kado">
          <img src="https://dekatutorial.github.io/kado_png.png" onclick="openModal()" alt="" />
          <p>Buka kadonya</p>
        </div>
      </div>
      <div class="modal">
        <i onclick="closeModal()" class="close material-icons-sharp"> close </i>
        <div class="hadiah">
          <h3>Aku punya sesuatu buat kamu</h3>
          <p>Pilih salah satu ya ><</p>
          <div class="pilihkado">
            <div onclick="pilihHadiah(a)">
              <img src="https://dekatutorial.github.io/kado_png.png" />
              <p>1</p>
            </div>
            <div onclick="pilihHadiah(b)">
              <img src="https://dekatutorial.github.io/kado_png.png" />
              <p>2</p>
            </div>
            <div onclick="pilihHadiah(c)">
              <img src="https://dekatutorial.github.io/kado_png.png" />
              <p>3</p>
            </div>
            <div onclick="pilihHadiah(d)">
              <img src="https://dekatutorial.github.io/kado_png.png" />
              <p>4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>

      var background = "FILE BACKGROUND";
      var foto = "FILE FOTO";
      var musik = "https://dekatutorial.github.io/Gellen%20Martadinata%20-%20Selamat%20Ulang%20Tahun.mp3";
      var panggilan = "PANGGILAN";
      var ucapan = "UCAPAN";

      var hadiah1 = "HADIAH SATU";
      var hadiah2 = "HADIAH DUA";
      var hadiah3 = "HADIAH TIGA";
      var hadiah4 = "HADIAH EMPAT";

      var noWhatsapp = "628XXXXX";

      $(window).on("load", function () { $(".preload").fadeOut("slow"); }); var audio = new Audio(musik); audio.loop = true; audio.autoplay = true; var bg = document.querySelector(".bg"); var fotoku = document.querySelector(".foto"); var hai = document.querySelector(".hai"); var pesanku = document.querySelector(".pesan"); var open = document.querySelector(".open"); var modal = document.querySelector(".modal"); var kado = document.querySelector(".kado"); var hadiah = ""; hai.innerHTML = panggilan; open.style = "background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + background + "');background-size: cover;"; bg.style = "background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + background + "');background-size: cover;"; document.querySelector(".fotoku").src = foto; function ilang() { audio.play(); open.style = "transition: 1.5s ease-out all; opacity: 0; transform: scale(100) translateY(20px); filter: brightness(0);"; setTimeout(function () { open.style = "display:none;"; }, 1500); setTimeout(fotonya, 500); setTimeout(haiku, 1300); setTimeout(tampilPesan, 2000); } function fotonya() { fotoku.style = "opacity: 1; transform: rotateY(360deg);"; } function haiku() { hai.style = "opacity: 1; transform: translateY(0px);"; setTimeout(function () { hai.style = "opacity: 1; animation: anm 2s ease infinite;"; }, 700); } function tampilPesan() { pesanku.style = "opacity: 1;"; typeWriter(); } function tampilKado() { kado.style = "transform: translateY(0px); opacity: 1;"; } var i = 0; var speed = 120; var txt = ucapan; function typeWriter() { if (i < txt.length) { pesanku.innerHTML += txt.charAt(i); i++; setTimeout(typeWriter, speed); } else { tampilKado(); } } function randomAngka() { x = Math.random(); if (x >= 0 && x <= 0.25) { return 0; } else if (x > 0.25 && x <= 0.5) { return 1; } else if (x > 0.5 && x <= 0.75) { return 2; } else { return 3; } } function acak() { a = randomAngka(); b = randomAngka(); if (b == a) { b = randomAngka(); acak(); } else { c = randomAngka(); if (c == a || c == b) { c = randomAngka(); acak(); } else { d = randomAngka(); if (d == a || d == b || d == c) { d = randomAngka(); acak(); } } } } var data = [hadiah1, hadiah2, hadiah3, hadiah4]; acak(); const swalo = Swal.mixin({ confirmButtonColor: "#23a542", allowOutsideClick: false, showCancelButton: false, customClass: { popup: "border-radius", }, }); function openModal() { if (hadiah == "") { modal.style = "display: flex;"; setTimeout(function () { modal.style = "display: flex;top: 0; opacity: 1;"; }, 10); } else { swalo.fire({ title: "Kamu dapet "+hadiah, timer: 3000, confirmButtonColor: "#fff", timerProgressBar: true }); } } function closeModal() { modal.style = "top: 60vh;opacity: 0;display: flex;"; setTimeout(function () { modal.style = "display: none;"; }, 300); } async function pilihHadiah(z) { hadiah = data[z]; await swalo.fire("Selamat kamu dapet " + hadiah); balas(); } async function balas() { var { value: pesan } = await swalo.fire({ title: "Tulis pesan", input: "text", confirmButtonText: "Kirim", }); if (pesan) { await swalo.fire("Kirim ke wa aku ya jawaban nya"); location.assign("https://api.whatsapp.com/send?phone=" + noWhatsapp + "&text=Hai, aku dapet " + hadiah + ".%0A %0AAku mau bilang, " + pesan); modal.style = "top: 60vh;opacity: 0;display: flex;"; setTimeout(function () { modal.style = "display: none;"; }, 300); } else { await swalo.fire({ confirmButtonText: "Iya deh", title: "Jangan dikosongin ya :)", }); balas(); } }
    </script><p class="cr"></p>
  </body>
</html>
`

fs.writeFileSync('./tmp/ultah.html', A)
conn.sendMessage(m.chat, {
					document: fs.readFileSync('./tmp/ultah.html'),
					mimetype: 'text/html',
					fileName: 'Cie_yang_ultah_klik_ini_ya.html',
					caption: 'cara penggunaannya kirim ke pacar atau teman kalian 😁 , klik filenya nanti akan ada opsi pilihan chrome, buka menggunakan chrome dan sebagainya dan selesai',
					fileLength: 2023
					
				}, {
					quoted: m
				})

}
handler.command = ['web3']
 handler.help = ['web3 <ultah>']
handler.tags = ['main']

export default handler