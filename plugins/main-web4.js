/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/


import fs from 'fs'

let handler = async (m, { conn, text, participants }) => {

let a = text.split(',')[0]
let b = text.split(',')[1]
let c = text.split(',')[2]
let d = text.split(',')[3]
let e = text.split(',')[4]
let f = text.split(',')[5]
let g = text.split(',')[6]
let h = text.split(',')[7]

let cap = `[!] 𝗜𝗡𝗩𝗔𝗟𝗜𝗗

Example: /web4 teks1,teks2,teks3,teks4,teks5,teks6,teks7

Exampe: /web4 hai,apa kabar,ini aku,hehe,sory, gabut,hehe

*NOTE*: _jangan lupa gunakan tanda koma *( , )* untuk batas teks_
`
if (!a) return m.reply(cap)
if (!b) return m.reply(cap)
if (!c) return m.reply(cap)
if (!d) return m.reply(cap)
if (!e) return m.reply(cap)
if (!f) return m.reply(cap)
if (!g) return m.reply(cap)
if (!h) return m.reply(cap)

const A = `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	 <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>For You</title>  
	<script src="vara.min.js"></script>

  <style >
	*{
		padding: 0;
		margin: 0;

	}
	body{
    background: linear-gradient(0.25turn, rgb(6, 104, 104), rgb(6, 104, 104));
		background-size: cover;
		background-position: center;
		height: 100vh;
		overflow: hidden;
		color: black;


	}
	#container{
		width: 80%;
		margin: 20px auto;
		min-height: 650px;
		margin-top: 150px;
    color: black;
	}
	@media screen and (max-width: 400px) {
		#container {
			width: 100%;
			margin:50% auto;
			min-height: 800px;
		}

}
.wrapper{
  position: fixed;
}
.box div{
  position: fixed;
  width: 60px;
  height: 60px;
  background-color:transparent;
  border: 6px solid rgba(255,255,255,0.8);
}
.box div:nth-child(1){
  top: 12%;
  left: 42%;
  animation: animate 10s linear infinite;
}
.box div:nth-child(2){
  top: 70%;
  left: 50%;
  animation: animate 7s linear infinite;
}
.box div:nth-child(3){
  top: 17%;
  left: 6%;
  animation: animate 9s linear infinite;
}
.box div:nth-child(4){
  top: 20%;
  left: 60%;
  animation: animate 10s linear infinite;
}
.box div:nth-child(5){
  top: 67%;
  left: 10%;
  animation: animate 6s linear infinite;
}
.box div:nth-child(6){
  top: 80%;
  left: 70%;
  animation: animate 12s linear infinite;
}
.box div:nth-child(7){
  top: 60%;
  left: 80%;
  animation: animate 15s linear infinite;
}
.box div:nth-child(8){
  top: 32%;
  left: 25%;
  animation: animate 16s linear infinite;
}
.box div:nth-child(9){
  top: 90%;
  left: 25%;
  animation: animate 9s linear infinite;
}
.box div:nth-child(10){
  top: 20%;
  left: 80%;
  animation: animate 5s linear infinite;
}
@keyframes animate{
  0%{
    transform: scale(0) translateY(0) rotate(0);
    opacity: 1;
  }
  100%{
    transform: scale(1.3) translateY(-90px) rotate(360deg);
    opacity: 0;
  }
}
</style>
</head>
<body>
  <audio autoplay>
      <source src="https://github.com/dev-Luci14/Music/raw/main/as.m4a" type="audio/mpeg">
  </audio>
  <div id="container"></div>
  <a href="" class="hidden"></a>
  	<div class="wrapper">
    <div class="box">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    </div>
  </div>
 <script>
  	var fontSize = 40;
  	if (window.screen.width > 700) 
  		fontSize = 55 ;
  	else if (window.screen.width > 1200)
  		fontSize = 80; 
  	var vara = new Vara(
  		"#container",
  		"https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
  		[
  			{
  				text : ${a},
  				y: 150,
         	 	delay : 900,
  				fromCurrentPosition: {y:false},
  				duration:1000
  		},
  		{
  			text : ${b},
  			y: 150,
  			fromCurrentPosition: {y:false},
  			delay:500,
  			duration:1000
  		},
		{
  			text : ${c},
  			y: 150,
  			fromCurrentPosition: {y:false},
  			delay:500,
  			duration:1500
  		},
		{
  			text : ${d},
  			y: 150,
  			fromCurrentPosition: {y:false},
  			delay:500,
  			duration:3000
  		},
		{
  			text : ${e},
  			y: 150,
  			fromCurrentPosition: {y:false},
  			delay:500,
  			duration:2500
  		},
		{
  			text : ${f},
  			y: 150,
  			fromCurrentPosition: {y:false},
  			delay:500,
  			duration:3000
  		},
		{
  			text : ${g},
  			y: 150,
  			fromCurrentPosition: {y:false},
  			delay:500,
  			duration:3500
  		},
        {
          text : ${h},
          y: 150,
          fromCurrentPosition: {y:false},
          delay:500,
          duration:4000
        },
  		],

  			{
  				strokeWidth: 2,
  				color:"#fff",
  				fontSize:fontSize,
  				textAlign:"center"
  			}
  		);
  	vara.ready(function(){
  		var erase = true;
  		vara.animationEnd(function(i, o){
  			if (i == "no_erase") erase = false; 
  			if (erase) {
  				o.container.style.transition = 
  				"opacity 1s 1s";
  				o.container.style.opacity = 0;
  			}
  		});
  	});

  </script>
</body>
</html>
`

fs.writeFileSync('./tmp/trend_tiktok.html', A)
conn.sendMessage(m.chat, {
					document: fs.readFileSync('./tmp/trend_tiktok.html'),
					mimetype: 'text/html',
					fileName: 'trend_tiktok.html',
					caption: 'cara penggunaannya kirim ke pacar atau teman kalian 😁 , klik filenya nanti akan ada opsi pilihan chrome, buka menggunakan chrome dan sebagainya dan selesai',
					fileLength: 2023
					
				}, {
					quoted: m
				})

}
handler.command = ['web4']
 handler.help = ['web4 <trend tiktok>']
handler.tags = ['main']

export default handler