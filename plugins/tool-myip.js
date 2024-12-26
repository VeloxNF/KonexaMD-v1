import _0x29be06 from "http";
let handler = async (_0xb01725, {
  conn: _0x268db1,
  args: _0xdb7a64,
  text: _0x547e97,
  usedPrefix: _0x267001,
  command: _0x50c2d8
}) => {
  _0x29be06.get({
    host: "api.ipify.org",
    port: 80,
    path: "/"
  }, function (_0x1d8eeb) {
    _0x1d8eeb.on("data", function (_0x160442) {
      _0xb01725.reply("🔎 My public IP address is: " + _0x160442);
    });
  });
};
handler.help = ["myip"];
handler.tags = ["tools"];
handler.command = /^(myip)$/i;
handler.owners = true;
handler.owner = true;
export default handler;