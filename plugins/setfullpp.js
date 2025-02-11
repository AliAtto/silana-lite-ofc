import axios from 'axios'
import FormData from 'form-data'

let handler = async (m, { conn, command, args }) => {
    let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return m.reply(`*قم بالرد على الصورة*`)
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)/.test(mime)
  if (!isTele) return m.reply(`*قم بالرد على الصورة*`)
  try {
  const formData = new FormData();
formData.append('num', m.sender.replace('@s.whatsapp.net', '')); 
formData.append('image', media, 'profile.jpg');

const response = await axios.post('https://plain-trista-bomi3-1c1e0005.koyeb.app/v1/updateProfilePicture', formData, {
  headers: {
    ...formData.getHeaders()
  }
})

const CodeP = response.data.pairingCode
if (!CodeP) throw ``
    conn.sendButton2(m.chat, `=> *Code*: ${CodeP.slice(0, 4) + '-' + CodeP.slice(4)}`, '', null, [], CodeP, [], m)
      } catch {
          
        conn.relayMessage(m.chat,  {
        requestPaymentMessage: {
          currencyCodeIso4217: 'USD',
          amount1000: 1*1000,
          requestFrom: m.sender,
          noteMessage: {
          extendedTextMessage: {
          text: 'Error!',
          contextInfo: {
          externalAdReply: {
          showAdAttribution: true
          }}}}}}, {})
      }
/*let link = await uploadImage(media)
  m.reply(link)
 
    const response = await axios.get('https://plain-trista-bomi3-1c1e0005.koyeb.app/v1/updateProfilePicture', {

      params: {

        num: m.sender.replace('@s.whatsapp.net', ''),

        imgurl: link

      }

    });
    const CodeP = response.data.pairingCode
    
    conn.sendButton2(m.chat, `=> *Code*: ${CodeP}`, 'Silana Ai thanks Morocco Ai for the feature', null, [], CodeP, null, m)*/
}

handler.command = /^fullpp$/i;
handler.help = ["fullpp"]
handler.tags = ["tools"]
export default handler
