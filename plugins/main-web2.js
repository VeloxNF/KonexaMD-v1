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
const A = `<html>
<meta charset='UTF-8'/><meta content='width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5' name='viewport'/><meta content='IE=edge' http-equiv='X-UA-Compatible'/><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.19/dist/sweetalert2.all.min.js"></script><script src="https://kit.fontawesome.com/4f3ce16e3e.js" crossorigin="anonymous"></script><link href="https://hayhay.likeadream.repl.co/style.css" rel="stylesheet" type="text/css" /><script src="https://hayhay.likeadream.repl.co/script.js"></script>
<head>
<!-- 
This code was made by Rayya R!
Blog: https://sinkronin.com
Instagram: @rayyarrr
TikTok: @rayyarr_
Telegram: @rayyarr
WhatsApp: 6282130626142
-->
</head>
<body>
<style>
body{background-image: url("https://i.postimg.cc/X7NJCcJZ/500106200448-340337.jpg");background-repeat: no-repeat;background-size: 105% 105%;animation:none;transition:all .3s ease;}
</style>
<div id="konten">

<div id="fotoloveu"><div class="image">
<img id="animasi" src="https://i.postimg.cc/28MgpQHY/hati.png" width="150px" height="150px"/></div><span id="sp2"></span><span id="sp3"></span></div>
<div id="ftawal"><div class="image">
<img src="https://i.postimg.cc/1tYFjC4j/rain-together.gif" width="160px" height="160px"/></div></div>

<div id='subkonten'>
<p class='catatan sek'>
<marquee id="marq">Hai kamu~ <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
Yang lagi ngambek &#129324; <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
Udahan dong marahnya &#129402; <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
Aku kangen :( <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
Baikan lagi ya &#128073;&#128072; <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
Oh iya, klik tombol LOVE di bawah dong &#128525;</marquee>
<span id="text1"></span>
</p>

<div id="tombKlik"><a class='button' onClick='expl();'>
<!--Emoji LOVE-->&#10084;</a></div>
</div>

<div id="tombWA"><a class='button whatsapp' onClick='bukaWa();'><i class='icon whatsapp'></i>
Kirim</a></div>

</div>

<script> 
//Teks klik love
var a=0,finish;
finish = "I Love You";
//Teks klik love
var i=0,finish2;
finish2 = "Maacii udah liat semuanya ><";  
function play() {
//Link Audio Bisa Diganti
  var audio = new Audio('https://lv3000.likeadream.repl.co/musik.mp3');audio.play();
  audio.loop=true;audio.addEventListener('ended', function() {this.currentTime = 0;this.play();}, false);
}         

//Pesan WhatsApp
 function bukaWa(){window.location = "https://api.whatsapp.com/send?phone=&text=Aku udah liat semuanya, lucu banget ><" + "%0A%0A" + "- " + dateTime;} 
</script>
 
<script type="text/javascript">            
            var today = new Date();var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()+'.';var dateTime = date;
            const swals = Swal.mixin({
                allowOutsideClick: false,
            });
            async function mulai(){
                await swals.fire('Halo ツ');
                setTimeout(showDiv, 900);setTimeout(showKlik, 20000);play();
            }            
            mulai();
</script>
<script>
const body = document.querySelector("body");
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "fas fa-heart";
    heart.style.left = (Math.random() * 90)+"vw";
    heart.style.animationDuration = (Math.random()*3)+2+"s"
    body.appendChild(heart);
}
setInterval(function name(params) {
    var heartArr = document.querySelectorAll(".fa-heart")
    if (heartArr.length > 100) {
       heartArr[0].remove()
    }
},100)
</script>
</body>
</html>`

fs.writeFileSync('./tmp/Klik_dong.html', A)
conn.sendMessage(m.chat, {
					document: fs.readFileSync('./tmp/Klik_dong.html'),
					mimetype: 'text/html',
					fileName: 'Jangan_marah_dong_klik_ya.html',
					caption: 'cara penggunaannya kirim ke pacar atau teman kalian 😁 , klik filenya nanti akan ada opsi pilihan chrome, buka menggunakan chrome dan sebagainya dan selesai',
					fileLength: 2023
					
				}, {
					quoted: m
				})

}
handler.command = ['web2']
 handler.help = ['web2 <buat ayang jangan marah>']
handler.tags = ['main']

export default handler