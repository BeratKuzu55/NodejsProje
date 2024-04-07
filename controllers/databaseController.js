const database = require('../database');
const fs = require("fs");
require("dotenv").config();
const mailer = require("nodemailer");

// HAFTALIK RAPORLAMA
// 2. Aşama (2 Hafta): Veritabanı Güncelleme ve Raporlama
// 24 saatte bir kontrol et , haftanın 6. günü ise rapor al ve yazdır.

const ogrenciListesiGetir = async function () {
    try {
        const result = await database.client.query(`select * from ogrenci`);
        return result
    }catch(err){
        console.log(err);
    }
}


const raporZamanKontrol = function () {
   
    setInterval(async () => {
        const now = new Date();
        // Eğer Pazartesi günü ise haftalık rapor al
        if (now.getDay() === 6) {
            await haftalikRaporVer();
        }
    }, 24*60*60* 1000);
}

// mail gönderme işlemi / nodemailer

const transporter = mailer.createTransport({
    service : "gmail",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.ownEmail,
      pass: process.env.appPassword2,
    },
  });

//const ogrenciListesi = fs.readFileSync('ogrenciListesi.json');
//console.log(JSON.parse(ogrenciListesi));
const mailGonder = async (message) => {
    const info = await transporter.sendMail({
        from: `"Berat Kuzu 👻" <${process.env.ownEmail}>`, // sender address
        to: process.env.ownEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: message, // plain text body
        attachments : [
            {
                filename: 'ogrenciListesi.json',
                path : process.env.ogrenciListesiPath
            }
        ]
      });

      console.log("Message sent: %s", info.messageId);
}

const haftalikRaporVer = async function (req , res) {
    const result = await ogrenciListesiGetir();
    //console.log(result.rows);
    // JSON verisini bir dosyaya yazma
    fs.writeFile('ogrenciListesi.json', JSON.stringify(result.rows), 'utf8', function(err) {
        if (err) {
            console.log('Dosya yazma hatası:', err);
        } else {
            console.log('Veri başarıyla dosyaya yazıldı.');
        }
    });       

    mailGonder();
}
module.exports = { 
    raporZamanKontrol ,
    haftalikRaporVer ,
    mailGonder ,
    ogrenciListesiGetir ,
}