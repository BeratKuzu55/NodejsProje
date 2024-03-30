const database = require('../database');
const fs = require("fs");
const mailer = require("nodemailer");


const veritabaniGuncelle = async function (req , res) {

}

// HAFTALIK RAPORLAMA
// 2. Aşama (2 Hafta): Veritabanı Güncelleme ve Raporlama
// 24 saatte bir kontrol et , haftanın 6. günü ise rapor al ve yazdır.
const haftalikRaporVer = async function (req , res) {
    const result = await ogrenciListesiGetir();
    console.log(result.rows);
       // JSON verisini bir dosyaya yazma
       fs.writeFile('ogrenciListesi.json', JSON.stringify(result.rows), 'utf8', function(err) {
        if (err) {
            console.log('Dosya yazma hatası:', err);
        } else {
            console.log('Veri başarıyla dosyaya yazıldı.');
        }
         });       
}

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
    
})


const mailGonder = async () => {

}

module.exports = {
    veritabaniGuncelle , 
    haftalikRaporVer , 
    raporZamanKontrol ,
}