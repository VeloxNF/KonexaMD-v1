let handler = async (m, {
    text,
    conn,
    func
}) => {
    conn.depo = conn.depo ? conn.depo : {}
    if (!(m.sender in conn.depo)) throw 'Kamu tidak ada sesi pembayaran. silahkan lakukan deposit terlebih dahulu'
    let user = conn.depo[m.sender]
    let cap = `*Transaksi saweria*
    
*Nama*: ${user.nama}
*Message*: ${user.message}
*Method_payment*: ${user.method_payment}
*Status*: ${user.status === 'PENDING' ? 'BATAL' : 'SUKSES'}
*Id*: ${user.id}
*Nominal*: ${user.nominal}
*Expired*: ${user.expired}
*Mata uang*: ${user.mata_uang}

Note: .cekpay <id> (untuk mengecek pembayaran)
#Mohon_tunggu_konfirmasi_pembayaran_setelah_5_menit
#Bayar_segera_dalam_waktu_5_menit
`
           await conn.sendMessage(m.sender, {
                image: {url: 'https://telegra.ph/file/6b5754b68d22094858127.jpg'},
                caption: cap
            }, {
                quoted: m
            })
        
        delete conn.depo[m.sender]
}
handler.help = ['cancelpayment']
handler.tags = ['owner']
handler.command = /^(canceldepo(sit)?|bataldepo(sit)?)$/i

export default handler